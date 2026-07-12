{
    'name': 'TransitOps Expense',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'Fuel and expense management for TransitOps',
    'description': """
        TransitOps Expense Module
        =======================
        Fuel logs and expense tracking for vehicles and trips.
    """,
    'author': 'TransitOps Team',
    'depends': ['transit_trip'],
    'data': [
        'security/ir.model.access.csv',
        'views/transit_expense_views.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
