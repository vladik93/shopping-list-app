console.log("~ list.js ~");

import { lists, items, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

const containerEl = document.querySelector(".container");
const listPageWrapper = document.querySelector(".list-page-wrapper");
const itemsWrapperEl = document.querySelector(".items-wrapper");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = parseInt(array[0]);

let currentList = JSON.parse(localStorage.getItem("CURRENT_LIST")) || {};
let currentIconIndex = JSON.parse(sessionStorage.getItem("randomIconIndex"));

// let listItems = currentList.listItems;

const getListById = (listId) => {
  const LISTS = JSON.parse(localStorage.getItem("LISTS") || []);
  if (LISTS && LISTS.length) {
    let list = LISTS.find((list) => list.id === listId);
    currentList = list;
    localStorage.setItem("CURRENT_LIST", JSON.stringify(currentList));
  }
};

getListById(listId);

const renderListItems = () => {
  console.log("renderListItems function ->");
  itemsWrapperEl.innerHTML = "";
  if (currentList && currentList.listItems.length) {
    currentList.listItems.map((item) => {
      const { id, title, isDone } = item;
      let itemEl = document.createElement("div");
      itemEl.classList.add("item");
      itemEl.setAttribute("id", id);

      itemEl.innerHTML = `
        <label for="item-checkbox" class="checkbox-wrapper">
          <input type="checkbox" class="checkbox item-checkbox" ${
            isDone ? "checked" : ""
          } />
          <i class="fa-solid fa-check item-check-icon"></i>
        </label>
        <h4 class="item-content">${title}</h4>
        <div class="icon-wrapper">
          <i class="fa-solid fa-cheese icon"></i>
        </div>`;

      itemEl.addEventListener("change", (e) => {
        let target = e.target;
        let itemEl = target.closest(".item");
        let checkboxEl = target.closest(".item-checkbox");
        let itemId = parseInt(itemEl.id);

        if (checkboxEl) {
          updateItemIsDone(listId, itemId);
        }
      });
      itemsWrapperEl.appendChild(itemEl);
    });
  } else {
    itemsWrapperEl.classList.add("items-wrapper-empty");
    itemsWrapperEl.innerHTML += `
      <div class="list-icon-wrapper">
        <i class="fa-solid fa-fish icon--lg"></i>
      </div>
      <div class="list-text-wrapper">
        <p class="primary-text">What do you need to buy?</p>
        <p class="text--sm secondary-text">Tap the plus button to start adding products.</p>
      </div>

    
    
    `;
  }
};

const updateItemIsDone = (listId, itemId) => {
  const LISTS = JSON.parse(localStorage.getItem("LISTS"));
  let newListArray = LISTS.map((list) => {
    if (list.id === listId) {
      return {
        ...list,
        listItems: list.listItems.map((item) => {
          if (item.id === itemId) {
            return { ...item, isDone: !item.isDone };
          } else {
            return item;
          }
        }),
      };
    } else {
      return list;
    }
  });

  localStorage.setItem("LISTS", JSON.stringify(newListArray));
  getListById(listId);
  renderListItems();
};

listPageWrapper.addEventListener("click", (e) => {
  let target = e.target;
  let addItemBtn = target.closest("#add-item-button");
  if (addItemBtn) {
    document.location.href = d;
  }
});

renderListItems();
