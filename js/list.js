import { lists, icons } from "../data.js";
import { includeHeader } from "../header.js";

console.log("list.js ====>");

includeHeader();

const containerEl = document.getElementById("container");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const randomIconIndex = sessionStorage.getItem("randomIconIndex") || 0;

let listId = array[0];

console.log(lists);

function renderListPage(listId) {
  console.log("renderListPage ===>");
  console.log("elm param ====>", listId);
  if (lists.some((item) => item.id === parseInt(listId))) {
    const found = lists.find((item) => item.id === parseInt(listId));

    const listPageEl = document.createElement("div");
    listPageEl.classList.add("list-page");

    listPageEl.innerHTML = `
      <i class="fa-solid fa-${icons[randomIconIndex]} icon--mdx3 list-icon"></i>
      <p class="primary-text main-title">Let's plan your shopping</p>
        <p class="secondary-text">
          Tap the plus button to create your first list
        </p>
        
        <div class="list-button-wrapper">
          <button class="add-item-button button button--primary">
            <i class="fa-solid fa-plus"></i>
            <span>NEW LIST</span>
          </button>
        </div>
    
    `;

    containerEl.appendChild(listPageEl);
  }
}

renderListPage(listId);
