from odoo import models, fields, api


class TransitTripStop(models.Model):
    _name = 'transit.trip.stop'
    _description = 'Trip Stop'
    _order = 'sequence'

    trip_id = fields.Many2one('transit.trip', string='Trip', required=True, ondelete='cascade')
    sequence = fields.Integer(string='Sequence')
    location = fields.Char(string='Location', required=True)
    arrival_time = fields.Datetime(string='Arrival Time')
    departure_time = fields.Datetime(string='Departure Time')
    notes = fields.Text(string='Notes')
