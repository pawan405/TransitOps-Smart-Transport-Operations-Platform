from odoo import models, fields, api


class TransitFuelLog(models.Model):
    _name = 'transit.fuel.log'
    _description = 'Fuel Log'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    vehicle_id = fields.Many2one('transit.vehicle', string='Vehicle', required=True, tracking=True)
    trip_id = fields.Many2one('transit.trip', string='Trip', tracking=True)
    date = fields.Date(string='Date', required=True, default=fields.Date.today, tracking=True)
    quantity = fields.Float(string='Quantity (L)', required=True, tracking=True)
    cost = fields.Float(string='Cost', required=True, tracking=True)
    vendor = fields.Char(string='Vendor', tracking=True)
    odometer = fields.Float(string='Odometer (km)', tracking=True)
    fuel_efficiency = fields.Float(string='Fuel Efficiency (km/L)', compute='_compute_fuel_efficiency', store=True)

    @api.depends('quantity', 'odometer', 'vehicle_id')
    def _compute_fuel_efficiency(self):
        for log in self:
            if log.quantity and log.odometer:
                prev_logs = self.search([
                    ('vehicle_id', '=', log.vehicle_id.id),
                    ('date', '<=', log.date),
                    ('id', '!=', log.id),
                ], order='date desc, id desc', limit=1)
                if prev_logs:
                    distance = log.odometer - prev_logs.odometer
                    if distance > 0 and log.quantity > 0:
                        log.fuel_efficiency = distance / log.quantity
                    else:
                        log.fuel_efficiency = 0.0
                else:
                    log.fuel_efficiency = 0.0
            else:
                log.fuel_efficiency = 0.0
