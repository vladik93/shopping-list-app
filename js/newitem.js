import { collection, items } from "../data.js";

const itemHeaderEl = document.getElementById("item-header");

const containerEl = document.querySelector(".container");
const itemHeaderTabsEl = document.querySelector("#item-header-tabs");

const newItemInputEl = document.getElementById("new-item-input");
let newItemInputFlag = false;

// URL PARAMS

console.log("URL params ====>");
const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const paramsArray = Array.from(entries);

const listId = paramsArray[0];

// Setting dynamic padding for container elm. based on header height

document.addEventListener("DOMContentLoaded", () => {
  let headerHeight = itemHeaderEl.getBoundingClientRect().height;
  containerEl.style.paddingTop = headerHeight + "px";
});

const handleItemHeaderInput = (e) => {
  console.log("handleItemHeaderSearch ===>");

  let target = e.target;
  let dataInput = e.target.dataset.input;

  if (target.closest(`[data-input=${dataInput}]`)) {
    let inputValue = newItemInputEl.value;
    target.value = inputValue;

    if (inputValue.length) {
      console.log("inputValue ===>", "not empty");
      if (!newItemInputFlag) {
        newItemInputFlag = true;

        renderAddItemButton();
      }
    } else {
      newItemInputFlag = false;
      let addItemBtn = document.querySelector("#add-item-button");

      addItemBtn.remove();
    }
  }
};

newItemInputEl.addEventListener("input", handleItemHeaderInput);

const renderAddItemButton = () => {
  let addItemButtonEl = `<button class="add-item-button button button--primary" id="add-item-button"><i class="fa-solid fa-check icon"></i></button>`;

  containerEl.innerHTML += addItemButtonEl;
};

const handleItemHeaderTabsClick = (e) => {
  console.log("handleItemHeaderTabsClick ====>");

  let target = e.target;

  const headerTabActiveEl = document.querySelector(".tab.active");

  headerTabActiveEl.classList.remove("active");

  if (target.closest("#recent-tab")) {
    target.classList.add("active");
    renderRecent();
  }
  if (target.closest("#popular-tab")) {
    target.classList.add("active");
    renderPopular();
  }
};

itemHeaderTabsEl.addEventListener("click", handleItemHeaderTabsClick);

const renderPopular = () => {
  containerEl.innerHTML = "";
  const popularItemListEl = document.createElement("div");
  popularItemListEl.classList.add("item-list", "popular");

  collection
    .filter((x) => x.isPopular)
    .map((item, index) => {
      const listItemEl = document.createElement("div");
      listItemEl.classList.add("list-item");
      listItemEl.dataset.listItemAction = "add";
      listItemEl.dataset.listItemId = index;
      listItemEl.dataset.listItemValue = item.item;

      listItemEl.innerHTML += renderListItem(item);

      popularItemListEl.appendChild(listItemEl);

      listItemEl.addEventListener("click", handleListItemClick);
    });

  containerEl.appendChild(popularItemListEl);
};

const renderRecent = () => {
  containerEl.innerHTML = "";
  const recentItemListEl = document.createElement("div");
  recentItemListEl.classList.add("item-list", "recent");

  collection
    .filter((x) => x.isRecent)
    .map((item, index) => {
      const listItemEl = document.createElement("div");
      listItemEl.classList.add("list-item");
      listItemEl.dataset.listItemAction = "add";
      listItemEl.dataset.listItemId = index;
      listItemEl.dataset.listItemValue = item.item;

      listItemEl.innerHTML += renderListItem(item);

      recentItemListEl.appendChild(listItemEl);

      listItemEl.addEventListener("click", handleListItemClick);
    });

  containerEl.appendChild(recentItemListEl);
};

const renderListItem = ({ item }) => {
  console.log("renderListItem ====>", item);
  const listItemTemplate = `
    <div class="list-item-content">
      <span><i class="fa-solid fa-plus icon"></i></span> 
      <p>${item}</p>
    </div>`;

  return listItemTemplate;
};

const handleListItemClick = (e) => {
  console.log("handleListItemClick ===>");
  let target = e.target;

  if (target.closest(`[data-list-item-action=add]`)) {
    let itemValue = target.closest("[data-list-item-value]").dataset
      .listItemValue;

    addListItem(itemValue);
  }
};

const addToItemCollection = (title) => {
  console.log("addToItemCollection ===>");
  if (collection.some((item) => item.item === title)) return;

  let newItem = {
    id: collection.length - 1,
    item: title,
    isPopular: false,
    isRecent: true,
    dateAdded: new Date(),
  };
  collection.push(newItem);

  localStorage.setItem("COLLECTION", JSON.stringify(collection));
};

addToItemCollection("Chipotlee");

const addListItem = (title) => {
  console.log("createListItem ===>");
  if (items.some((item) => item.title === title)) return;

  let listItem = {
    id: new Date().getTime(),
    dateCreated: new Date(),
    title,
    quantity: 1,
    listId: listId,
  };

  items.push(listItem);

  localStorage.setItem("ITEMS", JSON.stringify(items));

  addToItemCollection(title);

  updateListItemElm();
};

const updateListItemElm = () => {
  let listItemEls = document.querySelectorAll(".list-item");

  listItemEls.forEach((listItem) => {
    if (items.some((item) => item.title === listItem.dataset.listItemValue)) {
      let found = items.find(
        (item) => item.title === listItem.dataset.listItemValue
      );

      if (found) {
        listItem.classList.add("active");
      }
    }
  });
};

addListItem("French Fry");

renderPopular();

updateListItemElm();
