// ----------------------
// VARIABLES
// ----------------------

let currentCategory = "";
let coins = 500;
let cart = [] ;

// ----------------------
// SHOW PRODUCTS
// ----------------------

function showProducts(category) {

    currentCategory = category;

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".category-title").style.display = "none";
    document.querySelector(".categories").style.display = "none";
document.querySelector(".smart-health-section").style.display = "none";
document.querySelector(".bharat-care-section").style.display = "none";
    document.getElementById("grocery-page").style.display = "block";

    let productBox = document.getElementById("product-list");

    productBox.innerHTML = "";

    let filteredProducts = products.filter(function(product) {
        return product.category === category;
    });

    filteredProducts.forEach(function(product) {

        productBox.innerHTML +=

        "<div class='card'>" +

        "<img src='" + product.image + "' alt='" + product.name + "'>" +

        "<h3>" + product.name + "</h3>" +

        "<p>" + product.description + "</p>" +

        "<p><strong>🪙 " + product.price + " Coins</strong></p>" +

        "<button onclick='addToCart(" + product.id + ")'>Add to Cart</button>" +

        "</div>";

    });

}
// ----------------------
// GO BACK
// ----------------------

function goBack() {

    document.querySelector(".hero").style.display = "block";
    document.querySelector(".category-title").style.display = "block";
    document.querySelector(".categories").style.display = "grid";
    document.querySelector(".smart-health-section").style.display = "block";
document.querySelector(".bharat-care-section").style.display = "block";

    document.getElementById("grocery-page").style.display = "none";

    document.getElementById("searchBox").value = "";
    document.getElementById("product-list").innerHTML = "";
}

// ----------------------
// SEARCH PRODUCTS
// ----------------------

function searchProducts() {

    let searchText = document.getElementById("searchBox").value.toLowerCase();

    let productBox = document.getElementById("product-list");

    productBox.innerHTML = "";

    let filteredProducts = products.filter(function(product) {

        return product.category === currentCategory &&
               product.name.toLowerCase().includes(searchText);

    });

    filteredProducts.forEach(function(product) {

        productBox.innerHTML +=

        "<div class='card'>" +

        "<img src='" + product.image + "' alt='" + product.name + "'>" +

        "<h3>" + product.name + "</h3>" +

        "<p>" + product.description + "</p>" +

        "<p><strong>🪙 " + product.price + " Coins</strong></p>" +

        "<button onclick='addToCart(" + product.id + ")'>Add to Cart</button>" +

        "</div>";

    });

}
// ----------------------
// COIN SYSTEM
// ----------------------

function updateCoins() {

    document.getElementById("coinCount").innerText = coins;

}

function addCoins() {

    coins = coins + 100;

    updateCoins();

}

// ----------------------
// BUY PRODUCT
// ----------------------

function buyProduct(price) {

    if (coins >= price) {

        coins = coins - price;

        updateCoins();


    } else {

        alert("❌ Not enough coins!");

    }

}

// ----------------------
// INITIALIZE
// ----------------------

updateCoins();
function addToCart(productId) {

    let product = products.find(function(item) {
        return item.id === productId;
    });

    if (!product) {
        return;
    }

    if (coins >= product.price) {

        coins = coins - product.price;

        updateCoins();

        let existingProduct = cart.find(function(item) {
    return item.id === product.id;
});

if (existingProduct) {

    existingProduct.quantity++;

} else {

    cart.push({
        ...product,
        quantity: 1
    });

}
        updateCartCount();
        showCartMessage(product.name + " added to cart!");
    } else {

        alert("Not enough coins!");

    }

}
function updateCartCount() {

    document.getElementById("cartCount").innerText = cart.length;

}
function openCart() {

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".category-title").style.display = "none";
    document.querySelector(".categories").style.display = "none";
    document.querySelector(".smart-health-section").style.display = "none";
document.querySelector(".bharat-care-section").style.display = "none";
    document.getElementById("grocery-page").style.display = "none";
    document.getElementById("cart-page").style.display = "block";

    displayCart();

}

