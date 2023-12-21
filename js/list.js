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

    itemsWrapperEl.addEventListener("click", onItemsClick);
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
  console.log("renderListItem >>>");

  const { id, title, isDone } = item;
  console.log("item ===>", item);

  console.log("isDone ===>", isDone);
  const listItemTemplate = `
  <div class="item ${isDone ? "checked" : ""}" id=${id}>
      <label for="item-checkbox" class="checkbox-wrapper">
        <input type="checkbox" id="item-checkbox-${id}" class="checkbox item-checkbox" checked=${
    isDone ? true : false
  } />
        <i class="fa-solid fa-check item-check-icon"></i>
      </label>
      <h4 class="item-content">${title}</h4>
      <div class="icon-wrapper">
        <i class="fa-solid fa-cheese icon"></i>
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

const onItemsClick = (e) => {
  console.log("onItemsClick ===>");
  let target = e.target;

  if (target.closest(".item-checkbox")) {
    let selected = target.closest(".item-checkbox");

    let item = selected.closest(".item");
    item.classList.toggle("checked");
    !!selected.checked;

    setItemIsDone(item.id);
  }
};

const setItemIsDone = (itemId) => {
  console.log("setItemIsDone >>>");
  let newArray = items.map((item) => {
    if (item.id === parseInt(itemId)) {
      return { ...item, isDone: !item.isDone };
    } else {
      return item;
    }
  });

  localStorage.setItem("ITEMS", JSON.stringify(newArray));
  getItemsByListId();
  console.log("listById ===>", listById);
};

const renderList = () => {
  console.log("renderList >>>");
  let itemsWrapperEl = document.querySelector(".items-wrapper");

  itemsWrapperEl.innerHTML = "";

  console.log("listById ===>", listById);
  listById.map((listItem) => {
    itemsWrapperEl.innerHTML += renderListItem(listItem);
  });

  // listById.map((listItem) => {
  //   itemsWrapperEl.innerHTML += renderListItem(listItem);
  // });
};

getItemsByListId();

renderListPage(listId);
