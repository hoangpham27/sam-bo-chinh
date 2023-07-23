import newspaper from "./newspaperData.js";
import { genLayoutBlog, pagination, searchEngine } from "./constant.js";
console.log(newspaper);
genLayoutBlog(newspaper, ".blog-layout");
pagination(".item", 5, "flex");

// const asideActive = document.querySelector(".aside-item--active");

// asideActive.addEventListener("click", (e) => {
//     e.preventDefault();
// });

searchEngine(newspaper);
