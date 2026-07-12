{
    'name': 'TransitOps All',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'TransitOps Full Suite',
    'description': """
        TransitOps Complete Transport Management
        =======================================
        Install all TransitOps modules.
    """,
    'author': 'TransitOps Team',
    'depends': [
        'transit_base',
        'transit_vehicle',
        'transit_driver',
        'transit_trip',
        'transit_maintenance',
        'transit_expense',
        'transit_dashboard',
    ],
    'data': [],
    'installable': True,
    'application': True,
    'auto_install': False,
    'license': 'LGPL-3',
}
