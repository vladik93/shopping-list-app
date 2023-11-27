import { lists } from "../data.js";

console.log("list.js ====>");

const url = window.location.href;

const searchParams = new URL(url).searchParams;

const entries = new URLSearchParams(searchParams).values();

const array = Array.from(entries);
let listId = array[0];

// let isFound = lists.some((list) => list.id === parseInt(listId));

function renderListPage(elm) {
  const listPageEl = document.createElement("div");
  listPageEl.classList.add("list-page");

  if (lists.find((item) => item.id === elm.id)) {
    let found = item;
    let listItemEl = document.createElement("div");
    listItemEl.classList.add("list-item");
  } else {
  }

  listPageEl.appendChild();
}

renderListPage(listId);
