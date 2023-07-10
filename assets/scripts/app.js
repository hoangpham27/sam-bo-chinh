import products from "./products.js";

import {
    formatCurrencyVND,
    genCartQty,
    genTotalPrice,
    findCart,
    removeFromCart,
    cart,
} from "./cart.js";

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
            backgroundColor: "var(--primary-color)",
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

const productsLayout = document.querySelector(".products-layout");

// Chạy 8 ông: Tạo 1 mảng, đưa vô chủ 8 ông rồi log => đúng thì đưa vô map

const product8s = [];

for (let i = 0; i < products.length; i++) {
    if (i === 8) break;
    product8s.push(products[i]);
}
// (() => {})();

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

// handle newspapers slider
$(document).ready(function () {
    $(".newspaper .slider").slick({
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        prevArrow:
            "<button type='button' class='slick-prev slick-arrow-newspaper'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next slick-arrow-newspaper'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    });
});

// handle customer review slider
$(document).ready(function () {
    $(".customer-reviews .feedback-body").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow:
            "<button type='button' class='slick-prev slick-arrow-feedback'><i class='fa-solid fa-angle-left'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next slick-arrow-feedback'><i class='fa-solid fa-angle-right'></i></button>",
    });
});

// handle knowledge slider
$(document).ready(function () {
    $(".knowledge .slider").slick({
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        dots: true,
        prevArrow:
            "<button type='button' class='slick-prev slick-arrow-knowledge'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow:
            "<button type='button' class='slick-next slick-arrow-knowledge'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    });
});
