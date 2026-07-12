from odoo import models, fields, api


class TransitRoute(models.Model):
    _name = 'transit.route'
    _description = 'Trip Route'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Route Name', required=True, tracking=True)
    source = fields.Char(string='Source Location', required=True)
    destination = fields.Char(string='Destination Location', required=True)
    distance = fields.Float(string='Distance (km)', tracking=True)
    estimated_time = fields.Float(string='Estimated Time (hours)', tracking=True)
    active = fields.Boolean(string='Active', default=True)
