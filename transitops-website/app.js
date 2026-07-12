// Sample Data
let vehicles = [
    { id: 1, regNo: 'DL 1CA 1234', name: 'Tata Prima', model: 'Prima 4928.S', type: 'truck', capacity: 25, fuelType: 'diesel', status: 'available', odometer: 45000, acquisitionCost: 3500000, region: 'North', docs: [] },
    { id: 2, regNo: 'MH 01 AB 5678', name: 'Ashok Leyland', model: '4825', type: 'truck', capacity: 22, fuelType: 'diesel', status: 'on_trip', odometer: 62000, acquisitionCost: 3200000, region: 'West', docs: [] },
    { id: 3, regNo: 'KA 05 CD 9012', name: 'Eicher Pro', model: '6035', type: 'truck', capacity: 20, fuelType: 'diesel', status: 'maintenance', odometer: 35000, acquisitionCost: 2800000, region: 'South', docs: [] },
];

let drivers = [
    { id: 1, name: 'Rajesh Kumar', license: 'DL-12-2020-0012345', category: 'HMV', expiry: '2030-12-31', phone: '+91 9876543210', email: 'rajesh@example.com', safetyScore: 95, status: 'available' },
    { id: 2, name: 'Amit Singh', license: 'MH-01-2019-0067890', category: 'HMV', expiry: '2028-05-15', phone: '+91 9123456780', email: 'amit@example.com', safetyScore: 98, status: 'on_trip' },
];

let trips = [
    { id: 1, tripNo: 'TRIP-00001', source: 'Delhi', destination: 'Mumbai', vehicleId: 2, driverId: 2, cargoWeight: 20, distance: 1400, expectedFuel: 200, actualFuel: 0, revenue: 45000, status: 'dispatched', startDate: '2024-01-15', endDate: null },
    { id: 2, tripNo: 'TRIP-00002', source: 'Mumbai', destination: 'Bangalore', vehicleId: 1, driverId: 1, cargoWeight: 18, distance: 980, expectedFuel: 140, actualFuel: 135, revenue: 32000, status: 'completed', startDate: '2024-01-10', endDate: '2024-01-12' },
    { id: 3, tripNo: 'TRIP-00003', source: 'Bangalore', destination: 'Chennai', vehicleId: null, driverId: null, cargoWeight: 15, distance: 350, expectedFuel: 50, actualFuel: 0, revenue: 12000, status: 'draft', startDate: null, endDate: null },
];

let maintenance = [
    { id: 1, vehicleId: 3, type: 'oil_change', description: 'Oil Change', cost: 5000, status: 'in_progress', date: '2024-01-15' },
    { id: 2, vehicleId: 1, type: 'tyre', description: 'Tyre Replacement', cost: 20000, status: 'open', date: '2024-01-20' },
];

let fuelLogs = [
    { id: 1, vehicleId: 1, tripId: 2, date: '2024-01-10', quantity: 135, cost: 12000, vendor: 'Indian Oil', odometer: 44865 },
    { id: 2, vehicleId: 2, tripId: null, date: '2024-01-14', quantity: 200, cost: 18000, vendor: 'Bharat Petroleum', odometer: 61800 },
];

let expenses = [
    { id: 1, name: 'Toll Charges', type: 'toll', vehicleId: 1, tripId: 2, date: '2024-01-11', amount: 2500, notes: 'Delhi-Mumbai toll' },
    { id: 2, name: 'Parking', type: 'parking', vehicleId: 2, tripId: null, date: '2024-01-14', amount: 500, notes: 'Mumbai depot parking' },
];

// Utility Functions
function getVehicleById(id) { return vehicles.find(v => v.id === id); }
function getDriverById(id) { return drivers.find(d => d.id === id); }
function getTripById(id) { return trips.find(t => t.id === id); }

function getStatusBadge(status, type) {
    const configs = {
        vehicle: { available: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' }, on_trip: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' }, maintenance: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' }, retired: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' } },
        driver: { available: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' }, on_trip: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' }, off_duty: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' }, suspended: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' } },
        trip: { draft: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' }, dispatched: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' }, in_progress: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' }, completed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' }, cancelled: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' } },
        maintenance: { open: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' }, in_progress: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' }, completed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' } }
    };
    const config = configs[type][status];
    return `<span class="px-3 py-1 rounded-full ${config.bg} ${config.text} border ${config.border} font-semibold text-sm capitalize">${status.replace('_', ' ')}</span>`;
}