function closeCart() {

    document.getElementById("cart-page").style.display = "none";

    document.querySelector(".hero").style.display = "block";
    document.querySelector(".category-title").style.display = "block";
    document.querySelector(".categories").style.display = "grid";
    document.querySelector(".smart-health-section").style.display = "block";
document.querySelector(".bharat-care-section").style.display = "block";

}
function displayCart() {

    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

        cartTotal.innerText = "0";

        return;
    }

    cart.forEach(function(product, index) {

        total = total + (product.price * product.quantity);

        cartItems.innerHTML +=

        "<div class='cart-item'>" +

        "<img src='" + product.image + "' alt='" + product.name + "'>" +

        "<div>" +

        "<h3>" + product.name + "</h3>" +

        "<p>" + product.description + "</p>" +

        "<p>🪙 " + product.price + " Coins each</p>" +

        "<div class='quantity-controls'>" +

        "<button onclick='decreaseQuantity(" + index + ")'>−</button>" +

        "<span>" + product.quantity + "</span>" +

        "<button onclick='increaseQuantity(" + index + ")'>+</button>" +

        "</div>" +

        "<p>Subtotal: 🪙 " + (product.price * product.quantity) + " Coins</p>" +

        "<button onclick='removeFromCart(" + index + ")'>Remove</button>" +

        "</div>" +

        "</div>";

    });

    cartTotal.innerText = total;

}
function removeFromCart(index) {

    let removedProduct = cart[index];

    if (!removedProduct) {
        return;
    }

    cart.splice(index, 1);

    coins = coins + removedProduct.price;

    updateCoins();

    updateCartCount();

    displayCart();

}
function increaseQuantity(index) {

    let product = cart[index];

    if (!product) {
        return;
    }

    if (coins >= product.price) {

        product.quantity++;

        coins = coins - product.price;

        updateCoins();

        displayCart();

    } else {

        alert("Not enough coins!");

    }

}


