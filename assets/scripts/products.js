import products from "./productsData.js";
import { genLayoutProducts, pagination } from "./constant.js";
import { addToCart } from "./cart.js";
genLayoutProducts(products);
addToCart();

let orderBy = document.querySelector(".orderby");
orderBy.addEventListener("change", () => {
    if (orderBy.value === "price-asc") {
        sortAsc();
    } else if (orderBy.value === "price-desc") {
        sortDesc();
    }
    genLayoutProducts(products);
    // pagination when sort
    pagination(".product", 16, "block");
});

function sortAsc() {
    products.sort((a, b) => {
        return a.currentPrice - b.currentPrice;
    });
    return products;
}

function sortDesc() {
    products.sort((a, b) => {
        return b.currentPrice - a.currentPrice;
    });
    return products;
}

// pagination first time for default
pagination(".product", 16, "block");
