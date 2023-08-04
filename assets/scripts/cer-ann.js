// Set dynamic height for pdf file
const rowCerAnn = document.querySelector(".row-cer-ann");
const allItem = rowCerAnn.querySelectorAll(".row-cer-ann .item");

allItem.forEach((item) => {
    item.querySelector("iframe").style.height =
        item.clientWidth * (29.7 / 21) - 50 + "px";
});
