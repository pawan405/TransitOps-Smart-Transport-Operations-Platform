from odoo import models, fields, api, _


class TransitMaintenance(models.Model):
    _name = 'transit.maintenance'
    _description = 'Maintenance'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Maintenance Name', required=True, tracking=True)
    vehicle_id = fields.Many2one('transit.vehicle', string='Vehicle', required=True, tracking=True)
    maintenance_type = fields.Selection([
        ('oil_change', 'Oil Change'),
        ('engine', 'Engine'),
        ('tyre', 'Tyre'),
        ('service', 'Service'),
        ('repair', 'Repair'),
    ], string='Maintenance Type', required=True, tracking=True)
    status = fields.Selection([
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ], string='Status', default='open', tracking=True)
    date = fields.Date(string='Date', default=fields.Date.today, tracking=True)
    cost = fields.Float(string='Cost', tracking=True)
    notes = fields.Text(string='Notes')

    def action_start(self):
        for record in self:
            record.status = 'in_progress'
            record.vehicle_id.status = 'maintenance'

    def action_complete(self):
        for record in self:
            record.status = 'completed'
            record.vehicle_id.status = 'available'
