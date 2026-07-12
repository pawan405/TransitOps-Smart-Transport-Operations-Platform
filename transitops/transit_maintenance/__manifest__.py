{
    'name': 'TransitOps Maintenance',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'Maintenance management for TransitOps',
    'description': """
        TransitOps Maintenance Module
        ===========================
        Vehicle maintenance management.
    """,
    'author': 'TransitOps Team',
    'depends': ['transit_vehicle'],
    'data': [
        'security/ir.model.access.csv',
        'views/transit_maintenance_views.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
