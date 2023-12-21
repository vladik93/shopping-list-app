console.log("~ list.js ~");

// EXPORTS

import { lists, items, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";
import { addListItem } from "../functions.js";

// VARIABLES

const containerEl = document.querySelector(".container");
const itemsWrapperEl = document.querySelector(".items-wrapper");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = parseInt(array[0]);

let itemsByListId = [];

// FUNCTIONS

const getItems = () => {
  if (items) {
    let newItemsArr = items.filter((item) => item.listId === listId);
    itemsByListId = newItemsArr;
  }
};

getItems();

const onItemClick = (e) => {
  console.log("onItemClick >>>");
  let target = e.target;

  if (target.closest(".item-checkbox")) {
    const checkboxEl = target.closest(".item-checkbox");
    console.log("checkbox ===>", checkboxEl);
    let itemEl = target.closest(".item");
    let itemId = parseInt(itemEl.id);

    console.log(itemId);
    toggleCheckboxById(itemId);
  }
};

// // addListItem("HELLO 1", listId);
// addListItem("HELLO 2", listId);

const renderList = () => {
  if (itemsByListId) {
    itemsByListId.map(({ id, title, isDone }) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("item");
      itemEl.setAttribute("id", id);
      itemEl.innerHTML = `
        <label for="item-checkbox" class="checkbox-wrapper">
          <input type="checkbox" id="checkbox-${id}" class="checkbox item-checkbox" />
          <i class="fa-solid fa-check item-check-icon"></i>
        </label>
        <h4 class="item-content">${title}</h4>
        <div class="icon-wrapper">
          <i class="fa-solid fa-cheese icon"></i>
        </div>`;

      itemEl.addEventListener("click", onItemClick);

      itemsWrapperEl.appendChild(itemEl);
    });
  }
};

const toggleCheckboxById = (itemId) => {
  console.log("toggleCheckboxById ===>");
  console.log("itemId ===>", itemId);
  console.log("items ====> before =>", items);

  if (items) {
    let newArray = items.map((item) => {
      if (item.id == itemId) {
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    localStorage.setItem("ITEMS", JSON.stringify(newArray));
    getItems();
  }
};

renderList();
