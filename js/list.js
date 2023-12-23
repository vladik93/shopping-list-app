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

let listItems = JSON.parse(localStorage.getItem("LIST_ITEMS")) || [];

const getListItems = () => {
  let newArray = items.filter((item) => item.listId === listId);
  localStorage.setItem("LIST_ITEMS", JSON.stringify(newArray));
};

// const updateStorageItems = (itemId) => {
//   console.log("updateStorageItems >>>");
//   if (items.some((item) => item.id === itemId)) {
//     let newItems = items.map((item) => {
//       if (item.id === itemId) {
//         return { ...item, isDone: !item.isDone };
//       } else {
//         return item;
//       }
//     });

//     localStorage.setItem("ITEMS", JSON.stringify(newItems));
//   }
// };

console.log("listItems ===>", listItems);

const updateItemIsDone = (itemId) => {
  console.log("updateItemIsDone >>>");
  if (items) {
    let newItemArray = items.map((item) => {
      if (item.id === itemId) {
        console.log("isDone ===>", item.isDone);
        console.log(
          "isDone ===>",
          item.isDone,
          "isDone opposite ===>",
          !item.isDone
        );
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    localStorage.setItem("ITEMS", JSON.stringify(newItemArray));
  }
};

const onListItemClick = (e) => {
  let target = e.target;
  if (target.closest(".item-checkbox")) {
    let itemId = parseInt(e.target.closest(".item").id);
    let checkboxEl = e.target.closest(".item-checkbox");

    updateItemIsDone(itemId);
  }
};

const renderListItems = () => {
  console.log("renderListItems >>>");
  itemsWrapperEl.innerHTML = "";
  if (listItems.length) {
    listItems.map((item) => {
      const { id, title, isDone } = item;
      console.log("isDone ===>", isDone);
      let itemEl = document.createElement("div");
      itemEl.classList.add("item");
      itemEl.setAttribute("id", id);

      itemEl.innerHTML = `
        <label for="item-checkbox" class="checkbox-wrapper">
          <input type="checkbox" class="checkbox item-checkbox" checked=${
            isDone ? "true" : "false"
          } />
          <i class="fa-solid fa-check item-check-icon"></i>
        </label>
        <h4 class="item-content">${title}</h4>
        <div class="icon-wrapper">
          <i class="fa-solid fa-cheese icon"></i>
        </div>`;

      itemsWrapperEl.appendChild(itemEl);

      itemEl.addEventListener("click", onListItemClick);
    });
  } else {
    itemsWrapperEl.classList.add("items-wrapper-empty");
  }
};

getListItems();
renderListItems();
