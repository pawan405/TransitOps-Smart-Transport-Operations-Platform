{
    'name': 'TransitOps Vehicle',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'Vehicle management for TransitOps',
    'description': """
        TransitOps Vehicle Module
        =======================
        Comprehensive vehicle management system.
    """,
    'author': 'TransitOps Team',
    'depends': ['transit_base'],
    'data': [
        'security/ir.model.access.csv',
        'views/transit_vehicle_views.xml',
        'data/transit_vehicle_data.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
