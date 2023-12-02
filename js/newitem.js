import { popularItems, items } from "../data.js";

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
    renderPopular();
  }
  if (target.closest("#popular-tab")) {
    target.classList.add("active");
  }
};

itemHeaderTabsEl.addEventListener("click", handleItemHeaderTabsClick);

const renderPopular = () => {
  containerEl.innerHTML = "";
  const popularItemListEl = document.createElement("div");
  popularItemListEl.classList.add("item-list", "popular");

  popularItems.map((item) => {
    const listItemEl = document.createElement("div");
    listItemEl.classList.add("list-item");
    listItemEl.dataset.listItemAction = "add";

    listItemEl.innerHTML += renderListItem(item);

    popularItemListEl.appendChild(listItemEl);

    listItemEl.addEventListener("click", handleListItemClick);
  });

  containerEl.appendChild(popularItemListEl);
};

const renderRecent = () => {
  // RENDERS ONLY AFTER ADDING ITEM FROM POPULAR/INPUT.
  // HISTORY CAN BE DELETED.
};

const renderListItem = (item) => {
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
    addListItem("HELLO");
  }
};

const addListItem = (title) => {
  console.log("createListItem ===>");
  let listItem = {
    id: new Date().getTime(),
    dateCreated: new Date(),
    title,
    quantity: 0,
    listId: listId,
  };

  items.push(listItem);

  localStorage.setItem("ITEMS", JSON.stringify(items));
};

renderPopular();
