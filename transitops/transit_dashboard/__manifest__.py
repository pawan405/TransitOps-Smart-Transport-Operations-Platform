{
    'name': 'TransitOps Dashboard',
    'version': '18.0.1.0.0',
    'category': 'Transport',
    'summary': 'Dashboard for TransitOps',
    'description': """
        TransitOps Dashboard Module
        =========================
        Beautiful dashboard with KPIs.
    """,
    'author': 'TransitOps Team',
    'depends': ['transit_all'],
    'data': [
        'views/transit_dashboard_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'transit_dashboard/static/src/**/*',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}
