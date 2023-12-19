console.log("~ list.js ~");

import { lists, items, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

const containerEl = document.querySelector(".container");
const itemsWrapperEl = document.querySelector(".items-wrapper");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = array[0];

let listById = [];

console.log("listById ===>", listById);

const getItemsByListId = () => {
  console.log("getItemsByListId ===>");
  const filteredList = items.filter((item) => item.listId === parseInt(listId));

  listById = filteredList;
};

const renderList = () => {
  itemsWrapperEl.innerHTML = "";

  itemsWrapperEl.classList.add("items-wrapper");
  itemsWrapperEl.addEventListener("click", onItemsClick);

  if (listById.length) {
    console.log("listById -> length", listById.length);

    listById.map(({ id, isDone, title }) => {
      itemsWrapperEl.innerHTML += `
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
    });
  }

  containerEl.appendChild(itemsWrapperEl);
};

const onItemsClick = (e) => {
  console.log("onItemsClick ===>");
  let target = e.target;

  if (target.closest(".item-checkbox")) {
    let selected = target.closest(".item-checkbox");

    let item = selected.closest(".item");
    item.classList.toggle("checked");
    !!selected.checked;
    setItemIsDone(selected.id);
  }
};

const setItemIsDone = (itemId) => {
  console.log("setItemIsDone >>>");

  console.log("itemId ===>", itemId);
  const id = itemId.split("-")[2];

  let newArray = items.map((item) => {
    if (item.id === parseInt(id)) {
      return { ...item, isDone: !item.isDone };
    } else {
      return item;
    }
  });
  localStorage.setItem("ITEMS", JSON.stringify(newArray));
  getItemsByListId();
  renderList();
};

getItemsByListId();

renderList();
