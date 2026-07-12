{
    'name': 'TransitOps Base',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'Base module for TransitOps platform',
    'description': """
        TransitOps Base Module
        ====================
        Core module containing shared models and utilities for the TransitOps transport management system.
    """,
    'author': 'TransitOps Team',
    'depends': ['base', 'mail'],
    'data': [
        'security/transit_security.xml',
        'security/ir.model.access.csv',
        'views/transit_base_views.xml',
        'data/transit_base_data.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
