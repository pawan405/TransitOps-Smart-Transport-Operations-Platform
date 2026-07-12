
// Center coordinates for Agra, Uttar Pradesh, India
export const mapCenter = [27.1767, 78.0081];
export const mapZoom = 13;

// Warehouses in and around Agra
export const warehouses = [
  { id: 'wh-001', name: 'North Depot', type: 'depot', lat: 27.2000, lng: 77.9800 },
  { id: 'wh-002', name: 'South Warehouse', type: 'warehouse', lat: 27.1500, lng: 78.0200 },
  { id: 'wh-003', name: 'Main Hub', type: 'warehouse', lat: 27.1767, lng: 78.0081 },
  { id: 'wh-004', name: 'Repair Center', type: 'maintenance', lat: 27.1900, lng: 78.0300 }
];

// Routes between warehouses (colored polylines)
export const routes = [
  { coordinates: [[27.2000, 77.9800], [27.1767, 78.0081]], color: '#00f0ff', weight: 3 },
  { coordinates: [[27.1767, 78.0081], [27.1500, 78.0200]], color: '#00e383', weight: 3 },
  { coordinates: [[27.1767, 78.0081], [27.1900, 78.0300]], color: '#ffba20', weight: 3 },
  { coordinates: [[27.2000, 77.9800], [27.1500, 78.0200]], color: '#7df4ff', weight: 2, dashArray: '10, 10' }
];

// Mock fleet vehicles
export const vehicles = [
  { id: 'TRK-101', type: 'truck', name: 'Tata Prima', lat: 27.1820, lng: 77.9950, driver: 'Rajesh Kumar', status: 'On Delivery', speed: 48, fuel: 72, trip: 'AGR-045', eta: '24 Minutes' },
  { id: 'TRK-102', type: 'truck', name: 'Ashok Leyland', lat: 27.1680, lng: 78.0150, driver: 'Amit Singh', status: 'Idle', speed: 0, fuel: 95, trip: null, eta: null },
  { id: 'VAN-201', type: 'van', name: 'Force Traveller', lat: 27.1950, lng: 78.0100, driver: 'Suresh Yadav', status: 'On Pickup', speed: 35, fuel: 60, trip: 'AGR-046', eta: '18 Minutes' },
  { id: 'VAN-202', type: 'van', name: 'Maruti Super Carry', lat: 27.1550, lng: 77.9900, driver: 'Vikram Singh', status: 'Returning', speed: 42, fuel: 80, trip: 'AGR-043', eta: '12 Minutes' },
  { id: 'MNT-301', type: 'maintenance', name: 'Service Van', lat: 27.1850, lng: 78.0250, driver: 'Ravi Kumar', status: 'On Service', speed: 25, fuel: 55, trip: 'SRV-012', eta: '8 Minutes' },
  { id: 'FLT-401', type: 'fuel', name: 'Fuel Tanker', lat: 27.1700, lng: 77.9850, driver: 'Mohan Sharma', status: 'En Route', speed: 30, fuel: 100, trip: 'FLT-007', eta: '30 Minutes' },
  { id: 'TRK-103', type: 'truck', name: 'Eicher Pro', lat: 27.2050, lng: 78.0000, driver: 'Prakash Verma', status: 'On Delivery', speed: 52, fuel: 45, trip: 'AGR-047', eta: '40 Minutes' },
  { id: 'VAN-203', type: 'van', name: 'Tata Ace', lat: 27.1600, lng: 78.0050, driver: 'Neeraj Gupta', status: 'Idle', speed: 0, fuel: 90, trip: null, eta: null },
  { id: 'MNT-302', type: 'maintenance', name: 'Tow Truck', lat: 27.1780, lng: 78.0350, driver: 'Raju Patel', status: 'Standby', speed: 0, fuel: 85, trip: null, eta: null },
  { id: 'FLT-402', type: 'fuel', name: 'Fuel Bowser', lat: 27.1920, lng: 77.9980, driver: 'Anil Singh', status: 'Refueling', speed: 0, fuel: 98, trip: null, eta: null }
];

