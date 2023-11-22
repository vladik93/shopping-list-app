import { includeHeader } from "../functions.js";
import { suggestions } from "../data.js";

const containerEl = document.getElementById("container");

const icons = ["fish", "cheese", "carrot", "pizza-slice", "cookie"];

includeHeader();

/**
 * Returns  a random icon.
 */
const generateRandomIcon = () => {
  console.log("generateRandomIcon ===>");
  let index = Math.floor(Math.random() * icons.length);
  let icon = `fa-solid fa-${icons[index]}`;
  console.log(index);

  return `<i class="${icon} icon--mdx2">`;
};

const renderNewListPage = () => {
  const newListEl = document.createElement("div");
  newListEl.classList.add("new-list");

  const newListWrapperEl = document.createElement("div");
  newListWrapperEl.classList.add("new-list-wrapper");

  containerEl.appendChild(newListEl);
};
