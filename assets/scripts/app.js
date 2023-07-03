// handle main-slider
$(document).ready(function () {
    $(".main-slider").slick({
        draggable: true,
        infinite: false,
        slidesToShow: 0.98,
        slidesToScroll: 1,
        arrows: false,
    });
});

// handle why-us slider
$(document).ready(function () {
    $(".why-us .slider").slick({
        draggable: true,
        infinite: false,
        slidesToShow: 3.98,
        slidesToScroll: 1,
        arrows: false,
    });
});

// handle accordion
var accBtns = document.querySelectorAll(".accordion-btn");

function togglePanel() {
    // Xử lý khi click vào chính nó để bật tắt
    var panel = this.nextElementSibling;
    if (panel.clientHeight === 0) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        panel.style.border = "1px dashed #ddd";
        Object.assign(this.style, {
            backgroundColor: "#f2f2f2",
            color: "#fff",
        });
    } else {
        panel.style.maxHeight = 0;
        panel.style.border = "none";
        Object.assign(this.style, {
            backgroundColor: "transparent",
            color: "#444",
        });
    }

    // Xử lý khi click vào 1 cái thì những cái còn lại tự tắt
    var i;
    switch (this) {
        case accBtns.item(0):
        case accBtns.item(1):
        case accBtns.item(2):
            i = 1;
            break;
        case accBtns.item(3):
        case accBtns.item(4):
        case accBtns.item(5):
            i = 2;
            break;
    }
    var panels = document.querySelectorAll(`.js-panel-${i}`);
    for (const pp of panels) {
        if (pp !== panel) {
            pp.style.border = "none";
            pp.style.maxHeight = 0;
            pp.previousElementSibling.style.background = "transparent";
            pp.previousElementSibling.style.color = "#444";
        }
    }
}

for (const accBtn of accBtns) {
    accBtn.addEventListener("click", togglePanel);
}

// handle products-layout
import products from "./products.js";

const productsLayout = document.querySelector(".products-layout");

// Chạy 8 ông: Tạo 1 mảng, đưa vô chủ 8 ông rồi log => đúng thì đưa vô map

const product8s = [];

for (let i = 0; i < products.length; i++) {
    if (i === 8) break;
    product8s.push(products[i]);
}
// (() => {})();

// handle currencyVND
function formatCurrencyVND(amount) {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return VND.format(amount).replace("₫", "VNĐ");
}

// Generator layout code
const productsData = product8s.map((product) => {
    let flag = false;
    if (product.currentPrice === product.oldPrice) flag = true;
    return `<div class="product ${product.id}">
        <a href="#!"  class="product-img" >
            <img src="${product.image}" alt="${product.name}">
        </a>
        <a href="#!" class="product-name">${product.name}</a>
        <div class="product-price-cart">
            <div class="product-sale">
                <span class="${flag ? "product--not-sale" : "product--sale"}">
                    ${flag ? "" : formatCurrencyVND(product.oldPrice)}
                </span>
                <span class="product-price">
                    ${formatCurrencyVND(product.currentPrice)}
                </span>
            </div>

            <a href="#!" class="btn product-cart-btn js-add-to-cart"  data-product-id="${
                product.id
            }">Thêm vào giỏ hàng</a>
        </div>
        <span class="${flag ? "product--not-sale-tag" : "product--sale-tag"}">
            ${flag ? "" : "Giảm giá!"}
        </span>
    </div>`;
});
productsLayout.innerHTML = productsData.join("");

function genCartQty() {
    var cartQty = 0;
    cart.forEach((item) => {
        cartQty += item.quantity;
    });
    cartQuantity.innerHTML = cartQty;
}

function genTotalPrice() {
    var totalPrice = 0;
    carts.forEach((cartsItem) => {
        totalPrice += cartsItem.productQuantity * cartsItem.currentPrice;
    });
    cartCtaPrice.innerHTML = formatCurrencyVND(totalPrice);
}

// Upadte in carts
function findCart(productId) {
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
function removeFromCart() {
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
var cart = JSON.parse(localStorage.getItem("cart") || "[]");
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

const productList = productsLayout.querySelectorAll(".product");
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
        findCart(productId);
        genTotalPrice();
        removeFromCart();
    });
});

// Lightbox gallery
$(document).ready(function () {
    $(".gallery-pictures").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find("img");
            },
        },
    });
});
