import { cart, carts, removeFromCart, genTotalPrice } from "./cart.js";
import { formatCurrencyVND } from "./constant.js";

const rowCart = document.querySelector(".row-cart");
const cartSummary = document.querySelector(".cart-summary");
const cartCollaterals = document.querySelector(".cart-collaterals");
const backToProducts = document.querySelector(".back-to-products");
const orderCartListItems = document.querySelector(".order-cart-list-items");
export let deliveryCost = 30000;

export let orderTotalPrice = 0;
if (document.querySelector("#order")) {
    if (carts.length > 0) {
        rowCart.classList.remove(".cart-list--no-cart");
    } else {
        rowCart.classList.add("cart-list--no-cart");
    }
}

removeFromCart(rowCart);

const cartItems = document.querySelectorAll(".cart-item");
cartItems.forEach((item) => {
    const cartItemInfo = item.querySelector(".cart-item-info");
    orderTotalPrice = genSubTotalAndTotalPrice(0);

    // item-quantity-price appendChild 2 btn: plus and minus qty
    const itemQuantityPrice = item.querySelector(".item-quantity-price");

    let itemFindedInCart = cart.find(
        (product) => product.productId === item.dataset.productId
    );
    let itemFindedInCarts = carts.find(
        (product) => product.id === item.dataset.productId
    );
    genSubTotal(cartItemInfo);

    // gen each item in the sub-total
    function genSubTotal(cartItemInfo) {
        let subTotal = document.createElement("span");
        subTotal.classList.add("sub-total");
        subTotal.innerText = formatCurrencyVND(
            itemFindedInCarts.productQuantity * itemFindedInCarts.currentPrice
        );
        cartItemInfo.appendChild(subTotal);
    }
    loadBtn();

    // Load plusMinusBtn append plsBtn and minusBtn
    function loadBtn() {
        let plusMinusBtn = document.createElement("div");
        plusMinusBtn.classList.add("plus-minus-btn");
        if (itemFindedInCart.quantity >= 1) {
            let plusBtn = document.createElement("button");
            plusBtn.innerText = "+";
            plusBtn.addEventListener("click", () => {
                itemFindedInCart.quantity += 1;
                itemFindedInCarts.productQuantity += 1;
                plusMinusBtn.remove();
                loadBtnAgain();
            });
            plusMinusBtn.appendChild(plusBtn);
        }

        if (itemFindedInCart.quantity > 1) {
            let minusBtn = document.createElement("button");
            minusBtn.innerText = "-";
            minusBtn.addEventListener("click", () => {
                itemFindedInCart.quantity -= 1;
                itemFindedInCarts.productQuantity -= 1;
                plusMinusBtn.remove();
                loadBtnAgain();
            });
            plusMinusBtn.appendChild(minusBtn);
        }

        itemQuantityPrice.appendChild(plusMinusBtn);
    }

    function loadBtnAgain() {
        localStorage.setItem("cart", JSON.stringify(cart));
        item.querySelector(".item-quantity").innerHTML =
            itemFindedInCart.quantity;
        cartItemInfo.lastElementChild.remove();
        genSubTotal(cartItemInfo);
        orderTotalPrice = genSubTotalAndTotalPrice(0);
        loadBtn();
    }
});

// gen subTotal and TotalPrice with coupon = 0 or anything else
function genSubTotalAndTotalPrice(couponPrice) {
    let orderTotalPriceLast =
        genTotalPrice(document.querySelector(".summary-sub-total")) +
        deliveryCost;
    document.querySelector(".order-total-price").innerHTML = formatCurrencyVND(
        orderTotalPriceLast - couponPrice
    );
    localStorage.setItem(
        "orderTotalPrice",
        JSON.stringify(orderTotalPriceLast - couponPrice)
    );
    return orderTotalPriceLast - couponPrice;
}

// Coupon do work
const checkoutCoupon = document.querySelector(".checkout-coupon");
const coupon = document.querySelector("#coupon");
const couponSubmit = document.querySelector(".coupon-submit");
const couponSubmitMsg = document.createElement("p");

const shopOrderTotal = document.querySelector(".shop-order-total");

const shopOrderCoupon = document.createElement("div");
shopOrderCoupon.classList.add("shop-order-coupon");
const OrderCouponTitle = document.createElement("span");
OrderCouponTitle.classList.add("order-coupon-title");
OrderCouponTitle.innerHTML = "Ưu đãi";
const OrderCouponCost = document.createElement("span");
OrderCouponCost.classList.add("order-coupon-cost");

let couponSubmitMsgOut = "";
couponSubmitMsg.classList.add("counpon-submit-msg");

let couponPrice;

couponSubmit.addEventListener("click", () => {
    if (coupon.value === "10%") {
        //must here for remove case
        orderTotalPrice = parseInt(
            document
                .querySelector(".order-total-price")
                .innerText.replace(/\./g, "")
                .replace(" VNĐ", "")
        );
        couponPrice = (orderTotalPrice * 10) / 100;
        OrderCouponCost.innerHTML = formatCurrencyVND(couponPrice);
        shopOrderCoupon.appendChild(OrderCouponTitle);
        shopOrderCoupon.appendChild(OrderCouponCost);

        orderTotalPrice -= (orderTotalPrice * 10) / 100;
        shopOrderTotal.parentNode.insertBefore(shopOrderCoupon, shopOrderTotal);

        couponSubmitMsgOut = "Bạn nhận được ưu đãi giảm 10%. ";
        orderCartListItems.style.pointerEvents = "none";
        orderCartListItems.style.opacity = "0.7";
        coupon.style.pointerEvents = "none";
        couponSubmit.style.pointerEvents = "none";
        genSubTotalAndTotalPrice(couponPrice);
    } else {
        couponSubmitMsgOut = "Không áp dụng được. ";
    }
    couponSubmitMsg.innerHTML = couponSubmitMsgOut;
    checkoutCoupon.appendChild(couponSubmitMsg);
});
