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

const getListById = (listId) => {
  if (lists && lists.length) {
    let list = lists.find((list) => list.id === listId);
    currentList = list;
    localStorage.setItem("CURRENT_LIST", JSON.stringify(currentList));
  }
};

getListById(listId);
