from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from datetime import datetime


class TransitTrip(models.Model):
    _name = 'transit.trip'
    _description = 'Trip'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'trip_number'

    trip_number = fields.Char(string='Trip Number', required=True, copy=False, readonly=True,
                             default=lambda self: _('New'))
    source = fields.Char(string='Source', required=True, tracking=True)
    destination = fields.Char(string='Destination', required=True, tracking=True)
    route_id = fields.Many2one('transit.route', string='Route', tracking=True)
    vehicle_id = fields.Many2one('transit.vehicle', string='Vehicle', required=True, tracking=True)
    driver_id = fields.Many2one('transit.driver', string='Driver', required=True, tracking=True)
    cargo_weight = fields.Float(string='Cargo Weight (Tons)', required=True, tracking=True)
    distance = fields.Float(string='Distance (km)', tracking=True)
    expected_fuel = fields.Float(string='Expected Fuel (L)', tracking=True)
    actual_fuel = fields.Float(string='Actual Fuel (L)', tracking=True)
    revenue = fields.Float(string='Revenue', tracking=True)
    status = fields.Selection([
        ('draft', 'Draft'),
        ('dispatched', 'Dispatched'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], string='Status', default='draft', tracking=True)
    start_date = fields.Datetime(string='Start Date', tracking=True)
    end_date = fields.Datetime(string='End Date', tracking=True)
    stop_ids = fields.One2many('transit.trip.stop', 'trip_id', string='Stops')
    status_history_ids = fields.One2many('transit.trip.status.history', 'trip_id', string='Status History')
    fuel_log_ids = fields.One2many('transit.fuel.log', 'trip_id', string='Fuel Logs')
    expense_ids = fields.One2many('transit.expense', 'trip_id', string='Expenses')

    @api.model
    def create(self, vals):
        if vals.get('trip_number', _('New')) == _('New'):
            vals['trip_number'] = self.env['ir.sequence'].next_by_code('transit.trip') or _('New')
        return super(TransitTrip, self).create(vals)

    @api.constrains('cargo_weight', 'vehicle_id')
    def _check_cargo_capacity(self):
        for trip in self:
            if trip.vehicle_id and trip.cargo_weight > trip.vehicle_id.load_capacity:
                raise ValidationError(_('Cargo weight exceeds vehicle capacity!'))

    @api.constrains('vehicle_id', 'driver_id')
    def _check_resource_availability(self):
        for trip in self:
            if trip.status in ['dispatched', 'in_progress']:
                if trip.vehicle_id.status not in ['on_trip']:
                    raise ValidationError(_('Vehicle is not available for this trip!'))
                if trip.driver_id.status not in ['on_trip']:
                    raise ValidationError(_('Driver is not available for this trip!'))

    def _create_status_history(self, new_status):
        self.ensure_one()
        self.env['transit.trip.status.history'].create({
            'trip_id': self.id,
            'status': new_status,
            'date': fields.Datetime.now(),
            'user_id': self.env.user.id,
        })

    def action_dispatch(self):
        for trip in self:
            # Check vehicle status
            if trip.vehicle_id.status != 'available':
                raise ValidationError(_('Vehicle %s is not available!') % trip.vehicle_id.name)
            if trip.vehicle_id.status in ['retired']:
                raise ValidationError(_('Vehicle %s is retired and cannot be used!') % trip.vehicle_id.name)
            
            # Check driver status
            if trip.driver_id.status != 'available':
                raise ValidationError(_('Driver %s is not available!') % trip.driver_id.name)
            if trip.driver_id.status in ['suspended']:
                raise ValidationError(_('Driver %s is suspended!') % trip.driver_id.name)
            if trip.driver_id.license_expiry_date < fields.Date.today():
                raise ValidationError(_('Driver %s license has expired!') % trip.driver_id.name)

            # Update statuses
            trip.status = 'dispatched'
            trip.start_date = fields.Datetime.now()
            trip.vehicle_id.status = 'on_trip'
            trip.driver_id.status = 'on_trip'
            trip._create_status_history('dispatched')

    def action_start(self):
        for trip in self:
            trip.status = 'in_progress'
            trip._create_status_history('in_progress')

    def action_complete(self):
        for trip in self:
            trip.status = 'completed'
            trip.end_date = fields.Datetime.now()
            trip.vehicle_id.status = 'available'
            trip.driver_id.status = 'available'
            trip._create_status_history('completed')

    def action_cancel(self):
        for trip in self:
            if trip.status in ['dispatched', 'in_progress']:
                trip.vehicle_id.status = 'available'
                trip.driver_id.status = 'available'
            trip.status = 'cancelled'
            trip._create_status_history('cancelled')
