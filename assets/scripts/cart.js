import products from "./products.js";

// handle currencyVND
export function formatCurrencyVND(amount) {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return VND.format(amount).replace("₫", "VNĐ");
}

export function genCartQty() {
    var cartQty = 0;
    cart.forEach((item) => {
        cartQty += item.quantity;
    });
    cartQuantity.innerHTML = cartQty;
}

export function genTotalPrice() {
    var totalPrice = 0;
    carts.forEach((cartsItem) => {
        totalPrice += cartsItem.productQuantity * cartsItem.currentPrice;
    });
    cartCtaPrice.innerHTML = formatCurrencyVND(totalPrice);
}

// Upadte in carts
export function findCart(productId) {
    // Find product in products
    const productItem = products.find((product) => product.id === productId);
    // Find item.qty in cart
    const productQuantity = cart.find(
        (item) => item.productId === productId
    ).quantity;
    // spread
    // if productQuantity === 1 is new item -> push to carts else update qty
    if (productQuantity === 1) {
        const cartsItem = {
            ...productItem,
            productQuantity,
        };
        carts.push(cartsItem);
    } else {
        carts.forEach((cartsItem) => {
            if (cartsItem.id === productId) {
                cartsItem.productQuantity = productQuantity;
            }
        });
    }

    renderCart();
}

// Save items in cartListItems
function renderCart() {
    if (cart.length !== 0 && carts.length !== 0) {
        cartList.classList.remove("cart-list--no-cart");
        cartCta.style.display = "block";
    }
    const html = carts.map(
        (cart) =>
            `<li class="cart-item" data-product-id="${cart.id}">
   <a href="#!" class="cart-item-wrap">
       <img
           src="${cart.image}"
           alt="${cart.name}"
           class="img"
       />
   </a>
   <div class="cart-item-info">
       <a href="" class="item-name"
           >${cart.name}</a
       >
       <div class="item-quantity-price">
           <span class="item-quantity">${cart.productQuantity} ×
           </span>
           <span class="item-price"
               >${formatCurrencyVND(cart.currentPrice)}</span>
       </div>
   </div>
       <span class="item-remove js-item-remove">
       <i
           class="fa-regular fa-circle-xmark"
       ></i>
   </span>
</li>`
    );

    cartListItems.innerHTML = html.join("");
}

// Write this function because it use for the first load page and after addToCart
export function removeFromCart() {
    if (cart.length && carts.length > 0) {
        var itemsRemove = cartListItems.querySelectorAll(".js-item-remove");
        // handle removeFromCart
        itemsRemove.forEach((itemRemove) => {
            itemRemove.addEventListener("click", () => {
                itemRemove.parentElement.style.display = "none";
                // Update cart and carts
                let productId = itemRemove.parentElement.dataset.productId;
                const itemCartStorage = cart.find(
                    (item) => item.productId === productId
                );
                const itemCarts = carts.find(
                    (cartsItem) => cartsItem.id === productId
                );
                // Remove item from cart
                cart = cart.filter((i) => i !== itemCartStorage);
                localStorage.setItem("cart", JSON.stringify(cart));
                // Remove item from carts
                carts = carts.filter((i) => i !== itemCarts);
                if (cart.length !== 0) {
                    cartList.classList.remove("cart-list--no-cart");
                } else {
                    cartCta.style.display = "none";
                    cartList.classList.add("cart-list--no-cart");
                }
                genCartQty();
                genTotalPrice();
            });
        });
    }
}

// handle add to cart
export var cart = JSON.parse(localStorage.getItem("cart") || "[]");
var cartQuantity = document.querySelector(".js-cart-quantity");
var cartList = document.querySelector(".js-cart-list");
var cartListItems = cartList.querySelector(".js-cart-list-items");
var cartCta = cartList.querySelector(".js-cart-cta");
var cartCtaPrice = cartList.querySelector(".js-cart-cta span");
var carts = cart.map((item) => {
    const productItem = products.find(
        (product) => product.id === item.productId
    );
    return {
        ...productItem,
        productQuantity: item.quantity,
    };
});

if (cart.length && carts.length > 0) {
    genCartQty();
    renderCart();
    genTotalPrice();
    removeFromCart();
} else {
    cartList.classList.add("cart-list--no-cart");
}
