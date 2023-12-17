console.log("~ list.js ~");

import { lists, items, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

const containerEl = document.querySelector(".container");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = array[0];

let listById = [];

console.log("listById ===>", listById);

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
  const filteredList = items.filter((item) => item.listId === parseInt(listId));

  listById = filteredList;
};

const renderListPage = (listPageId) => {
  console.log("renderListPage >>>");

  containerEl.innerHTML = "";

  const listPageWrapperEl = document.createElement("div");
  listPageWrapperEl.classList.add("list-page-wrapper");

  const progressWrapperEl = document.createElement("div");
  progressWrapperEl.classList.add("progress-wrapper");
  progressWrapperEl.innerHTML = `
      <div class="progress">
        <span class="progress-bar"></span>
      </div>`;

  listPageWrapperEl.insertAdjacentElement("afterbegin", progressWrapperEl);

  if (!listById.length) {
    listPageWrapperEl.classList.add("empty-list");

    const mainWrapperEl = document.createElement("div");
    mainWrapperEl.classList.add("main-wrapper");
    mainWrapperEl.innerHTML = `
      <i class="fa-solid fa-${icons[randomIconIndex]} icon--mdx3 list-icon"></i>
      <p class="primary-text main-title">Let's plan your shopping</p>
      <p class="secondary-text">Tap the plus button to create your first list</p>
    `;
    listPageWrapperEl.appendChild(mainWrapperEl);
  } else {
    const itemsWrapperEl = document.createElement("div");
    itemsWrapperEl.classList.add("items-wrapper");
    listById.map((listItem) => {
      itemsWrapperEl.innerHTML += renderListItem(listItem);
    });

    listPageWrapperEl.appendChild(itemsWrapperEl);
  }

  const listButtonWrapperEl = document.createElement("div");
  listButtonWrapperEl.classList.add("list-button-wrapper");

  listButtonWrapperEl.innerHTML = `
    <button class="add-item-button button button--lg button--primary" id="add-item" data-button-action="add-item">
      <i class="fa-solid fa-plus"></i>
      <span>ADD</span>
    </button>`;

  listPageWrapperEl.insertAdjacentElement("beforeend", listButtonWrapperEl);

  containerEl.appendChild(listPageWrapperEl);

  listPageWrapperEl.addEventListener("click", handleListPageClick);
};

const renderListItem = (item) => {
  const { id, title } = item;

  const listItemTemplate = `
  <div class="item">
    <div class="item-column item-column-left">
      <label class="checkbox-wrapper">
        <input type="checkbox" class="checkbox" />
      </label>
      <h4>${title}</h4>
    </div>
    <div class="item-column item-column-right">
      <div class="icon-wrapper">
        <i class="fa-solid fa-cheese icon"></i>
      </div>
    </div>
  </div>`;

  return listItemTemplate;
};

const handleListPageClick = (e) => {
  console.log("handleListPageClick >>>");

  let target = e.target;

  if (target.closest("[data-button-action='add-item']")) {
    navigateToPageWithId("newitem", listId);
  }
};

getItemsByListId();

renderListPage(listId);
