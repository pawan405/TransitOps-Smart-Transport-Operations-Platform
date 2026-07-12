from odoo import models, fields, api


class TransitTripStatusHistory(models.Model):
    _name = 'transit.trip.status.history'
    _description = 'Trip Status History'
    _order = 'date desc'

    trip_id = fields.Many2one('transit.trip', string='Trip', required=True, ondelete='cascade')
    status = fields.Selection([
        ('draft', 'Draft'),
        ('dispatched', 'Dispatched'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ], string='Status', required=True)
    date = fields.Datetime(string='Date', required=True)
    user_id = fields.Many2one('res.users', string='User', required=True)