function decreaseQuantity(index) {

    let product = cart[index];

    if (!product) {
        return;
    }

    if (product.quantity > 1) {

        product.quantity--;

        coins = coins + product.price;

        updateCoins();

        displayCart();

    } else {

        removeFromCart(index);

    }

}
function proceedToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".category-title").style.display = "none";
    document.querySelector(".categories").style.display = "none";
    document.getElementById("grocery-page").style.display = "none";
    document.getElementById("cart-page").style.display = "none";

    document.getElementById("checkout-page").style.display = "block";

    displayCheckout();

}
function displayCheckout() {

    let checkoutItems = document.getElementById("checkout-items");

    let checkoutTotal = document.getElementById("checkout-total");

    checkoutItems.innerHTML = "";

    let total = 0;

    cart.forEach(function(product) {

        let subtotal = product.price * product.quantity;

        total = total + subtotal;

       checkoutItems.innerHTML +=
"<div class='checkout-item'>" +
"<img src='" + product.image + "' alt='" + product.name + "'>" +
"<p><strong>" + product.name + "</strong></p>" +
        "<p>Quantity: " + product.quantity + "</p>" +

        "<p>🪙 " + subtotal + " Coins</p>" +

        "</div>";

    });
    let discountAmount = total * ludoDiscount / 100;
let finalTotal = total - discountAmount;
document.getElementById("checkout-subtotal").innerText = total;
document.getElementById("checkout-discount").innerText = discountAmount;
checkoutTotal.innerText = finalTotal;
}
function placeOrder() {

    let name = document.getElementById("customerName").value.trim();
    let phone = document.getElementById("customerPhone").value.trim();
    let address = document.getElementById("customerAddress").value.trim();
    let city = document.getElementById("customerCity").value.trim();
    let state = document.getElementById("customerState").value.trim();
    let pincode = document.getElementById("customerPincode").value.trim();

    if (
        name === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        state === "" ||
        pincode === ""
    ) {
        alert("Please fill all delivery details.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
        alert("Please enter a valid 6-digit pincode.");
        return;
    }

    let orderId = "SM" + Math.floor(100000 + Math.random() * 900000);

    let orderTotal =
        document.getElementById("checkout-total").innerText;

    document.getElementById("success-order-id").innerText = orderId;

    document.getElementById("success-order-total").innerText = orderTotal;

    cart = [];

    updateCartCount();

    document.getElementById("checkout-page").style.display = "none";

    document.getElementById("success-page").style.display = "block";
}
let aiKeywords = {
    "dust": "Face Masks",
    "pollution": "Face Masks",
    "outdoor": "Face Masks",
    "air pollution": "Face Masks",
    "dusty": "Face Masks",

    "sanitizer": "Hand Sanitizer",
    "without water": "Hand Sanitizer",
    "no water": "Hand Sanitizer",

    "wash hands": "Hand Wash",
    "hand wash": "Hand Wash",
    "washing hands": "Hand Wash",

    "tooth": "Toothbrush",
    "teeth": "Toothbrush",
    "brush teeth": "Toothbrush",
    "dental": "Toothbrush",

    "tissue": "Facial Tissues",
    "tissues": "Facial Tissues",

    "cut": "Adhesive Bandages",
    "small cut": "Adhesive Bandages",

    "antiseptic": "Antiseptic Liquid",
    "disinfect": "Antiseptic Liquid",

    "wound": "Sterile Gauze Pads",
    "gauze": "Sterile Gauze Pads",

    "cotton": "Cotton Roll",
    "medical tape": "Medical Adhesive Tape",

    "sweet": "Smart Sweet Choices",
    "naturally sweet": "Smart Sweet Choices",

    "snack": "Smart Snack Choices",
    "crunchy": "Smart Snack Choices",
    "munch": "Smart Snack Choices",

    "cooking oil": "Smart Oil Choices",
    "oil": "Smart Oil Choices",
    "cooking": "Smart Oil Choices"
};
let aiInstructions = {
    "Face Masks": "Wear the mask securely over your nose and mouth. Replace it when it becomes dirty, wet, or damaged.",

    "Hand Sanitizer": "Apply enough sanitizer to cover all hand surfaces and rub your hands together until they are dry.",

    "Hand Wash": "Apply hand wash, rub your hands thoroughly, rinse with clean water, and dry your hands.",

    "Toothbrush": "Brush your teeth gently and thoroughly using your usual toothpaste, then rinse your mouth.",

    "Facial Tissues": "Use a clean tissue gently when needed and dispose of it after use.",

    "Adhesive Bandages": "For a small clean cut, place the bandage over clean, dry skin and replace it when dirty or wet.",

    "Antiseptic Liquid": "Use antiseptic liquid only according to the instructions on the product label.",

    "Sterile Gauze Pads": "Place the sterile gauze gently over a cleaned wound when a dressing is needed.",

    "Cotton Roll": "Use clean cotton roll as supporting material where appropriate. Do not push loose cotton into an open wound.",

    "Medical Adhesive Tape": "Use the tape to secure gauze or a dressing. Apply it gently to clean, dry skin.",

    "Dates": "Wash fresh dates if needed according to their packaging or preparation instructions before eating.",

    "Almonds": "Eat almonds as a snack and follow the package instructions for storage and preparation.",

    "Walnuts": "Eat walnuts as a snack and follow the package instructions for storage and preparation.",

    "Apples": "Wash the apple thoroughly under clean running water before eating.",

    "Bananas": "Peel the banana before eating and follow normal food-handling practices.",

    "Mustard Oil": "Use mustard oil according to your cooking needs and the instructions on the product packaging.",

    "Groundnut Oil": "Use groundnut oil for cooking according to your recipe and the product packaging instructions.",

    "Sunflower Oil": "Use sunflower oil for cooking according to your recipe and the product packaging instructions.",

    "Rice Bran Oil": "Use rice bran oil for cooking according to your recipe and the product packaging instructions.",

    "Coconut Oil": "Use coconut oil according to your cooking needs and the product packaging instructions.",

    "Roasted Chana": "Eat roasted chana as a ready-to-eat snack and follow the package storage instructions.",

    "Makhana": "Eat makhana as a snack and follow the package instructions for storage and preparation.",

    "Trail Mix": "Eat trail mix as a ready-to-eat snack and check the package for storage and ingredient information.",

    "Peanut Chikki": "Eat peanut chikki as a ready-to-eat snack and follow the package storage instructions.",

    "Roasted Peanuts": "Eat roasted peanuts as a ready-to-eat snack and follow the package storage instructions."
};
function askBharatCare() {
    let question = document.getElementById("ai-question").value.toLowerCase();
    let response = document.getElementById("ai-response");

    if (question === "") {
        response.innerHTML = "Please enter a question.";
        return;
    }

    let recommendedProduct = null;

    for (let keyword in aiKeywords) {
        if (question.includes(keyword)) {
            recommendedProduct = aiKeywords[keyword];
            break;
        }
    }

    if (!recommendedProduct) {
        response.innerHTML =
            "<h3>🤖 Bharat Care AI</h3>" +
            "<p>I couldn't find a matching product or category.</p>" +
            "<p>Try words like dust, sanitizer, hand wash, cut, sweet, snack or oil.</p>";
        return;
    }

    if (
    recommendedProduct === "Smart Snack Choices" ||
    recommendedProduct === "Smart Sweet Choices" ||
    recommendedProduct === "Smart Oil Choices"
) {
        response.innerHTML =
            "<h3>🤖 Bharat Care AI</h3>" +
            "<p>Here are some suitable choices for you:</p>" +
            "<p><strong>" + recommendedProduct + "</strong></p>" +
            "<button onclick=\"showProducts('" + recommendedProduct + "')\">" +
            "View Choices →" +
            "</button>";
        return;
    }

    let instruction = aiInstructions[recommendedProduct];

    response.innerHTML =
        "<h3>🤖 Bharat Care AI</h3>" +
        "<p>You may be looking for:</p>" +
        "<p><strong>" + recommendedProduct + "</strong></p>" +
        "<p><strong>How to use:</strong> " + instruction + "</p>" +
        "<button onclick=\"showSingleProduct('" + recommendedProduct + "')\">" +
        "View Product →" +
        "</button>";
}

function showSingleProduct(productName) {
    let productBox = document.getElementById("product-list");

    document.querySelector(".hero").style.display = "none";
    document.querySelector(".category-title").style.display = "none";
    document.querySelector(".categories").style.display = "none";
    document.getElementById("grocery-page").style.display = "block";
    document.querySelector("#grocery-page h2").style.display = "none";
document.querySelector(".search-section").style.display = "none";

    let product = products.find(function(item) {
        return item.name === productName;
    });

    if (!product) {
        productBox.innerHTML = "<p>Product not found.</p>";
        return;
    }

  productBox.innerHTML =
    "<div style=\"width:300px; margin:20px auto;\">" +
    "<div class=\"card\">" +
    "<img src=\"" + product.image + "\" alt=\"" + product.name + "\" style=\"width:100%; height:180px; object-fit:cover;\">" +
    "<h3>" + product.name + "</h3>" +
    "<p>" + product.description + "</p>" +
    "<p>🪙 " + product.price + " Coins</p>" +
    "<button onclick=\"addToCart(" + product.id + ")\">Add to Cart 🛒</button>" +
    "</div>" +
    "</div>";
}
let ludoChances = 3;
let ludoScore = 0;
let ludoDemoMode = true;
let ludoPosition = 0;
let ludoDiscount = 0;

function startLudo() {
    ludoChances = 3;
    ludoScore = 0;
    ludoPosition = 0;

for (let i = 1; i <= 5; i++) {
    document.getElementById("ludo-cell-" + i).innerText = "⬜";
}

    document.getElementById("ludo-game").style.display = "block";
    document.getElementById("ludo-chances").innerText = ludoChances;
    document.getElementById("ludo-score").innerText = ludoScore;
    document.getElementById("ludo-result").innerHTML = "";
}

function rollLudoDice() {
    if (ludoChances <= 0) {
        return;
    }

    let dice = document.getElementById("ludo-dice");

    dice.classList.add("dice-rolling");

    setTimeout(function() {

        let diceNumber;

        if (ludoDemoMode) {
            diceNumber = 6;
        } else {
            diceNumber = Math.floor(Math.random() * 6) + 1;
        }

        let diceFaces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

        dice.innerText = diceFaces[diceNumber - 1];

        ludoScore = ludoScore + diceNumber;
        ludoChances = Math.max(0, ludoChances - 1);
        ludoPosition = Math.min(ludoPosition + diceNumber, 5);

for (let i = 1; i <= 5; i++) {
    document.getElementById("ludo-cell-" + i).innerText =
        i === ludoPosition ? "🔴" : "⬜";
}

        document.getElementById("ludo-score").innerText = ludoScore;
        document.getElementById("ludo-chances").innerText = ludoChances;

        dice.classList.remove("dice-rolling");

        if (ludoScore >= 12) {
            ludoDiscount = 20;
            displayCheckout();
            document.getElementById("ludo-result").innerHTML =
                "<h3>🎉 You Won!</h3>" +
                "<p>Congratulations! You earned a <strong>20% discount</strong>.</p>";

            ludoChances = 0;
            return;
        }

        if (ludoChances === 0) {
            document.getElementById("ludo-result").innerHTML =
                "<p>😔 Challenge Over! Try again next time.</p>";
        }

    }, 800);   
}
function showCartMessage(message) {
    let messageBox = document.createElement("div");

    messageBox.innerText = "🛒 " + message;

    messageBox.style.position = "fixed";
    messageBox.style.top = "20px";
    messageBox.style.right = "20px";
    messageBox.style.background = "#2e7d32";
    messageBox.style.color = "white";
    messageBox.style.padding = "12px 18px";
    messageBox.style.borderRadius = "8px";
    messageBox.style.zIndex = "9999";
    messageBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";

    document.body.appendChild(messageBox);

    setTimeout(function() {
        messageBox.remove();
    }, 2500);
}
function backToCart() {
    document.getElementById("checkout-page").style.display = "none";
    document.getElementById("cart-page").style.display = "block";
    displayCart();
}
function continueShopping() {
    document.getElementById("success-page").style.display = "none";

    document.querySelector(".hero").style.display = "block";
    document.querySelector(".category-title").style.display = "block";
    document.querySelector(".categories").style.display = "grid";
    document.querySelector(".smart-health-section").style.display = "block";
    document.querySelector(".bharat-care-section").style.display = "block";
}