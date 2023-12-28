console.log("~ list.js ~");

import { lists, items, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

const containerEl = document.querySelector(".container");
const itemsWrapperEl = document.querySelector(".items-wrapper");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = parseInt(array[0]);

let currentList = JSON.parse(localStorage.getItem("CURRENT_LIST")) || {};

let listItems = currentList.listItems;
console.log("listItems ->", listItems);

const getListById = (listId) => {
  if (lists && lists.length) {
    let list = lists.find((list) => list.id === listId);
    currentList = list;
    localStorage.setItem("CURRENT_LIST", JSON.stringify(currentList));
  }
};

getListById(listId);

const renderListItems = () => {
  itemsWrapperEl.innerHTML = "";
  if (listItems.length) {
    listItems.map((item) => {
      const { id, title, isDone } = item;
      let itemEl = document.createElement("div");
      itemEl.classList.add("item");
      itemEl.setAttribute("id", id);

      itemEl.innerHTML = `
        <label for="item-checkbox" class="checkbox-wrapper">
          <input type="checkbox" class="checkbox item-checkbox"  />
          <i class="fa-solid fa-check item-check-icon"></i>
        </label>
        <h4 class="item-content">${title}</h4>
        <div class="icon-wrapper">
          <i class="fa-solid fa-cheese icon"></i>
        </div>`;

      itemEl.addEventListener("click", (e) => {
        let target = e.target;
        let itemEl = target.closest(".item");
        let checkboxEl = target.closest(".item-checkbox");
        let userId = parseInt(itemEl.id);

        if (checkboxEl) {
        }
      });
      itemEl.querySelector(".item-checkbox").checked = isDone ? true : false;

      itemsWrapperEl.appendChild(itemEl);
    });
  } else {
    itemsWrapperEl.classList.add("items-wrapper-empty");
  }
};

const updateItemIsDone = (itemId) => {
  console.log("updateItemIsDone function ->");
  let list = currentList;

  console.log("list ->", list);
};

updateItemIsDone();

renderListItems();