// Render Functions
function renderDashboard() {
    const recentTripsEl = document.getElementById('recent-trips');
    recentTripsEl.innerHTML = trips.slice(0, 3).map(t => {
        const vehicle = getVehicleById(t.vehicleId);
        const driver = getDriverById(t.driverId);
        return `
            <div class="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                        <i class="fas fa-truck-moving text-cyan-400"></i>
                    </div>
                    <div>
                        <p class="font-semibold text-white">${t.tripNo}</p>
                        <p class="text-gray-400 text-sm">${t.source} <i class="fas fa-arrow-right mx-2"></i> ${t.destination}</p>
                    </div>
                </div>
                ${getStatusBadge(t.status, 'trip')}
            </div>
        `;
    }).join('');
    
    const alertsEl = document.getElementById('maintenance-alerts');
    alertsEl.innerHTML = maintenance.slice(0, 2).map(m => {
        const vehicle = getVehicleById(m.vehicleId);
        return `
            <div class="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                <div class="flex items-start justify-between">
                    <div>
                        <p class="font-semibold text-white">${vehicle?.regNo || 'Unknown'}</p>
                        <p class="text-yellow-300 text-sm flex items-center gap-2 mt-1">
                            <i class="fas fa-wrench"></i>
                            ${m.description}
                        </p>
                    </div>
                    <i class="fas fa-exclamation-triangle text-yellow-400"></i>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('kpi-active-vehicles').textContent = vehicles.filter(v => v.status === 'on_trip').length;
    document.getElementById('kpi-available-vehicles').textContent = vehicles.filter(v => v.status === 'available').length;
}

function renderVehicles() {
    const grid = document.getElementById('vehicles-grid');
    grid.innerHTML = vehicles.map(v => `
        <div class="glass-card rounded-3xl p-6 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                    <i class="fas fa-truck text-2xl text-cyan-400"></i>
                </div>
                ${getStatusBadge(v.status, 'vehicle')}
            </div>
            <h4 class="text-xl font-bold mb-1">${v.name}</h4>
            <p class="text-gray-400 text-sm mb-4">${v.regNo}</p>
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Model</p>
                    <p class="font-semibold text-white">${v.model}</p>
                </div>
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Capacity</p>
                    <p class="font-semibold text-white">${v.capacity} Tons</p>
                </div>
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Fuel</p>
                    <p class="font-semibold text-white capitalize">${v.fuelType}</p>
                </div>
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Odometer</p>
                    <p class="font-semibold text-white">${v.odometer} km</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="showVehicleDocsModal(${v.id})" class="flex-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 font-semibold text-sm border border-cyan-500/30 transition-colors">
                    <i class="fas fa-file-alt mr-2"></i> Docs
                </button>
                <button onclick="deleteVehicle(${v.id})" class="py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold text-sm border border-red-500/30 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function renderDrivers() {
    const grid = document.getElementById('drivers-grid');
    grid.innerHTML = drivers.map(d => `
        <div class="glass-card rounded-3xl p-6 transition-all duration-300">
            <div class="flex items-center justify-between mb-4">
                <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                    <i class="fas fa-user text-2xl text-purple-400"></i>
                </div>
                ${getStatusBadge(d.status, 'driver')}
            </div>
            <h4 class="text-xl font-bold mb-1">${d.name}</h4>
            <p class="text-gray-400 text-sm mb-4">${d.license}</p>
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Category</p>
                    <p class="font-semibold text-white">${d.category}</p>
                </div>
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Safety</p>
                    <p class="font-semibold text-green-400">${d.safetyScore}</p>
                </div>
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Expires</p>
                    <p class="font-semibold text-white">${d.expiry}</p>
                </div>
                <div class="p-3 rounded-xl bg-white/5">
                    <p class="text-gray-400 text-xs uppercase">Phone</p>
                    <p class="font-semibold text-white">${d.phone}</p>
                </div>
            </div>
            <div class="flex gap-2">
                <button onclick="deleteDriver(${d.id})" class="flex-1 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold text-sm border border-red-500/30 transition-colors">
                    <i class="fas fa-trash mr-2"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

function renderTrips() {
    const list = document.getElementById('trips-list');
    list.innerHTML = trips.map(t => {
        const vehicle = getVehicleById(t.vehicleId);
        const driver = getDriverById(t.driverId);
        return `
            <div class="glass-card rounded-3xl p-6 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <h4 class="text-xl font-bold">${t.tripNo}</h4>
                    ${getStatusBadge(t.status, 'trip')}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="p-4 rounded-2xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase mb-1">Source</p>
                        <p class="font-semibold text-white">${t.source}</p>
                    </div>
                    <div class="p-4 rounded-2xl bg-white/5 flex items-center justify-center">
                        <i class="fas fa-arrow-right text-cyan-400 text-xl"></i>
                    </div>
                    <div class="p-4 rounded-2xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase mb-1">Destination</p>
                        <p class="font-semibold text-white">${t.destination}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Vehicle</p>
                        <p class="font-semibold text-white">${vehicle?.regNo || '-'}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Driver</p>
                        <p class="font-semibold text-white">${driver?.name || '-'}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Cargo</p>
                        <p class="font-semibold text-white">${t.cargoWeight} T</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Revenue</p>
                        <p class="font-semibold text-white">₹${t.revenue}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    ${t.status === 'draft' ? `<button onclick="dispatchTrip(${t.id})" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 font-semibold text-sm"><i class="fas fa-paper-plane mr-2"></i> Dispatch</button>` : ''}
                    ${t.status === 'dispatched' ? `<button onclick="completeTrip(${t.id})" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 font-semibold text-sm"><i class="fas fa-check mr-2"></i> Complete</button>` : ''}
                    ${t.status === 'draft' ? `<button onclick="deleteTrip(${t.id})" class="py-2 px-4 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold text-sm border border-red-500/30 transition-colors"><i class="fas fa-trash"></i></button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderMaintenance() {
    const list = document.getElementById('maintenance-list');
    list.innerHTML = maintenance.map(m => {
        const vehicle = getVehicleById(m.vehicleId);
        return `
            <div class="glass-card rounded-3xl p-6 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
                            <i class="fas fa-wrench text-2xl text-yellow-400"></i>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold">${vehicle?.regNo || 'Unknown'}</h4>
                            <p class="text-gray-400 text-sm">${m.date}</p>
                        </div>
                    </div>
                    ${getStatusBadge(m.status, 'maintenance')}
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Description</p>
                        <p class="font-semibold text-white">${m.description}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Cost</p>
                        <p class="font-semibold text-white">₹${m.cost}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    ${m.status === 'open' ? `<button onclick="startMaintenance(${m.id})" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold text-sm"><i class="fas fa-play mr-2"></i> Start</button>` : ''}
                    ${m.status === 'in_progress' ? `<button onclick="completeMaintenance(${m.id})" class="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 font-semibold text-sm"><i class="fas fa-check mr-2"></i> Complete</button>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function renderFuelLogs() {
    const list = document.getElementById('fuel-list');
    list.innerHTML = fuelLogs.map(f => {
        const vehicle = getVehicleById(f.vehicleId);
        const trip = getTripById(f.tripId);
        return `
            <div class="glass-card rounded-3xl p-6 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                            <i class="fas fa-gas-pump text-2xl text-orange-400"></i>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold">${vehicle?.regNo || 'Unknown'}</h4>
                            <p class="text-gray-400 text-sm">${f.date}</p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Quantity</p>
                        <p class="font-semibold text-white">${f.quantity} L</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Cost</p>
                        <p class="font-semibold text-white">₹${f.cost}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Odometer</p>
                        <p class="font-semibold text-white">${f.odometer} km</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Vendor</p>
                        <p class="font-semibold text-white">${f.vendor}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderExpenses() {
    const list = document.getElementById('expenses-list');
    list.innerHTML = expenses.map(e => {
        const vehicle = getVehicleById(e.vehicleId);
        const trip = getTripById(e.tripId);
        return `
            <div class="glass-card rounded-3xl p-6 transition-all duration-300">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
                            <i class="fas fa-file-invoice-dollar text-2xl text-green-400"></i>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold">${e.name}</h4>
                            <p class="text-gray-400 text-sm">${e.date}</p>
                        </div>
                    </div>
                    <span class="px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-sm capitalize">${e.type}</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Amount</p>
                        <p class="font-semibold text-white">₹${e.amount}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Vehicle</p>
                        <p class="font-semibold text-white">${vehicle?.regNo || '-'}</p>
                    </div>
                    <div class="p-3 rounded-xl bg-white/5">
                        <p class="text-gray-400 text-xs uppercase">Trip</p>
                        <p class="font-semibold text-white">${trip?.tripNo || '-'}</p>
                    </div>
                </div>
                ${e.notes ? `<p class="text-gray-400 text-sm">${e.notes}</p>` : ''}
            </div>
        `;
    }).join('');
}

// Action Functions
function showAddVehicleModal() {
    const modalHTML = `
        <div id="vehicle-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div class="glass-card rounded-3xl p-8 w-full max-w-2xl">
                <h3 class="text-2xl font-bold mb-6">Add New Vehicle</h3>
                <form id="add-vehicle-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Registration Number</label>
                            <input type="text" name="regNo" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Vehicle Name</label>
                            <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Model</label>
                            <input type="text" name="model" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Capacity (Tons)</label>
                            <input type="number" name="capacity" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Fuel Type</label>
                            <select name="fuelType" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                                <option value="diesel">Diesel</option>
                                <option value="petrol">Petrol</option>
                                <option value="cng">CNG</option>
                                <option value="electric">Electric</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Acquisition Cost</label>
                            <input type="number" name="acquisitionCost" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="closeModal('vehicle-modal')" class="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors">Cancel</button>
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">Add Vehicle</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('modals-container').innerHTML = modalHTML;
    document.getElementById('add-vehicle-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        vehicles.push({
            id: Date.now(),
            regNo: formData.get('regNo'),
            name: formData.get('name'),
            model: formData.get('model'),
            capacity: parseFloat(formData.get('capacity')),
            fuelType: formData.get('fuelType'),
            acquisitionCost: parseFloat(formData.get('acquisitionCost')),
            status: 'available',
            odometer: 0,
            region: 'North',
            docs: []
        });
        renderVehicles();
        renderDashboard();
        closeModal('vehicle-modal');
    });
}

function showVehicleDocsModal(vehicleId) {
    const vehicle = getVehicleById(vehicleId);
    if (!vehicle) return;
    const modalHTML = `
        <div id="vehicle-docs-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div class="glass-card rounded-3xl p-8 w-full max-w-md">
                <h3 class="text-2xl font-bold mb-6">Documents - ${vehicle.regNo}</h3>
                <div class="space-y-4 mb-6">
                    ${vehicle.docs.length > 0 ? vehicle.docs.map(doc => `
                        <div class="flex items-center justify-between p-3 rounded-xl bg-white/5">
                            <div>
                                <p class="font-semibold text-white">${doc.name}</p>
                                <p class="text-gray-400 text-sm capitalize">${doc.type}${doc.expiry ? ' • Expires: ' + doc.expiry : ''}</p>
                            </div>
                            <button onclick="deleteVehicleDoc(${vehicleId}, '${doc.name}')" class="text-red-400 hover:text-red-300"><i class="fas fa-trash"></i></button>
                        </div>
                    `).join('') : `<p class="text-gray-400">No documents added yet</p>`}
                </div>
                <form id="add-doc-form" class="space-y-4">
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Document Name</label>
                        <input type="text" name="docName" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Type</label>
                        <select name="docType" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                            <option value="insurance">Insurance</option>
                            <option value="rc">Registration Certificate</option>
                            <option value="fitness">Fitness</option>
                            <option value="pollution">Pollution Certificate</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Expiry Date (optional)</label>
                        <input type="date" name="docExpiry" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                    </div>
                    <div class="flex gap-3">
                        <button type="button" onclick="closeModal('vehicle-docs-modal')" class="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors">Cancel</button>
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">Add Document</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('modals-container').innerHTML = modalHTML;
    document.getElementById('add-doc-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        vehicle.docs.push({
            name: formData.get('docName'),
            type: formData.get('docType'),
            expiry: formData.get('docExpiry')
        });
        renderVehicles();
        closeModal('vehicle-docs-modal');
        showVehicleDocsModal(vehicleId);
    });
}

function deleteVehicleDoc(vehicleId, docName) {
    const vehicle = getVehicleById(vehicleId);
    if (vehicle) {
        vehicle.docs = vehicle.docs.filter(d => d.name !== docName);
        renderVehicles();
        showVehicleDocsModal(vehicleId);
    }
}

function showAddDriverModal() {
    const modalHTML = `
        <div id="driver-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div class="glass-card rounded-3xl p-8 w-full max-w-2xl">
                <h3 class="text-2xl font-bold mb-6">Add New Driver</h3>
                <form id="add-driver-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Driver Name</label>
                            <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">License Number</label>
                            <input type="text" name="license" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Phone</label>
                            <input type="text" name="phone" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Email</label>
                            <input type="email" name="email" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">License Expiry</label>
                            <input type="date" name="expiry" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">License Category</label>
                            <select name="category" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                                <option value="HMV">HMV</option>
                                <option value="LMV">LMV</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="closeModal('driver-modal')" class="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors">Cancel</button>
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">Add Driver</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('modals-container').innerHTML = modalHTML;
    document.getElementById('add-driver-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        drivers.push({
            id: Date.now(),
            name: formData.get('name'),
            license: formData.get('license'),
            category: formData.get('category'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            expiry: formData.get('expiry'),
            safetyScore: 100,
            status: 'available'
        });
        renderDrivers();
        closeModal('driver-modal');
    });
}

function showAddTripModal() {
    const availableVehicles = vehicles.filter(v => v.status === 'available');
    const availableDrivers = drivers.filter(d => d.status === 'available');
    const modalHTML = `
        <div id="trip-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div class="glass-card rounded-3xl p-8 w-full max-w-2xl">
                <h3 class="text-2xl font-bold mb-6">New Trip</h3>
                <form id="add-trip-form" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Source</label>
                            <input type="text" name="source" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Destination</label>
                            <input type="text" name="destination" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Vehicle</label>
                            <select name="vehicleId" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                                <option value="">Select</option>
                                ${availableVehicles.map(v => `<option value="${v.id}">${v.regNo} - ${v.name}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Driver</label>
                            <select name="driverId" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                                <option value="">Select</option>
                                ${availableDrivers.map(d => `<option value="${d.id}">${d.name}</option>`).join('')}
                            </select>
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Cargo Weight (Tons)</label>
                            <input type="number" name="cargoWeight" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Distance (km)</label>
                            <input type="number" name="distance" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Expected Fuel (L)</label>
                            <input type="number" name="expectedFuel" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Revenue</label>
                            <input type="number" name="revenue" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="closeModal('trip-modal')" class="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors">Cancel</button>
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">Create Trip</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('modals-container').innerHTML = modalHTML;
    document.getElementById('add-trip-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        trips.push({
            id: Date.now(),
            tripNo: `TRIP-${String(trips.length + 1).padStart(5, '0')}`,
            source: formData.get('source'),
            destination: formData.get('destination'),
            vehicleId: formData.get('vehicleId') ? parseInt(formData.get('vehicleId')) : null,
            driverId: formData.get('driverId') ? parseInt(formData.get('driverId')) : null,
            cargoWeight: parseFloat(formData.get('cargoWeight')),
            distance: parseFloat(formData.get('distance')),
            expectedFuel: parseFloat(formData.get('expectedFuel') || 0),
            actualFuel: 0,
            revenue: parseFloat(formData.get('revenue')),
            status: 'draft',
            startDate: null,
            endDate: null
        });
        renderTrips();
        renderDashboard();
        closeModal('trip-modal');
    });
}

function showAddMaintenanceModal() {
    const modalHTML = `
        <div id="maintenance-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div class="glass-card rounded-3xl p-8 w-full max-w-md">
                <h3 class="text-2xl font-bold mb-6">New Maintenance</h3>
                <form id="add-maintenance-form" class="space-y-4">
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Vehicle</label>
                        <select name="vehicleId" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                            ${vehicles.map(v => `<option value="${v.id}">${v.regNo} - ${v.name}</option>`).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Type</label>
                        <select name="type" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                            <option value="oil_change">Oil Change</option>
                            <option value="engine">Engine</option>
                            <option value="tyre">Tyre</option>
                            <option value="service">Service</option>
                            <option value="repair">Repair</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Description</label>
                        <input type="text" name="description" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Cost</label>
                        <input type="number" name="cost" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="closeModal('maintenance-modal')" class="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors">Cancel</button>
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">Add</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('modals-container').innerHTML = modalHTML;
    document.getElementById('add-maintenance-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        maintenance.push({
            id: Date.now(),
            vehicleId: parseInt(formData.get('vehicleId')),
            type: formData.get('type'),
            description: formData.get('description'),
            cost: parseFloat(formData.get('cost')),
            status: 'open',
            date: new Date().toISOString().split('T')[0]
        });
        renderMaintenance();
        renderDashboard();
        closeModal('maintenance-modal');
    });
}

function showAddFuelModal() {
    const modalHTML = `
        <div id="fuel-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div class="glass-card rounded-3xl p-8 w-full max-w-md">
                <h3 class="text-2xl font-bold mb-6">Add Fuel Log</h3>
                <form id="add-fuel-form" class="space-y-4">
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Vehicle</label>
                        <select name="vehicleId" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                            ${vehicles.map(v => `<option value="${v.id}">${v.regNo} - ${v.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Quantity (L)</label>
                            <input type="number" name="quantity" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Cost</label>
                            <input type="number" name="cost" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Vendor</label>
                        <input type="text" name="vendor" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Odometer (km)</label>
                        <input type="number" name="odometer" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="closeModal('fuel-modal')" class="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors">Cancel</button>
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">Add</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('modals-container').innerHTML = modalHTML;
    document.getElementById('add-fuel-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fuelLogs.push({
            id: Date.now(),
            vehicleId: parseInt(formData.get('vehicleId')),
            tripId: null,
            date: new Date().toISOString().split('T')[0],
            quantity: parseFloat(formData.get('quantity')),
            cost: parseFloat(formData.get('cost')),
            vendor: formData.get('vendor'),
            odometer: parseFloat(formData.get('odometer'))
        });
        renderFuelLogs();
        closeModal('fuel-modal');
    });
}

function showAddExpenseModal() {
    const modalHTML = `
        <div id="expense-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div class="glass-card rounded-3xl p-8 w-full max-w-md">
                <h3 class="text-2xl font-bold mb-6">Add Expense</h3>
                <form id="add-expense-form" class="space-y-4">
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Expense Name</label>
                        <input type="text" name="name" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Type</label>
                        <select name="type" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                            <option value="fuel">Fuel</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="toll">Toll</option>
                            <option value="parking">Parking</option>
                            <option value="insurance">Insurance</option>
                            <option value="misc">Miscellaneous</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Amount</label>
                            <input type="number" name="amount" required class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                        </div>
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Vehicle</label>
                            <select name="vehicleId" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white">
                                <option value="">Select</option>
                                ${vehicles.map(v => `<option value="${v.id}">${v.regNo}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-gray-400 text-sm mb-2">Notes</label>
                        <textarea name="notes" rows="3" class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-purple-500/50 outline-none text-white"></textarea>
                    </div>
                    <div class="flex gap-3 mt-6">
                        <button type="button" onclick="closeModal('expense-modal')" class="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition-colors">Cancel</button>
                        <button type="submit" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-semibold">Add</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.getElementById('modals-container').innerHTML = modalHTML;
    document.getElementById('add-expense-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        expenses.push({
            id: Date.now(),
            name: formData.get('name'),
            type: formData.get('type'),
            vehicleId: formData.get('vehicleId') ? parseInt(formData.get('vehicleId')) : null,
            tripId: null,
            date: new Date().toISOString().split('T')[0],
            amount: parseFloat(formData.get('amount')),
            notes: formData.get('notes')
        });
        renderExpenses();
        closeModal('expense-modal');
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.remove();
}

