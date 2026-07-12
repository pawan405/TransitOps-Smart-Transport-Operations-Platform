from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class TransitVehicle(models.Model):
    _name = 'transit.vehicle'
    _description = 'Vehicle'
    _inherit = ['mail.thread', 'mail.activity.mixin']
    _rec_name = 'registration_number'

    registration_number = fields.Char(string='Registration Number', required=True, tracking=True, unique=True)
    name = fields.Char(string='Vehicle Name', required=True, tracking=True)
    model = fields.Char(string='Model', tracking=True)
    vehicle_type_id = fields.Many2one('transit.vehicle.type', string='Vehicle Type', required=True, tracking=True)
    load_capacity = fields.Float(string='Load Capacity (Tons)', tracking=True)
    fuel_type = fields.Selection([
        ('diesel', 'Diesel'),
        ('petrol', 'Petrol'),
        ('cng', 'CNG'),
        ('electric', 'Electric'),
    ], string='Fuel Type', tracking=True)
    acquisition_cost = fields.Float(string='Acquisition Cost', tracking=True)
    current_odometer = fields.Float(string='Current Odometer (km)', tracking=True)
    status = fields.Selection([
        ('available', 'Available'),
        ('on_trip', 'On Trip'),
        ('maintenance', 'Maintenance'),
        ('retired', 'Retired'),
    ], string='Status', default='available', tracking=True)
    region_id = fields.Many2one('transit.region', string='Region', tracking=True)
    image_128 = fields.Image(string='Vehicle Image', max_width=128, max_height=128)
    document_ids = fields.One2many('transit.vehicle.document', 'vehicle_id', string='Documents')
    trip_ids = fields.One2many('transit.trip', 'vehicle_id', string='Trips')
    maintenance_ids = fields.One2many('transit.maintenance', 'vehicle_id', string='Maintenance Records')
    fuel_log_ids = fields.One2many('transit.fuel.log', 'vehicle_id', string='Fuel Logs')

    _sql_constraints = [
        ('registration_number_unique', 'unique(registration_number)', 'Vehicle Registration Number must be unique!')
    ]

    @api.constrains('status')
    def _check_vehicle_status(self):
        for vehicle in self:
            if vehicle.status == 'on_trip':
                ongoing_trips = self.env['transit.trip'].search([
                    ('vehicle_id', '=', vehicle.id),
                    ('status', 'in', ['dispatched', 'in_progress'])
                ])
                if not ongoing_trips:
                    raise ValidationError(_('Cannot set vehicle to On Trip without an active trip!'))

    def action_set_available(self):
        for vehicle in self:
            vehicle.status = 'available'

    def action_set_maintenance(self):
        for vehicle in self:
            vehicle.status = 'maintenance'

    def action_set_retired(self):
        for vehicle in self:
            vehicle.status = 'retired'
