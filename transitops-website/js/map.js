import { warehouses, routes, vehicles } from './mapData.js';

let initialized = false;
let rafId = 0;

const colors = {
  truck: '#00f0ff',
  van: '#00e383',
  maintenance: '#ffba20',
  fuel: '#ffb4ab',
  warehouse: '#7df4ff',
  depot: '#00dbe9'
};

function boundsFor(points) {
  const lats = points.map((point) => point.lat);
  const lngs = points.map((point) => point.lng);
  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs)
  };
}

function projector(bounds) {
  const pad = 9;
  const latSpan = Math.max(0.0001, bounds.maxLat - bounds.minLat);
  const lngSpan = Math.max(0.0001, bounds.maxLng - bounds.minLng);
  return function project(lat, lng) {
    const x = pad + ((lng - bounds.minLng) / lngSpan) * (100 - pad * 2);
    const y = pad + (1 - ((lat - bounds.minLat) / latSpan)) * (100 - pad * 2);
    return { x, y };
  };
}

function pathFor(route, project) {
  return route.coordinates.map(([lat, lng], index) => {
    const { x, y } = project(lat, lng);
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function routeSegments(project) {
  const segments = [];
  routes.forEach((route) => {
    for (let i = 1; i < route.coordinates.length; i += 1) {
      const start = route.coordinates[i - 1];
      const end = route.coordinates[i];
      segments.push({
        color: route.color,
        start: project(start[0], start[1]),
        end: project(end[0], end[1])
      });
    }
  });
  return segments;
}

function pointAlong(segment, t) {
  const x = segment.start.x + (segment.end.x - segment.start.x) * t;
  const y = segment.start.y + (segment.end.y - segment.start.y) * t;
  const angle = Math.atan2(segment.end.y - segment.start.y, segment.end.x - segment.start.x) * 180 / Math.PI + 90;
  return { x, y, angle };
}

function renderMap(container, project) {
  const routeMarkup = routes.map((route, index) => {
    const d = pathFor(route, project);
    const width = route.weight || 3;
    const dash = route.dashArray ? '12 11' : 'none';
    return `
      <path class="ops-route-line" d="${d}" stroke="${route.color}" stroke-width="${width}" stroke-dasharray="${dash}" style="animation-delay:${index * 120}ms"></path>
      <path class="ops-route-flow" d="${d}" style="animation-delay:${index * 80}ms"></path>
    `;
  }).join('');

  const nodes = warehouses.map((warehouse) => {
    const point = project(warehouse.lat, warehouse.lng);
    const color = colors[warehouse.type] || colors.warehouse;
    return `<div class="ops-node" style="--x:${point.x.toFixed(2)};--y:${point.y.toFixed(2)};color:${color}"><span class="ops-node-label">${warehouse.name}</span></div>`;
  }).join('');

  const markers = vehicles.map((vehicle, index) => {
    const point = project(vehicle.lat, vehicle.lng);
    return `<div class="ops-vehicle-marker" data-vehicle="${vehicle.id}" data-type="${vehicle.type}" style="--x:${point.x.toFixed(2)};--y:${point.y.toFixed(2)}"><span class="ops-vehicle-tag">${vehicle.id}</span></div>`;
  }).join('');

  container.innerHTML = `
    <svg class="ops-map-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="ops-map-glow"><feGaussianBlur stdDeviation="1.4" result="blur"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>
      </defs>
      <g filter="url(#ops-map-glow)">${routeMarkup}</g>
      <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(0,240,255,.14)" stroke-width=".3"></circle>
      <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(0,227,131,.12)" stroke-width=".25"></circle>
    </svg>
    ${nodes}
    ${markers}
  `;
}

export function initMap() {
  const container = document.getElementById('map-container');
  if (!container || initialized) return;
  initialized = true;

  const points = [
    ...warehouses.map((item) => ({ lat: item.lat, lng: item.lng })),
    ...vehicles.map((item) => ({ lat: item.lat, lng: item.lng })),
    ...routes.flatMap((route) => route.coordinates.map(([lat, lng]) => ({ lat, lng })))
  ];
  const project = projector(boundsFor(points));
  const segments = routeSegments(project);
  renderMap(container, project);

  const markerNodes = Array.from(container.querySelectorAll('.ops-vehicle-marker'));
  const assignments = markerNodes.map((node, index) => ({
    node,
    segment: segments[index % segments.length],
    speed: 0.035 + (index % 5) * 0.009,
    offset: (index * 0.137) % 1,
    reverse: index % 3 === 0
  }));

  const start = performance.now();
  function animate(now) {
    const elapsed = (now - start) / 1000;
    assignments.forEach((assignment) => {
      let t = (assignment.offset + elapsed * assignment.speed) % 1;
      if (assignment.reverse) t = 1 - t;
      const point = pointAlong(assignment.segment, t);
      assignment.node.style.setProperty('--x', point.x.toFixed(2));
      assignment.node.style.setProperty('--y', point.y.toFixed(2));
      assignment.node.style.transform = `translate(-50%, -50%) rotate(${point.angle.toFixed(1)}deg)`;
    });
    rafId = requestAnimationFrame(animate);
  }
  rafId = requestAnimationFrame(animate);

  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId), { once: true });
}
