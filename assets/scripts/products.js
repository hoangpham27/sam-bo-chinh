import products from "./productsData.js";
import { genLayoutProducts, pagination } from "./constant.js";
import { addToCart } from "./cart.js";
genLayoutProducts(products);
addToCart(
    document.querySelector(".js-cart-list-items"),
    document.querySelector(".js-cart-list")
);

let orderBy = document.querySelector(".orderby");
orderBy.addEventListener("change", () => {
    if (orderBy.value === "price-asc") {
        sortAsc();
    } else if (orderBy.value === "price-desc") {
        sortDesc();
    }
    genLayoutProducts(products);
    // pagination when sort
    choosePagination(tablet);
    // tablet.addEventListener(choosePagination);
});

function sortAsc() {
    return products.sort((a, b) => {
        return a.currentPrice - b.currentPrice;
    });
}

function sortDesc() {
    return products.sort((a, b) => {
        return b.currentPrice - a.currentPrice;
    });
}

// pagination first time for default
pagination(".product", 16, "flex");


function choosePagination(tablet) {
    if (tablet.matches) { // If media query matches
        pagination(".product", 15, "flex");
    } 
    else pagination(".product", 16, "flex");
  }
  
  var tablet = window.matchMedia("(min-width: 768px) and (max-width: 991px)")
  choosePagination(tablet); // Call listener function at run time
//   tablet.addEventListener(choosePagination()) // Attach listener function on state changes