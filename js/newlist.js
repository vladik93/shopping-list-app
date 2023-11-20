import { includeHeader } from "../functions.js";

const containerEl = document.getElementById("container");
// fa-solid fa-title
const icons = ["fish", "cheese", "carrot", "pizza-slice", "cookie"];

includeHeader(containerEl);

const generateRandomIcon = () => {
  console.log("generateRandomIcon ===>");
  let index = Math.floor(Math.random() * icons.length);
  let icon = `fa-solid fa-${icons[index]}`;
  console.log(index);

  containerEl.innerHTML += `<i class="${icon} icon--mdx2">`;
};

generateRandomIcon();
