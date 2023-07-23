import knowledge from "./knowledgeData.js";
import { genLayoutBlog, pagination, searchEngine } from "./constant.js";

genLayoutBlog(knowledge, ".blog-layout");
pagination(".item", 5, "flex");

// const asideActive = document.querySelector(".aside-item--active");

// asideActive.addEventListener("click", (e) => {
//     e.preventDefault();
// });

searchEngine(knowledge);
