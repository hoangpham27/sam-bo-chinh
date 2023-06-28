// Xử lý phần main-slider
$(document).ready(function () {
    $(".main-slider").slick({
        draggable: true,
        infinite: false,
        slidesToShow: 0.98,
        slidesToScroll: 1,
        arrows: false,
    });
});

// Xử lý phần why-us slider
$(document).ready(function () {
    $(".why-us .slider").slick({
        draggable: true,
        infinite: false,
        slidesToShow: 3.98,
        slidesToScroll: 1,
        arrows: false,
    });
});

// Xử lý phần accordion
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

// Xử lý phần products-layout
import products from "./products.js";

const productsLayout = document.querySelector(".products-layout");

// Chạy 8 ông: Tạo 1 mảng, đưa vô chủ 8 ông rồi log => đúng thì đưa vô map

const product8s = [];

for (let i = 0; i < products.length; i++) {
    if (i === 8) break;
    product8s.push(products[i]);
}
// (() => {})();

// Xử lý generator layout code
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
                    ${
                        flag
                            ? ""
                            : (product.oldPrice / 1000).toFixed(3) + "&nbspVNĐ"
                    }
                </span>
                <span class="product-price">
                    ${(product.currentPrice / 1000).toFixed(3)}&nbspVNĐ
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

function findMatchingItem(arr, findItemId) {
    for (const item of arr) {
        // console.log(item.id);
        if (findItemId === item.productId || findItemId === item.id) {
            return item;
        }
    }
}

function genCartQty() {
    var cartQty = 0;
    cart.forEach((item) => {
        cartQty += item.quantity;
    });
    cartQuantity.innerHTML = cartQty;
}

// Xử lý add to cart
var cart = [];
var cartQuantity = document.querySelector(".js-cart-quantity");
var cartList = document.querySelector(".js-cart-list");
var cartListItems = cartList.querySelector(".js-cart-list-items");
var cartCta = cartList.querySelector(".js-cart-cta");
var cartCtaPrice = cartList.querySelector(".js-cart-cta span");
// console.log(cartListItems);
// cart trống hoặc kiểm tra quantity = 0? thì thêm class "cart-list--no-cart" vào "cart-list"
if (cart.length === 0)
    // {
    cartList.classList.add("cart-list--no-cart");
// Xử lý addToCart
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
        cartList.classList.remove("cart-list--no-cart");
        cartCta.style.display = "block";
        const productId = button.dataset.productId;
        var matchingItem = findMatchingItem(cart, productId);
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            cart.push({
                productId: productId,
                quantity: 1,
            });
        }
        genCartQty();

        // Gen vao cartListItems
        var totalPrice = 0;
        const cartListItemsData = cart.map((item) => {
            matchingItem = findMatchingItem(products, item.productId);
            totalPrice += item.quantity * matchingItem.currentPrice;

            return `<li class="cart-item" data-product-id="${matchingItem.id}">
                <a href="#!" class="cart-item-wrap">
                    <img
                        src="${matchingItem.image}"
                        alt="${matchingItem.name}"
                        class="img"
                    />
                </a>
                <div class="cart-item-info">
                    <a href="" class="item-name"
                        >${matchingItem.name}</a
                    >
                    <div class="item-quantity-price">
                        <span class="item-quantity">${item.quantity} ×
                        </span>
                        <span class="item-price"
                            >${(matchingItem.currentPrice / 1000).toFixed(
                                3
                            )}&nbspVNĐ</span>
                    </div>
                </div>
                    <span class="item-remove js-item-remove">
                    <i
                        class="fa-regular fa-circle-xmark"
                    ></i>
                </span>
            </li>`;
        });
        cartListItems.innerHTML = cartListItemsData.join("");
        // Gen totalPrice vao cart-cta span
        cartCtaPrice.innerHTML = `${(totalPrice / 1000).toFixed(3)}&nbspVNĐ`;

        // Bắt các item-remove (phải tạm thời để trong lúc addToCart vì chưa có localStorage nên nếu bắt ở ngoài sẽ undifined ngay)
        if (cart.length > 0) {
            var itemsRemove = cartList.querySelectorAll(".js-item-remove");
        }
        // Xử lý removeFromCart
        console.log(itemsRemove);
        itemsRemove.forEach((itemRemove) => {
            itemRemove.addEventListener("click", () => {
                itemRemove.parentElement.style.display = "none";
                cart.forEach((item) => {
                    if (
                        itemRemove.parentElement.dataset.productId ===
                        item.productId
                    ) {
                        console.log(totalPrice);
                        matchingItem = findMatchingItem(
                            products,
                            item.productId
                        );
                        totalPrice -= item.quantity * matchingItem.currentPrice;
                        cartCtaPrice.innerHTML = `${(totalPrice / 1000).toFixed(
                            3
                        )}&nbspVNĐ`;
                        // Xoa item khoi cart array
                        cart = cart.filter((i) => i !== item);
                        // console.log(cart);
                    }
                    // con bug
                    if (cart.length !== 0) {
                        cartList.classList.remove("cart-list--no-cart");
                    } else {
                        cartCta.style.display = "none";
                        cartList.classList.add("cart-list--no-cart");
                    }
                    genCartQty();
                });
            });
        });
    });
});
