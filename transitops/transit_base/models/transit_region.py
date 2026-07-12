from odoo import models, fields, api


class TransitRegion(models.Model):
    _name = 'transit.region'
    _description = 'Transport Region'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Region Name', required=True, tracking=True)
    code = fields.Char(string='Region Code', tracking=True)
    description = fields.Text(string='Description')
    active = fields.Boolean(string='Active', default=True)
