console.log("~ list.js ~");

import { lists, items, icons } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

const containerEl = document.querySelector(".container");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const listId = parseInt(array[0]);

let listItems = JSON.parse(localStorage.getItem("LIST_ITEMS")) || [];

const getListItems = () => {
  console.log("getListItems ===>");
  let newArray = items.filter((item) => item.listId === listId);
  localStorage.setItem("LIST_ITEMS", JSON.stringify(newArray));
};

getListItems();

const updateStorageItems = (itemId) => {
  console.log("updateItems >>>");
  if (items.some((item) => item.id == itemId)) {
    let newItems = items.map((item) => {
      if (item.id == itemId) {
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    localStorage.setItem("ITEMS", JSON.stringify(newItems));
  }
};

const updateItemIsDone = (itemId) => {
  console.log("updateItemIsDone ===>");

  if (listItems) {
    let newItemList = listItems.map((listItem) => {
      if (listItem.id == itemId) {
        return { ...listItem, isDone: !listItem.isDone };
      } else {
        return listItem;
      }
    });

    localStorage.setItem("LIST_ITEMS", JSON.stringify(newItemList));

    updateStorageItems(itemId);
  }
};

updateItemIsDone(1703286472897);
updateItemIsDone(1703286472897);
