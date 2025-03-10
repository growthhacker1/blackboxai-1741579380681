// App state management
let state = {
    currentPage: 'orders', // orders, create-order, order-details
    orders: [],
    selectedOrder: null,
    user: null,
    isLoading: false,
    error: null
};

// Render functions
function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="flex h-screen bg-gray-50">
            ${renderSidebar()}
            <div class="flex-1 flex flex-col overflow-hidden">
                ${renderHeader()}
                <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    ${renderContent()}
                </main>
            </div>
        </div>
        ${renderToast()}
    `;
    attachEventListeners();
}

function renderSidebar() {
    return `
        <aside class="hidden md:flex md:flex-shrink-0">
            <div class="flex flex-col w-64 bg-gray-800">
                <div class="flex items-center justify-center h-16 bg-gray-900">
                    <span class="text-white text-lg font-semibold">Order Management</span>
                </div>
                <div class="flex flex-col flex-1 overflow-y-auto">
                    <nav class="flex-1 px-2 py-4 space-y-1">
                        <a href="#" class="nav-link ${state.currentPage === 'orders' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'} group flex items-center px-2 py-2 text-sm font-medium rounded-md" data-page="orders">
                            <i class="fas fa-list mr-3"></i>
                            Orders
                        </a>
                        <a href="#" class="nav-link ${state.currentPage === 'create-order' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700'} group flex items-center px-2 py-2 text-sm font-medium rounded-md" data-page="create-order">
                            <i class="fas fa-plus mr-3"></i>
                            Create Order
                        </a>
                    </nav>
                </div>
            </div>
        </aside>
    `;
}

function renderHeader() {
    return `
        <header class="bg-white shadow">
            <div class="flex justify-between items-center px-6 py-4">
                <h1 class="text-2xl font-semibold text-gray-900">
                    ${getPageTitle()}
                </h1>
                <div class="flex items-center">
                    <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center" id="createOrderBtn">
                        <i class="fas fa-plus mr-2"></i>
                        New Order
                    </button>
                </div>
            </div>
        </header>
    `;
}

function renderContent() {
    switch(state.currentPage) {
        case 'orders':
            return renderOrdersList();
        case 'create-order':
            return renderOrderForm();
        case 'order-details':
            return renderOrderDetails();
        default:
            return renderOrdersList();
    }
}

function renderOrdersList() {
    if (state.isLoading) {
        return renderLoader();
    }

    return `
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex-1 min-w-0">
                        <div class="relative rounded-md shadow-sm">
                            <input type="text" id="searchOrders" class="form-input block w-full pl-10 sm:text-sm sm:leading-5" placeholder="Search orders...">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bilti No</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${renderOrderRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function renderOrderRows() {
    if (!state.orders.length) {
        return `
            <tr>
                <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                    No orders found
                </td>
            </tr>
        `;
    }

    return state.orders.map(order => `
        <tr class="hover:bg-gray-50 cursor-pointer" data-order-id="${order._id}">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${order.biltiNo}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.biltiMiti}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.origin}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.destination}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${renderOrderStatus(order.status)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ₹${order.calculations?.totalAmount?.toFixed(2) || '0.00'}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3" onclick="viewOrder('${order._id}')">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="text-indigo-600 hover:text-indigo-900 mr-3" onclick="editOrder('${order._id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteOrder('${order._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function renderOrderStatus(status) {
    const statusClasses = {
        'Created': 'bg-yellow-100 text-yellow-800',
        'Manifested': 'bg-blue-100 text-blue-800',
        'In Transit': 'bg-purple-100 text-purple-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800'
    };

    return `
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}">
            ${status}
        </span>
    `;
}

function renderOrderForm(order = null) {
    return `
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <form id="orderForm" class="space-y-6">
                    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Bilti No</label>
                            <input type="text" name="biltiNo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${order?.biltiNo || ''}" required>
                        </div>

                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Bilti Date</label>
                            <input type="date" name="biltiMiti" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${order?.biltiMiti || ''}" required>
                        </div>

                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Origin</label>
                            <input type="text" name="origin" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${order?.origin || ''}" required>
                        </div>

                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Destination</label>
                            <input type="text" name="destination" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${order?.destination || ''}" required>
                        </div>

                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Pay Mode</label>
                            <select name="payMode" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                                <option value="">Select Pay Mode</option>
                                <option value="Due" ${order?.payMode === 'Due' ? 'selected' : ''}>Due</option>
                                <option value="To Pay" ${order?.payMode === 'To Pay' ? 'selected' : ''}>To Pay</option>
                                <option value="Paid" ${order?.payMode === 'Paid' ? 'selected' : ''}>Paid</option>
                            </select>
                        </div>

                        <div class="sm:col-span-3">
                            <label class="block text-sm font-medium text-gray-700">Bill To</label>
                            <select name="billTo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                                <option value="">Select Bill To</option>
                                <option value="Consignor" ${order?.billTo === 'Consignor' ? 'selected' : ''}>Consignor</option>
                                <option value="Consignee" ${order?.billTo === 'Consignee' ? 'selected' : ''}>Consignee</option>
                                <option value="ThirdParty" ${order?.billTo === 'ThirdParty' ? 'selected' : ''}>Third Party</option>
                            </select>
                        </div>
                    </div>

                    <div class="border-t border-gray-200 pt-6">
                        <h3 class="text-lg font-medium text-gray-900">Items</h3>
                        <div id="itemsContainer" class="mt-4 space-y-4">
                            ${renderOrderItems(order?.items || [])}
                        </div>
                        <button type="button" id="addItemBtn" class="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i class="fas fa-plus mr-2"></i>
                            Add Item
                        </button>
                    </div>

                    <div class="border-t border-gray-200 pt-6">
                        <h3 class="text-lg font-medium text-gray-900">Calculations</h3>
                        <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-2">
                                <label class="block text-sm font-medium text-gray-700">Freight</label>
                                <input type="number" name="calculations.freight" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${order?.calculations?.freight || ''}" required>
                            </div>
                            <div class="sm:col-span-2">
                                <label class="block text-sm font-medium text-gray-700">VAT %</label>
                                <input type="number" name="calculations.vatPercentage" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${order?.calculations?.vatPercentage || '13'}" required>
                            </div>
                            <div class="sm:col-span-2">
                                <label class="block text-sm font-medium text-gray-700">Total Amount</label>
                                <input type="number" name="calculations.totalAmount" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50" value="${order?.calculations?.totalAmount || ''}" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onclick="cancelOrder()">
                            Cancel
                        </button>
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            ${order ? 'Update Order' : 'Create Order'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function renderOrderItems(items = []) {
    if (!items.length) {
        items = [{}]; // Add one empty item by default
    }

    return items.map((item, index) => `
        <div class="item-row grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 border-b border-gray-200 pb-4">
            <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <input type="text" name="items[${index}].description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${item.description || ''}" required>
            </div>
            <div class="sm:col-span-1">
                <label class="block text-sm font-medium text-gray-700">Unit</label>
                <input type="text" name="items[${index}].unit" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${item.unit || ''}" required>
            </div>
            <div class="sm:col-span-1">
                <label class="block text-sm font-medium text-gray-700">Packages</label>
                <input type="number" name="items[${index}].packages" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${item.packages || ''}" required>
            </div>
            <div class="sm:col-span-1">
                <label class="block text-sm font-medium text-gray-700">Rate</label>
                <input type="number" name="items[${index}].rate" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" value="${item.rate || ''}" required>
            </div>
            <div class="sm:col-span-1 flex items-end">
                ${index > 0 ? `
                    <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function renderOrderDetails() {
    if (!state.selectedOrder) {
        return '<div class="text-center">No order selected</div>';
    }

    const order = state.selectedOrder;
    return `
        <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Order Details - ${order.biltiNo}
                        </h3>
                        <p class="mt-1 text-sm text-gray-500">
                            Created on ${order.biltiMiti}
                        </p>
                    </div>
                    <div class="flex space-x-3">
                        <button onclick="printOrder('${order._id}')" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i class="fas fa-print mr-2"></i>
                            Print
                        </button>
                        <button onclick="editOrder('${order._id}')" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i class="fas fa-edit mr-2"></i>
                            Edit
                        </button>
                    </div>
                </div>

                <div class="mt-6 border-t border-gray-200 pt-6">
                    <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Status</dt>
                            <dd class="mt-1 text-sm text-gray-900">${renderOrderStatus(order.status)}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Pay Mode</dt>
                            <dd class="mt-1 text-sm text-gray-900">${order.payMode}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Origin</dt>
                            <dd class="mt-1 text-sm text-gray-900">${order.origin}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Destination</dt>
                            <dd class="mt-1 text-sm text-gray-900">${order.destination}</dd>
                        </div>
                    </dl>
                </div>

                <div class="mt-6 border-t border-gray-200 pt-6">
                    <h4 class="text-lg font-medium text-gray-900">Items</h4>
                    <div class="mt-4 flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Packages</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            ${order.items.map(item => `
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.description}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.unit}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.packages}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹${item.rate}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹${item.amount}</td>
                                                </tr>
                                            `).join('')}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-6 border-t border-gray-200 pt-6">
                    <h4 class="text-lg font-medium text-gray-900">Calculations</h4>
                    <dl class="mt-4 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Freight</dt>
                            <dd class="mt-1 text-sm text-gray-900">₹${order.calculations.freight}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">VAT (${order.calculations.vatPercentage}%)</dt>
                            <dd class="mt-1 text-sm text-gray-900">₹${order.calculations.vatAmount}</dd>
                        </div>
                        <div class="sm:col-span-1">
                            <dt class="text-sm font-medium text-gray-500">Total Amount</dt>
                            <dd class="mt-1 text-sm text-gray-900">₹${order.calculations.totalAmount}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    `;
}

function renderLoader() {
    return `
        <div class="flex items-center justify-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    `;
}

function renderToast() {
    if (!state.error) return '';
    
    return `
        <div class="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Error!</strong>
            <span class="block sm:inline">${state.error}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3" onclick="dismissError()">
                <i class="fas fa-times"></i>
            </span>
        </div>
    `;
}

function getPageTitle() {
    switch(state.currentPage) {
        case 'orders':
            return 'Orders';
        case 'create-order':
            return 'Create New Order';
        case 'order-details':
            return 'Order Details';
        default:
            return 'Orders';
    }
}

// Event Handlers
function attachEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            state.currentPage = e.target.closest('.nav-link').dataset.page;
            renderApp();
        });
    });

    // Create Order Button
    const createOrderBtn = document.getElementById('createOrderBtn');
    if (createOrderBtn) {
        createOrderBtn.addEventListener('click', () => {
            state.currentPage = 'create-order';
            renderApp();
        });
    }

    // Order Form
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }

    // Add Item Button
    const addItemBtn = document.getElementById('addItemBtn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addNewItem);
    }

    // Search Orders
    const searchInput = document.getElementById('searchOrders');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

