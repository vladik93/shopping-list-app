import { collection, items } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

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

const handleItemHeaderClick = (e) => {
  console.log("handleItemHeaderClick >>>");

  let target = e.target;

  if (target.closest("[data-button-action='back']")) {
    e.preventDefault();

    navigateToPageWithId("list", listId);
  }
};

itemHeaderEl.addEventListener("click", handleItemHeaderClick);

const handleContainerClick = (e) => {
  console.log("handleContainerClick ===>");
  let target = e.target;

  if (target.closest("#add-item-button")) {
    let inputVal = newItemInputEl.value;
    console.log("add-item-input >>", inputVal);

    addListItem(inputVal);

    newItemInputFlag = false;
  }
};

containerEl.addEventListener("click", handleContainerClick);

const handleItemHeaderInput = (e) => {
  console.log("handleItemHeaderInput ===>");

  let target = e.target;
  let dataInput = e.target.dataset.input;

  if (target.closest(`[data-input=${dataInput}]`)) {
    let inputValue = newItemInputEl.value;
    target.value = inputValue;

    if (inputValue.length) {
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
  console.log("renderAddItemButton ===>");

  let addItemButtonEl = `<button class="add-item-button button button--primary" id="add-item-button"><i class="fa-solid fa-check icon"></i></button>`;

  containerEl.innerHTML += addItemButtonEl;
};

const handleItemHeaderTabsClick = (e) => {
  console.log("handleItemHeaderTabsClick ====>");

  let target = e.target;

  const headerTabActiveEl = document.querySelector(".item-header-tab.active");

  headerTabActiveEl.classList.remove("active");

  if (target.closest("#recent-tab")) {
    target.classList.add("active");
    renderList();
  }
  if (target.closest("#popular-tab")) {
    target.classList.add("active");
    renderList();
  }
};

itemHeaderTabsEl.addEventListener("click", handleItemHeaderTabsClick);

const renderList = () => {
  console.log("renderList ===>");
  const selectedTab = document.querySelector(".item-header-tab.active");

  let data = selectedTab.dataset.tab;

  containerEl.innerHTML = "";
  const popularItemListEl = document.createElement("div");
  popularItemListEl.classList.add("item-list", data);

  filterList(collection, data).map((item, index) => {
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

  // updateListItemElm();
  // handleItemHeaderInput();
  newItemInputEl.addEventListener("input", handleItemHeaderInput);
};

const filterList = (arr, data) => {
  switch (data) {
    case "popular":
      return arr.filter((x) => x.isPopular);
    case "recent":
      return arr.filter((x) => x.isRecent);
  }
};

const renderListItem = ({ item }) => {
  console.log("renderListItem ====>");
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
    isPopular: true,
    isRecent: false,
    dateAdded: new Date(),
  };

  collection.push(newItem);

  localStorage.setItem("COLLECTION", JSON.stringify(collection));

  newItemInputEl.value = "";

  renderList();
};

const addListItem = (title) => {
  console.log("addListItem ===>");
  if (items.some((item) => item.title === title)) return;

  let listItem = {
    id: new Date().getTime(),
    dateCreated: new Date(),
    title,
    quantity: undefined,
    unit: undefined,
    category: "other",
    isDone: false,
    listId: parseInt(listId),
  };

  items.push(listItem);

  localStorage.setItem("ITEMS", JSON.stringify(items));

  newItemInputEl.value = "";

  navigateToPageWithId("list", listId);
};

const updateListItemElm = () => {
  console.log("updateListItemElm ===>");
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

// renderList();

// updateListItemElm();
