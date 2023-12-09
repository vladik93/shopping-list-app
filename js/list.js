console.log("~ list.js ~");

import { lists } from "../data.js";

const containerEl = document.querySelector(".container");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = array[0];

const renderListPage = (listPageId) => {
  console.log("renderListPage >>>");

  if (lists.some((list) => list.id === parseInt(listPageId))) {
    const found = lists.find((list) => list.id === parseInt(listPageId));

    const listPageEl = document.createElement("div");
    listPageEl.classList.add("list-page-wrapper");

    listPageEl.innerHTML = `
    <i class="fa-solid fa-carrot icon--mdx3 list-icon"></i>
    <p class="primary-text main-title">Let's plan your shopping</p>
    <p class="secondary-text">Tap the plus button to create your first list</p>
      
    <div class="list-button-wrapper">
      <button class="add-item-button button button--lg button--primary" id="add-item">
        <i class="fa-solid fa-plus"></i>
        <span>ADD</span>
      </button>
    </div>
    `;

    containerEl.appendChild(listPageEl);
  }
};

renderListPage(listId);
