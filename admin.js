function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("bharatPharmacyOrders")) || [];

    // Keep only the latest 5 orders
    orders = orders.slice(-5);

    let totalItems = 0;
    let totalRevenue = 0;
    let pendingOrders = 0;

    orders.forEach(function(order) {
        totalItems += order.items;
        totalRevenue += order.total;

        if (order.status !== "Delivered") {
            pendingOrders++;
        }
    });

    document.getElementById("total-orders").textContent = orders.length;
    document.getElementById("total-items").textContent = totalItems;
    document.getElementById("total-revenue").textContent = "₹" + totalRevenue;
    document.getElementById("pending-orders").textContent = pendingOrders;

    let ordersList = document.getElementById("orders-list");

    if (orders.length === 0) {
        ordersList.innerHTML = "<p>No orders yet.</p>";
        return;
    }

    ordersList.innerHTML = "";

    orders.slice().reverse().forEach(function(order) {
        ordersList.innerHTML +=
            "<div class='order-card'>" +
            "<h3>Order #" + order.id + "</h3>" +
            "<p><strong>Customer:</strong> " + order.customer + "</p>" +
"<p><strong>Items:</strong> " + order.items + "</p>" +
"<p><strong>Products:</strong> " +
order.products.map(function(product) {
    return product.name + " × " + product.quantity;
}).join(", ") +
"</p>" +
"<p><strong>Total:</strong> ₹" + order.total + "</p>" +
"<p><strong>Status:</strong> " + order.status + "</p>" +
"<button onclick=\"updateOrderStatus('" + order.id + "')\">Update Status</button>" +
            "</div>";
    });
}

loadOrders();
function updateOrderStatus(orderId) {
    let orders = JSON.parse(localStorage.getItem("bharatPharmacyOrders")) || [];

    let order = orders.find(function(item) {
        return item.id === orderId;
    });

    if (!order) {
        return;
    }

    if (order.status === "Processing") {
        order.status = "Confirmed";
    } else if (order.status === "Confirmed") {
        order.status = "Packed";
    } else if (order.status === "Packed") {
        order.status = "Out for Delivery";
    } else if (order.status === "Out for Delivery") {
        order.status = "Delivered";
    }

    localStorage.setItem(
        "bharatPharmacyOrders",
        JSON.stringify(orders)
    );

    loadOrders();
}
function loadSalesAnalysis() {

    let orders = JSON.parse(localStorage.getItem("bharatPharmacyOrders")) || [];

    if (orders.length === 0) {
        return;
    }

    let productSales = {};
    let totalRevenue = 0;

    orders.forEach(function(order) {

        totalRevenue += order.total;

        order.products.forEach(function(product) {

            if (!productSales[product.name]) {
                productSales[product.name] = 0;
            }

            productSales[product.name] += product.quantity;
        });

    });

    let topProduct = "";
    let topQuantity = 0;

    for (let product in productSales) {

        if (productSales[product] > topQuantity) {
            topQuantity = productSales[product];
            topProduct = product;
        }

    }

    document.getElementById("top-product").innerText =
        topProduct + " (" + topQuantity + " sold)";

    let averageOrder = Math.round(totalRevenue / orders.length);

    document.getElementById("average-order").innerText =
        "₹" + averageOrder;

    let chart = document.getElementById("sales-chart");

    chart.innerHTML = "";

    for (let product in productSales) {

        chart.innerHTML +=
            "<div class='sales-bar'>" +
            "<strong>" + product + "</strong>" +
            "<div class='bar'>" +
            productSales[product] +
            "</div>" +
            "</div>";

    }

}

loadSalesAnalysis();
function loadInventory() {

    let inventory = JSON.parse(localStorage.getItem("bharatPharmacyInventory")) || {};

    let inventoryList = document.getElementById("inventory-list");

    inventoryList.innerHTML = "";

    for (let productName in inventory) {

        let stock = inventory[productName];

        let status = "🟢 In Stock";

        if (stock <= 5) {
            status = "🔴 Low Stock";
        }

        inventoryList.innerHTML +=
            "<div class='inventory-item'>" +
            "<h3>" + productName + "</h3>" +
            "<p>Stock: <strong>" + stock + "</strong></p>" +
            "<p>Status: <strong>" + status + "</strong></p>" +
            "</div>";
    }

}
function initializeInventory() {

    let inventory = JSON.parse(
        localStorage.getItem("bharatPharmacyInventory")
    ) || {};

    products.forEach(function(product) {

        if (inventory[product.name] === undefined) {
            inventory[product.name] = 20;
        }

    });

    localStorage.setItem(
        "bharatPharmacyInventory",
        JSON.stringify(inventory)
    );

    loadInventory();
}

initializeInventory();
function adminLogout() {
    window.location.href = "admin-login.html";
}