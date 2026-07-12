from odoo import models, fields, api


class TransitVehicleDocument(models.Model):
    _name = 'transit.vehicle.document'
    _description = 'Vehicle Document'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    vehicle_id = fields.Many2one('transit.vehicle', string='Vehicle', required=True, ondelete='cascade')
    name = fields.Char(string='Document Name', required=True, tracking=True)
    document_type = fields.Selection([
        ('insurance', 'Insurance'),
        ('rc', 'Registration Certificate'),
        ('fitness', 'Fitness Certificate'),
        ('pollution', 'Pollution Certificate'),
        ('other', 'Other'),
    ], string='Document Type', required=True, tracking=True)
    expiry_date = fields.Date(string='Expiry Date', tracking=True)
    attachment_ids = fields.Many2many('ir.attachment', string='Attachments')
