from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from datetime import date


class TransitDriver(models.Model):
    _name = 'transit.driver'
    _description = 'Driver'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Driver Name', required=True, tracking=True)
    license_number = fields.Char(string='License Number', required=True, tracking=True)
    license_category_id = fields.Many2one('transit.license.category', string='License Category', required=True, tracking=True)
    license_expiry_date = fields.Date(string='License Expiry Date', required=True, tracking=True)
    phone = fields.Char(string='Phone Number', tracking=True)
    email = fields.Char(string='Email', tracking=True)
    safety_score = fields.Integer(string='Safety Score', default=100, tracking=True)
    status = fields.Selection([
        ('available', 'Available'),
        ('on_trip', 'On Trip'),
        ('off_duty', 'Off Duty'),
        ('suspended', 'Suspended'),
    ], string='Status', default='available', tracking=True)
    image_128 = fields.Image(string='Profile Picture', max_width=128, max_height=128)
    license_attachment_ids = fields.Many2many('ir.attachment', string='License Documents')
    trip_ids = fields.One2many('transit.trip', 'driver_id', string='Trips')

    _sql_constraints = [
        ('license_number_unique', 'unique(license_number)', 'License Number must be unique!')
    ]

    @api.constrains('license_expiry_date')
    def _check_license_expiry(self):
        for driver in self:
            if driver.license_expiry_date < date.today():
                raise ValidationError(_('Driver license has expired!'))

    @api.constrains('status')
    def _check_driver_status(self):
        for driver in self:
            if driver.status == 'on_trip':
                ongoing_trips = self.env['transit.trip'].search([
                    ('driver_id', '=', driver.id),
                    ('status', 'in', ['dispatched', 'in_progress'])
                ])
                if not ongoing_trips:
                    raise ValidationError(_('Cannot set driver to On Trip without an active trip!'))

    @api.model
    def _cron_check_license_expiry(self):
        today = date.today()
        upcoming_drivers = self.search([
            ('license_expiry_date', '>=', today),
            ('license_expiry_date', '<=', fields.Date.add(today, days=30))
        ])
        for driver in upcoming_drivers:
            driver.message_post(body=_('License will expire on %s') % driver.license_expiry_date)

    def action_set_available(self):
        for driver in self:
            driver.status = 'available'

    def action_set_off_duty(self):
        for driver in self:
            driver.status = 'off_duty'

    def action_set_suspended(self):
        for driver in self:
            driver.status = 'suspended'
