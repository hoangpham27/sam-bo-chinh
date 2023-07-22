import knowledge from "./knowledgeData.js";
import { genLayoutKnowledge, pagination, searchEngine } from "./constant.js";
import productsData from "./productsData.js";

genLayoutKnowledge(knowledge);
pagination(".item", 5, "flex");

const asideActive = document.querySelector(".aside-item--active");

// asideActive.addEventListener("click", (e) => {
//     e.preventDefault();
// });

searchEngine(knowledge);
