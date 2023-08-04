// Set dynamic height for pdf file
const rowCerAnn = document.querySelector(".row-cer-ann");
const allItem = rowCerAnn.querySelectorAll(".row-cer-ann .item");

allItem.forEach((item) => {
    console.log(item.childNodes[3]);
    item.childNodes[3].style.height = item.clientWidth * (29.7 / 21) + "px";
    console.log(item.childNodes[3].clientHeight);
});
