{
    'name': 'TransitOps Driver',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'Driver management for TransitOps',
    'description': """
        TransitOps Driver Module
        =======================
        Driver management with license tracking and expiry alerts.
    """,
    'author': 'TransitOps Team',
    'depends': ['transit_base'],
    'data': [
        'security/ir.model.access.csv',
        'views/transit_driver_views.xml',
        'data/transit_driver_data.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