// API Functions
async function fetchOrders() {
    try {
        state.isLoading = true;
        renderApp();
        
        const response = await fetch('/api/billing');
        if (!response.ok) throw new Error('Failed to fetch orders');
        
        const data = await response.json();
        state.orders = data;
        state.isLoading = false;
        renderApp();
    } catch (error) {
        state.error = error.message;
        state.isLoading = false;
        renderApp();
    }
}

async function handleOrderSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = Object.fromEntries(formData);

    try {
        state.isLoading = true;
        renderApp();

        const response = await fetch('/api/billing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) throw new Error('Failed to create order');

        state.currentPage = 'orders';
        await fetchOrders();
    } catch (error) {
        state.error = error.message;
        state.isLoading = false;
        renderApp();
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function addNewItem() {
    const itemsContainer = document.getElementById('itemsContainer');
    const newItemIndex = itemsContainer.children.length;
    
    const newItemHtml = renderOrderItems([{}]);
    itemsContainer.insertAdjacentHTML('beforeend', newItemHtml);
}

function removeItem(index) {
    const itemRow = document.querySelector(`[name="items[${index}].description"]`).closest('.item-row');
    itemRow.remove();
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredOrders = state.orders.filter(order => 
        order.biltiNo.toLowerCase().includes(searchTerm) ||
        order.origin.toLowerCase().includes(searchTerm) ||
        order.destination.toLowerCase().includes(searchTerm)
    );
    
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = renderOrderRows(filteredOrders);
}

function dismissError() {
    state.error = null;
    renderApp();
}

// View/Edit/Delete Order Functions
function viewOrder(orderId) {
    state.selectedOrder = state.orders.find(order => order._id === orderId);
    state.currentPage = 'order-details';
    renderApp();
}

function editOrder(orderId) {
    state.selectedOrder = state.orders.find(order => order._id === orderId);
    state.currentPage = 'create-order';
    renderApp();
}

async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
        state.isLoading = true;
        renderApp();

        const response = await fetch(`/api/billing/${orderId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Failed to delete order');

        await fetchOrders();
    } catch (error) {
        state.error = error.message;
        state.isLoading = false;
        renderApp();
    }
}

async function printOrder(orderId) {
    try {
        const response = await fetch(`/api/billing/${orderId}/print`);
        if (!response.ok) throw new Error('Failed to generate print view');
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
    } catch (error) {
        state.error = error.message;
        renderApp();
    }
}

    // Form submission handler
async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
        biltiNo: formData.get('biltiNo'),
        biltiMiti: formData.get('biltiMiti'),
        origin: formData.get('origin'),
        destination: formData.get('destination'),
        payMode: formData.get('payMode'),
        billTo: formData.get('billTo'),
        items: [{
            description: formData.get('items[0].description'),
            unit: formData.get('items[0].unit'),
            packages: parseInt(formData.get('items[0].packages')),
            rate: parseFloat(formData.get('items[0].rate')),
            amount: parseInt(formData.get('items[0].packages')) * parseFloat(formData.get('items[0].rate'))
        }],
        calculations: {
            freight: 0,
            vatPercentage: 13,
            vatAmount: 0,
            totalAmount: 0
        },
        status: 'Created'
    };

    try {
        state.isLoading = true;
        renderApp();

        const response = await fetch('/api/billing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) throw new Error('Failed to create order');

        state.currentPage = 'orders';
        await fetchOrders();
    } catch (error) {
        state.error = error.message;
        state.isLoading = false;
        renderApp();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
    renderApp();

    // Add form submit event listener
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'orderForm') {
            handleSubmit(e);
        }
    });
});
