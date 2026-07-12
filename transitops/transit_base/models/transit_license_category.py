from odoo import models, fields, api


class TransitLicenseCategory(models.Model):
    _name = 'transit.license.category'
    _description = 'Driver License Category'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string='Category Name', required=True, tracking=True)
    code = fields.Char(string='Category Code', tracking=True)
    description = fields.Text(string='Description')
    active = fields.Boolean(string='Active', default=True)
