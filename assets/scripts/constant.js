// handle currencyVND
export function formatCurrencyVND(amount) {
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    return VND.format(amount).replace("₫", "VNĐ");
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
