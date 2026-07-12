# TransitOps - Odoo 18 Transport Management

A complete Transport Operations Platform built for Odoo 18 Hackathon!

## Modules Included

- `transit_base` - Base module with master data (Regions, Vehicle Types, License Categories, Routes)
- `transit_vehicle` - Vehicle Management
- `transit_driver` - Driver Management
- `transit_trip` - Trip Management & Dispatching
- `transit_maintenance` - Vehicle Maintenance Management
- `transit_expense` - Fuel & Expense Management
- `transit_dashboard` - Dashboard
- `transit_all` - Meta module to install all of the above

## Installation Instructions

1. **Move the `transitops` directory** into your Odoo addons folder
2. **Update Odoo's addons path** (if needed)
3. **Restart Odoo**
4. Go to Apps → Update Apps List
5. Search for "TransitOps All"
6. Click Install

## Key Features

- Vehicle Registration Number Uniqueness
- Cargo Weight Validation vs Vehicle Capacity
- Driver License Expiry Checks
- Auto Status Updates (Vehicle/Driver ↔ Trip/Maintenance)
- Security Groups & Access Rules
- Sample Data Included
