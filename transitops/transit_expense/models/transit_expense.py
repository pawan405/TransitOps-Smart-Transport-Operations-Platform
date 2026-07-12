from odoo import models, fields, api


class TransitExpense(models.Model):
    _name = 'transit.expense'
    _description = 'Expense'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Expense Name', required=True, tracking=True)
    expense_type = fields.Selection([
        ('fuel', 'Fuel'),
        ('maintenance', 'Maintenance'),
        ('toll', 'Toll'),
        ('parking', 'Parking'),
        ('insurance', 'Insurance'),
        ('misc', 'Miscellaneous'),
    ], string='Expense Type', required=True, tracking=True)
    vehicle_id = fields.Many2one('transit.vehicle', string='Vehicle', tracking=True)
    trip_id = fields.Many2one('transit.trip', string='Trip', tracking=True)
    date = fields.Date(string='Date', required=True, default=fields.Date.today, tracking=True)
    amount = fields.Float(string='Amount', required=True, tracking=True)
    notes = fields.Text(string='Notes')
