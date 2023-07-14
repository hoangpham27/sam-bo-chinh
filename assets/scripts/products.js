import products from "./productsData.js";
import { genLayoutProducts } from "./constant.js";
import { addToCart } from "./cart.js";
// console.log({ products, genLayoutProducts });
console.log(products);
genLayoutProducts(products);
addToCart();
pagination(products);

let orderBy = document.querySelector(".orderby");
console.log(orderBy);
var options = orderBy.querySelectorAll("option");
console.log(options);
orderBy.addEventListener("change", () => {
    // console.log(orderBy.value);
    // alert(event.target.value);
    // console.log(this.target.value);
    if (orderBy.value === "price-asc") {
        sortAsc();
    } else if (orderBy.value === "price-desc") {
        sortDesc();
    }
    genLayoutProducts(products);
    pagination(products);
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

function pagination(list) {
    let thisPage = 1;
    let limit = 16;
    let productList = document.querySelectorAll(".product");
    console.log(productList);
    let resultCount = document.querySelector(".result-count");

    function loadItem(list) {
        let beginGet = limit * (thisPage - 1);
        let endGet = limit * thisPage - 1;
        if (endGet > list.length) endGet = list.length - 1;
        resultCount.innerHTML =
            "Hiển thị " +
            (beginGet + 1) +
            "–" +
            (endGet + 1) +
            " của " +
            list.length +
            " kết quả";
        list.forEach((item, index) => {
            if (index >= beginGet && index <= endGet) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
        listPage(list);
    }
    loadItem(productList);

    function changePage(i, list) {
        thisPage = i;
        loadItem(list);
        document.documentElement.scrollTop = 0;
    }

    function listPage(list) {
        let count = Math.ceil(productList.length / limit);
        document.querySelector(".pagination").innerHTML = "";

        if (thisPage != 1) {
            let prev = document.createElement("li");
            prev.innerText = "<";
            prev.addEventListener("click", () => {
                changePage(thisPage - 1, list);
            });
            document.querySelector(".pagination").appendChild(prev);
        }

        for (let i = 1; i <= count; i++) {
            let newPage = document.createElement("li");
            newPage.innerText = i;
            if (i == thisPage) {
                newPage.classList.add("active");
            }
            newPage.addEventListener("click", () => {
                changePage(i, list);
            });
            document.querySelector(".pagination").appendChild(newPage);
        }

        if (thisPage != count) {
            let next = document.createElement("li");
            next.innerText = ">";
            next.addEventListener("click", () => {
                changePage(thisPage + 1, list);
            });
            document.querySelector(".pagination").appendChild(next);
        }
    }
}