function deleteVehicle(id) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        vehicles = vehicles.filter(v => v.id !== id);
        renderVehicles();
        renderDashboard();
    }
}

function deleteDriver(id) {
    if (confirm('Are you sure you want to delete this driver?')) {
        drivers = drivers.filter(d => d.id !== id);
        renderDrivers();
    }
}

function deleteTrip(id) {
    if (confirm('Are you sure you want to delete this trip?')) {
        trips = trips.filter(t => t.id !== id);
        renderTrips();
        renderDashboard();
    }
}

function dispatchTrip(id) {
    const trip = trips.find(t => t.id === id);
    if (trip) {
        const vehicle = getVehicleById(trip.vehicleId);
        const driver = getDriverById(trip.driverId);
        if (vehicle) {
            if (vehicle.status !== 'available') throw new Error('Vehicle not available!');
            vehicle.status = 'on_trip';
        }
        if (driver) {
            if (driver.status !== 'available') throw new Error('Driver not available!');
            driver.status = 'on_trip';
        }
        trip.status = 'dispatched';
        trip.startDate = new Date().toISOString().split('T')[0];
        renderTrips();
        renderVehicles();
        renderDrivers();
        renderDashboard();
    }
}

function completeTrip(id) {
    const trip = trips.find(t => t.id === id);
    if (trip) {
        const vehicle = getVehicleById(trip.vehicleId);
        const driver = getDriverById(trip.driverId);
        if (vehicle) vehicle.status = 'available';
        if (driver) driver.status = 'available';
        trip.status = 'completed';
        trip.endDate = new Date().toISOString().split('T')[0];
        renderTrips();
        renderVehicles();
        renderDrivers();
        renderDashboard();
    }
}

