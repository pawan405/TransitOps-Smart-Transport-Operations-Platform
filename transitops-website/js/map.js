
import { mapCenter, mapZoom, warehouses, routes, vehicles } from './mapData.js';

let map;

// Custom marker icons using SVG
function createCustomIcon(type) {
  const colors = {
    truck: '#00f0ff',
    van: '#00e383',
    maintenance: '#ffba20',
    fuel: '#ffb4ab',
    warehouse: '#7df4ff',
    depot: '#00dbe9'
  };
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="${colors[type]}20" stroke="${colors[type]}" stroke-width="2"/>
      <circle cx="16" cy="16" r="8" fill="${colors[type]}"/>
    </svg>
  `;
  
  return L.divIcon({
    className: 'custom-marker',
    html: svg,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

export function initMap() {
  if (map) {
    return; // Avoid duplicate initialization
  }

  // Initialize the map
  map = L.map('map-container', {
    zoomControl: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    dragging: true
  }).setView(mapCenter, mapZoom);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add scale control
  L.control.scale({ position: 'bottomleft' }).addTo(map);

  // Draw routes
  routes.forEach(route => {
    L.polyline(route.coordinates, {
      color: route.color,
      weight: route.weight,
      dashArray: route.dashArray || null
    }).addTo(map);
  });

  // Add warehouses
  warehouses.forEach(warehouse => {
    const icon = createCustomIcon(warehouse.type);
    const marker = L.marker([warehouse.lat, warehouse.lng], { icon }).addTo(map);
    marker.bindPopup(`
      <div style="color: #e2e2e6;">
        <h4 style="color: #00f0ff; margin: 0 0 8px 0;">${warehouse.name}</h4>
        <p style="margin: 0; text-transform: capitalize;">Type: ${warehouse.type}</p>
      </div>
    `);
  });

  // Add vehicles
  vehicles.forEach(vehicle => {
    const icon = createCustomIcon(vehicle.type);
    const marker = L.marker([vehicle.lat, vehicle.lng], { icon }).addTo(map);
    
    const popupContent = `
      <div style="color: #e2e2e6;">
        <h4 style="color: #00f0ff; margin: 0 0 8px 0;">Vehicle: ${vehicle.id}</h4>
        <p style="margin: 4px 0;">Driver: ${vehicle.driver}</p>
        <p style="margin: 4px 0;">Status: <span style="color: #00e383;">${vehicle.status}</span></p>
        <p style="margin: 4px 0;">Speed: ${vehicle.speed} km/h</p>
        <p style="margin: 4px 0;">Fuel: ${vehicle.fuel}%</p>
        ${vehicle.eta ? `<p style="margin: 4px 0;">ETA: ${vehicle.eta}</p>` : ''}
      </div>
    `;
    
    marker.bindPopup(popupContent);
  });
}

