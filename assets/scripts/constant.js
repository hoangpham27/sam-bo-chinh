// handle currencyVND
export function formatCurrencyVND(amount) {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return VND.format(amount).replace("₫", "VNĐ");
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

// Generator layout code
export function genLayoutProducts(productsArray) {
    const productsLayout = document.querySelector(".products-layout");
    const productsData = productsArray.map((product) => {
        let flag = false;
        if (product.currentPrice === product.oldPrice) flag = true;
        return `<div class="product ${product.id}">
            <a href="#!"  class="product-img" >
                <img src="${product.image}" alt="${product.name}">
            </a>
            <a href="#!" class="product-name">${product.name}</a>
            <div class="product-price-cart">
                <div class="product-sale">
                    <span class="${
                        flag ? "product--not-sale" : "product--sale"
                    }">
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
            <span class="${
                flag ? "product--not-sale-tag" : "product--sale-tag"
            }">
                ${flag ? "" : "Giảm giá!"}
            </span>
        </div>`;
    });
    productsLayout.innerHTML = productsData.join("");
}

export function genLayoutBlog(blogArray, layout) {
    const blogLayout = document.querySelector(layout);
    const blogData = blogArray.map((item) => {
        return `<div class="item ${item.id}">
        <a href="#!" class="entry-image">
            <img
                src="${item.image}"
                alt="${item.name}"
            />
        </a>
        <div class="entry-content">
            <h2 class="entry-title">
                <a href="#!"
                    >${item.name}</a
                >
            </h2>
            <p class="desc line-clamp" style="--line-claim: 3">
                ${item.desc}
            </p>
            <div class="entry-meta-cta">
                <div class="entry-meta">
                    <span class="posted-on">
                        <i
                            class="fa-regular fa-clock"
                        ></i>
                        POSTED ON ${formatDate(item.date)}
                    </span>
                    <span class="byline">
                        <i
                            class="fa-regular fa-user"
                        ></i>
                        By Vu
                    </span>
                </div>
                <a href="#!" class="btn cta-btn"
                    >Xem thêm
                    <i
                        class="fa-solid fa-arrow-right-long"
                    ></i
                ></a>
            </div>
        </div>
    </div>`;
    });
    blogLayout.innerHTML = blogData.join("");
}

export function pagination(get, limit, display) {
    let thisPage = 1;
    // let limit = 16;
    let allList = document.querySelectorAll(`${get}`);
    // console.log(allList);
    let resultCount = document.querySelector(".result-count");

    function loadItem(list) {
        let beginGet = limit * (thisPage - 1);
        let endGet = limit * thisPage - 1;
        if (endGet > list.length) endGet = list.length - 1;
        if (resultCount) {
            resultCount.innerHTML =
                "Hiển thị " +
                (beginGet + 1) +
                "–" +
                (endGet + 1) +
                " của " +
                list.length +
                " kết quả";
        }

        list.forEach((item, index) => {
            if (index >= beginGet && index <= endGet) {
                item.style.display = display;
            } else {
                item.style.display = "none";
            }
        });
        listPage(list);
    }
    loadItem(allList);

    function listPage(list) {
        let count = Math.ceil(allList.length / limit);
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

    function changePage(i, list) {
        thisPage = i;
        loadItem(list);
        document.documentElement.scrollTop = 0;
    }
}

export function searchEngine(blog) {
    let searchable = blog.slice();

    const searchAction = document.querySelector(".search-action");
    const searchField = document.querySelector(".search-field");
    const searchResult = document.querySelector(".search-result");
    const searchResultList = document.querySelector(".search-result-list");
    let currentFocus;

    // const msgNoResult = document.querySelector('.search-action--no-result');

    searchField.addEventListener("input", () => {
        let results = [];
        let input = searchField.value;
        currentFocus = -1;
        if (input.length > 0) {
            searchAction.classList.remove("search-action--no-result");
            searchResultList.style.display = "block";
            results = searchable.filter((item) => {
                return item.name.toLowerCase().includes(input.toLowerCase());
            });
            renderResults(results, input);
        }
        if (!results.length) {
            searchAction.classList.add("search-action--no-result");
            searchResultList.style.display = "none";
        }
    });

    function renderResults(results, input) {
        const content = results.map((item) => {
            let stringHTML = highlightCharacters(item.name, input);
            return `<li class="item-result">
        <a href="#!" class="result-link" ondragstart="return false;">
            <img
                class="result-image"
                src="${item.image}"
                alt="${item.name}"
            />
            <p class="result-name">${stringHTML}</p>
        </a>
    </li>`;
        });
        searchResultList.innerHTML = content.join("");
    }

    function highlightCharacters(text, characters) {
        let startIndex = 0;
        let coloredText = "";
        while (startIndex < text.length) {
            const foundIndex = text
                .toLowerCase()
                .indexOf(characters.toLowerCase(), startIndex);
            if (foundIndex === -1) {
                coloredText += text.slice(startIndex);
                break;
            }
            coloredText += text.slice(startIndex, foundIndex);
            coloredText += `<span class="highlight">${text.slice(
                foundIndex,
                foundIndex + characters.length
            )}</span>`;
            startIndex = foundIndex + characters.length;
        }
        return coloredText;
    }

    // handle when press arrow down or arrow up
    searchField.addEventListener("keydown", (e) => {
        const searchResultListItems = document.querySelectorAll(".item-result");
        if (e.keyCode == 40) {
            currentFocus++;
            if (currentFocus === searchResultListItems.length) {
                currentFocus--;
            }
            if (currentFocus > 0) {
                highlightBackground(
                    searchResultListItems,
                    currentFocus - 1,
                    "#fff"
                );
            }
            highlightBackground(
                searchResultListItems,
                currentFocus,
                "rgba(0, 0, 0, 0.05)"
            );
        } else if (e.keyCode == 38) {
            highlightBackground(searchResultListItems, currentFocus, "#fff");
            if (currentFocus > 0) currentFocus--;
            highlightBackground(
                searchResultListItems,
                currentFocus,
                "rgba(0, 0, 0, 0.05)"
            );
        }
    });

    function highlightBackground(searchResultListItems, currentFocus, bgColor) {
        searchResultListItems[currentFocus].style.backgroundColor = bgColor;
        searchField.value =
            searchResultListItems[currentFocus].firstElementChild.outerText;
    }
}

document.body.classList.remove("preload");

const pcNav = document.querySelector("#pc-nav");
const mobileNav = document.querySelector("#mobile-nav");

// Copy from PC nav -> Mobile nav
mobileNav.innerHTML = pcNav.innerHTML;
