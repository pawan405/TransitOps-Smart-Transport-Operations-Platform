from odoo import models, fields, api


class TransitVehicleType(models.Model):
    _name = 'transit.vehicle.type'
    _description = 'Vehicle Type'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Type Name', required=True, tracking=True)
    code = fields.Char(string='Type Code', tracking=True)
    description = fields.Text(string='Description')
    active = fields.Boolean(string='Active', default=True)
