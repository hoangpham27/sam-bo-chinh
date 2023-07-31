import { formatCurrencyVND } from "./constant.js";

let orderTotalPrice = JSON.parse(localStorage.getItem("orderTotalPrice"));

// console.log(orderTotalPrice);

let shellOutPrice = document.querySelector(".shell-out-price");
shellOutPrice.innerHTML = formatCurrencyVND(orderTotalPrice);
