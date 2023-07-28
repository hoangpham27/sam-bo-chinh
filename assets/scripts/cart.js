import products from "./productsData.js";
import { formatCurrencyVND } from "./constant.js";
// import { genSubTotalAndTotalPrice } from "./order.js";

function genCartQty() {
    let cartQty = 0;
    cart.forEach((item) => {
        cartQty += item.quantity;
    });
    cartQuantity.innerHTML = cartQty;
}

export function genTotalPrice(targetPrice) {
    let totalPrice = 0;
    carts.forEach((cartsItem) => {
        totalPrice += cartsItem.productQuantity * cartsItem.currentPrice;
    });
    targetPrice.innerHTML = formatCurrencyVND(totalPrice);
    return totalPrice;
}

// Upadte in carts
function findCart(productId, listItem) {
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

    renderCart(listItem);
}

// Save items in cartListItems
function renderCart(listItem) {
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
           <span class="item-quantity">${cart.productQuantity}</span> 
            <pre> x </pre>
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
    console.log(listItem);
    listItem.innerHTML = html.join("");
    // cartListItems.innerHTML = html.join("");
    // orderCartListItems.innerHTML = html.join("");
}

// Write this function because it use for the first load page and after addToCart
export function removeFromCart(target) {
    let flag = false;
    if (cart.length && carts.length > 0) {
        var itemsRemove = document.querySelectorAll(".js-item-remove");
        // handle removeFromCart
        itemsRemove.forEach((itemRemove) => {
            itemRemove.addEventListener("click", () => {
                flag = true;
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
                console.log(target);
                if (cart.length !== 0) {
                    target.classList.remove("cart-list--no-cart");
                } else {
                    target.classList.add("cart-list--no-cart");
                    if (cartCta) {
                        cartCta.style.display = "none";
                    }
                }
                genCartQty();
                if (document.querySelector(".summary-sub-total")) {
                    genTotalPrice(document.querySelector(".summary-sub-total"));
                    document.querySelector(".order-total-price").innerHTML =
                        formatCurrencyVND(
                            genTotalPrice(
                                document.querySelector(".summary-sub-total")
                            ) +
                                Number(
                                    document
                                        .querySelector(".shop-delivery .cost b")
                                        .innerHTML.replace(".", "")
                                        .replace(" VNĐ", "")
                                )
                        );
                } else genTotalPrice(cartCtaPrice);
            });
        });
    }
    console.log(flag);
    return flag;
}

// handle add to cart
export var cart = JSON.parse(localStorage.getItem("cart") || "[]");
const cartQuantity = document.querySelector(".js-cart-quantity");
const cartList = document.querySelector(".js-cart-list");
// const cartListItems = cartList.querySelector(".js-cart-list-items");
const cartCta = cartList.querySelector(".js-cart-cta");
const cartCtaPrice = cartList.querySelector(".js-cart-cta span");
// const orderCartListItems = document.querySelector(".order-cart-list-items");
// console.log(orderCartListItems);
let listItem;
if (document.querySelector(".order-cart-list-items")) {
    cartList.style.display = "none";
    listItem = document.querySelector(".order-cart-list-items");
} else if (cartList.querySelector(".js-cart-list-items"))
    listItem = cartList.querySelector(".js-cart-list-items");

export var carts = cart.map((item) => {
    const productItem = products.find(
        (product) => product.id === item.productId
    );
    return {
        ...productItem,
        productQuantity: item.quantity,
    };
});

// Gen when access page in first time
if (cart.length && carts.length > 0) {
    genCartQty();
    renderCart(listItem);
    genTotalPrice(cartCtaPrice);
    removeFromCart(cartList);
} else {
    cartList.classList.add("cart-list--no-cart");
}

export function addToCart(listItem, target) {
    const productList = document.querySelectorAll(".product");
    productList.forEach((product) => {
        const btn = product.querySelector(".js-add-to-cart");
        btn.addEventListener("click", () => {
            const productId = btn.dataset.productId;
            // find item in storage
            const itemCartStorage = cart.find(
                (item) => item.productId === productId
            );
            // Update in cart
            if (!itemCartStorage) {
                cart.push({
                    productId,
                    quantity: 1,
                });
            } else itemCartStorage.quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            genCartQty();
            console.log(listItem);
            findCart(productId, listItem);
            genTotalPrice(cartCtaPrice);
            removeFromCart(target);
        });
    });
}
