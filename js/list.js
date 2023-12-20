console.log("~ list.js ~");

import { lists, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

const containerEl = document.querySelector(".container");
const itemsWrapperEl = document.querySelector(".items-wrapper");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = parseInt(array[0]);

const getItemsByListId = (listId) => {
  console.log("getItemsByListId >>>", listId, "paramType >", typeof listId);

  const ITEMS = JSON.parse(localStorage.getItem("ITEMS"));

  if (ITEMS.some((item) => item.listId === listId)) {
    return ITEMS.filter((x) => x.listId === listId);
  }
};

const itemsByListId = getItemsByListId(listId) || [];

const renderList = () => {
  console.log("renderList ===>");

  itemsWrapperEl.innerHTML = "";

  if (itemsByListId.length) {
    itemsByListId.map((item) => {
      const itemEl = document.createElement("div");
      itemEl.classList.add("item");
      itemEl.setAttribute("id", item.id);
      itemEl.addEventListener("click", handleItemClick);

      itemEl.innerHTML = `
        <label for="item-checkbox" class="checkbox-wrapper">
          <input type="checkbox"  class="checkbox item-checkbox" />
          <i class="fa-solid fa-check item-check-icon"></i>
        </label>
        <h4 class="item-content">${item.title}</h4>
        <div class="icon-wrapper">
          <i class="fa-solid fa-cheese icon"></i>
        </div>
      
      
      `;

      itemsWrapperEl.appendChild(itemEl);
    });
  }
};

const handleItemClick = (e) => {
  console.log("handleItemClick >>>");
  let target = e.target;

  if (target.closest(".item-checkbox")) {
    let id = target.closest(".item").id;
  }
};

renderList();
