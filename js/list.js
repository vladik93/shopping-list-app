console.log("~ list.js ~");

import { lists, items, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

const containerEl = document.querySelector(".container");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = array[0];

let listById;

console.log(typeof listId);

console.log("listId ===>", listId);

const getRandomIconIndex = () => {
  console.log("getRandomIconIndex >>>");
  let index = undefined;
  const storage = sessionStorage.getItem("randomIconIndex");
  if (storage !== null) {
    console.log("storage found!");
    index = storage;
  } else {
    console.log("storage not found!");
    index = Math.floor(Math.random() * icons.length);
    sessionStorage.setItem("randomIconIndex", index);
  }

  return index;
};

const randomIconIndex = getRandomIconIndex();

const getItemsByListId = () => {
  console.log("getItemsByListId ===>");
  const filteredList = items.filter((item) => item.listId === listId);

  listById = filteredList;
};

getItemsByListId();

console.log(listById);

const renderListPage = (listPageId) => {
  console.log("renderListPage >>>");

  const listPageEl = document.createElement("div");
  listPageEl.classList.add("list-page-wrapper");

  if (!listById.length) {
    listPageEl.classList.add("list");

    listPageEl.innerHTML = `
    <i class="fa-solid fa-${icons[randomIconIndex]} icon--mdx3 list-icon"></i>
      <p class="primary-text main-title">Let's plan your shopping</p>
      <p class="secondary-text">Tap the plus button to create your first list</p>
  
      <div class="list-button-wrapper">
        <button class="add-item-button button button--lg button--primary" id="add-item" data-button-action="add-item">
          <i class="fa-solid fa-plus"></i>
          <span>ADD</span>
        </button>
      </div>`;
  } else {
    listPageEl.classList.add("list", "empty");

    listPageEl.innerHTML = items.map((item) => {});
  }
  // listPageEl.innerHTML = !items.length
  //   ? `
  //   <i class="fa-solid fa-${icons[randomIconIndex]} icon--mdx3 list-icon"></i>
  //   <p class="primary-text main-title">Let's plan your shopping</p>
  //   <p class="secondary-text">Tap the plus button to create your first list</p>

  //   <div class="list-button-wrapper">
  //     <button class="add-item-button button button--lg button--primary" id="add-item" data-button-action="add-item">
  //       <i class="fa-solid fa-plus"></i>
  //       <span>ADD</span>
  //     </button>
  //   </div>
  //   `
  //   : `
  //   <ul>
  //     ${items
  //       .filter((x) => x.listId)
  //       .map((item) => `<li>${item.title}</li>`)
  //       .join("")}
  //   </ul>
  //   `;

  containerEl.appendChild(listPageEl);

  listPageEl.addEventListener("click", handleListPageClick);
};

const handleListPageClick = (e) => {
  console.log("handleListPageClick >>>");

  let target = e.target;

  if (target.closest("[data-button-action='add-item']")) {
    navigateToPageWithId("newitem", listId);
  }
};

// renderListPage(listId);
