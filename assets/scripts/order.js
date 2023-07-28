import { cart, carts, removeFromCart, genTotalPrice } from "./cart.js";
import { formatCurrencyVND } from "./constant.js";

const rowCart = document.querySelector(".row-cart");
const cartSummary = document.querySelector(".cart-summary");
const cartCollaterals = document.querySelector(".cart-collaterals");
const backToProducts = document.querySelector(".back-to-products");
const orderCartListItems = document.querySelector(".order-cart-list-items");
export let deliveryCost = 30000;
// if (document.querySelector(".cart-list--no-cart")) {
//     backToProducts.style.display = "block";
// } else {
//     rowCart.style.display = "none";
// }
console.log(carts);
if (carts.length > 0) {
    rowCart.classList.remove(".cart-list--no-cart");
} else {
    rowCart.classList.add("cart-list--no-cart");
}

// genTotalPrice(document.querySelector(".summary-sub-total"));

if (removeFromCart(rowCart)) {
    console.log("hihi");
    genSubTotalAndTotalPrice();
}

const cartItems = document.querySelectorAll(".cart-item");
console.log(cartItems);
cartItems.forEach((item) => {
    const cartItemInfo = item.querySelector(".cart-item-info");
    genSubTotalAndTotalPrice();
    // item-quantity-price appendChild 2 btn: plus and minus qty
    const itemQuantityPrice = item.querySelector(".item-quantity-price");

    let itemFindedInCart = cart.find(
        (product) => product.productId === item.dataset.productId
    );
    let itemFindedInCarts = carts.find(
        (product) => product.id === item.dataset.productId
    );
    genSubTotal(cartItemInfo);
    function genSubTotal(cartItemInfo) {
        let subTotal = document.createElement("span");
        subTotal.classList.add("sub-total");
        // console.log(carts, item);

        // itemFindedInCarts.productQuantity = itemFindedInCart.quantity;
        // console.log(itemFindedInCarts);
        subTotal.innerText = formatCurrencyVND(
            itemFindedInCarts.productQuantity * itemFindedInCarts.currentPrice
        );
        cartItemInfo.appendChild(subTotal);
    }

    // console.log(itemFindedInCart);
    loadBtn();

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
        genSubTotalAndTotalPrice();
        loadBtn();
    }

    function genSubTotalAndTotalPrice() {
        document.querySelector(".order-total-price").innerHTML =
            formatCurrencyVND(
                genTotalPrice(document.querySelector(".summary-sub-total")) +
                    deliveryCost
            );
    }
});

let orderTotalPrice = parseInt(
    document
        .querySelector(".order-total-price")
        .innerText.replace(/\./g, "")
        .replace(" VNĐ", "")
);
console.log(orderTotalPrice);

const checkoutCoupon = document.querySelector(".checkout-coupon");
const coupon = document.querySelector("#coupon");
const couponSubmit = document.querySelector(".coupon-submit");
const couponSubmitMsg = document.createElement("p");

let couponSubmitMsgOut = "";
couponSubmitMsg.classList.add("counpon-submit-msg");
couponSubmit.addEventListener("click", () => {
    // console.log(document.querySelector("#coupon").value);
    if (coupon.value === "10%") {
        orderTotalPrice -= (orderTotalPrice * 10) / 100;
        couponSubmitMsgOut = "Bạn được giảm 10%. ";
        orderCartListItems.style.pointerEvents = "none";
        orderCartListItems.style.opacity = "0.7";
        coupon.style.pointerEvents = "none";
        couponSubmit.style.pointerEvents = "none";
        // console.log(orderTotalPrice);
    } else {
        couponSubmitMsgOut = "Không áp dụng được. ";
    }
    couponSubmitMsg.innerHTML =
        couponSubmitMsgOut +
        "Tổng tiền cần thanh toán là " +
        formatCurrencyVND(orderTotalPrice);
    checkoutCoupon.appendChild(couponSubmitMsg);
});
