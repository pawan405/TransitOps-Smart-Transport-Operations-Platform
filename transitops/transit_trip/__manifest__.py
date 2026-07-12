{
    'name': 'TransitOps Trip',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'Trip management for TransitOps',
    'description': """
        TransitOps Trip Module
        ====================
        Trip management with dispatching and status transitions.
    """,
    'author': 'TransitOps Team',
    'depends': ['transit_vehicle', 'transit_driver'],
    'data': [
        'security/ir.model.access.csv',
        'views/transit_trip_views.xml',
        'data/transit_trip_data.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