function startMaintenance(id) {
    const m = maintenance.find(x => x.id === id);
    if (m) {
        const vehicle = getVehicleById(m.vehicleId);
        if (vehicle) vehicle.status = 'maintenance';
        m.status = 'in_progress';
        renderMaintenance();
        renderVehicles();
        renderDashboard();
    }
}

function completeMaintenance(id) {
    const m = maintenance.find(x => x.id === id);
    if (m) {
        const vehicle = getVehicleById(m.vehicleId);
        if (vehicle) vehicle.status = 'available';
        m.status = 'completed';
        renderMaintenance();
        renderVehicles();
        renderDashboard();
    }
}

function exportReport(type) {
    let csvContent = 'data:text/csv;charset=utf-8,';
    let rows = [];
    switch(type) {
        case 'fleet':
            rows = [['Vehicle', 'Status', 'Trips', 'Revenue']];
            vehicles.forEach(v => {
                const vTrips = trips.filter(t => t.vehicleId === v.id);
                const totalRev = vTrips.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.revenue, 0);
                rows.push([v.regNo, v.status, vTrips.length, totalRev]);
            });
            break;
        case 'fuel':
            rows = [['Vehicle', 'Date', 'Quantity(L)', 'Cost', 'Odometer']];
            fuelLogs.forEach(f => {
                const v = getVehicleById(f.vehicleId);
                rows.push([v?.regNo || '-', f.date, f.quantity, f.cost, f.odometer]);
            });
            break;
        case 'expense':
            rows = [['Name', 'Type', 'Amount', 'Vehicle', 'Date']];
            expenses.forEach(e => {
                const v = getVehicleById(e.vehicleId);
                rows.push([e.name, e.type, e.amount, v?.regNo || '-', e.date]);
            });
            break;
        case 'driver':
            rows = [['Driver', 'Trips', 'Safety Score', 'Status']];
            drivers.forEach(d => {
                const dTrips = trips.filter(t => t.driverId === d.id);
                rows.push([d.name, dTrips.length, d.safetyScore, d.status]);
            });
            break;
    }
    csvContent += rows.map(r => r.join(',')).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `${type}_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById(`page-${page}`).classList.remove('hidden');
        
        if (page === 'dashboard') renderDashboard();
        else if (page === 'vehicles') renderVehicles();
        else if (page === 'drivers') renderDrivers();
        else if (page === 'trips') renderTrips();
        else if (page === 'maintenance') renderMaintenance();
        else if (page === 'fuel') renderFuelLogs();
        else if (page === 'expenses') renderExpenses();
    });
});

// Initial Render
renderDashboard();
renderVehicles();
renderDrivers();
renderTrips();
renderMaintenance();
renderFuelLogs();
renderExpenses();
