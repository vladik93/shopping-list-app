import { collection, items } from "../data.js";
import { navigateToPageWithId } from "../functions.js";

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

const listId = parseInt(paramsArray[0]);

const LISTS = JSON.parse(localStorage.getItem("LISTS")) || [];
const CURRENT_LIST = JSON.parse(localStorage.getItem("CURRENT_LIST")) || [];

console.log("listItems ->", CURRENT_LIST);

const addNewItem = (title) => {
  let items = CURRENT_LIST.listItems;
  console.log("items ->", items);
  if (items.some((item) => item.title === title)) return;

  let listItem = {
    id: new Date().getTime(),
    dateCreated: new Date(),
    title,
    quantity: undefined,
    unit: undefined,
    category: "other",
    isDone: false,
    listId: parseInt(listId),
  };

  LISTS.map((list) => {
    if (list.id === listId) {
      console.log("list here ->");
      let newArray = list.listItems.push(listItem);
      console.log("LISTS ->", list);
    }
  });
};

addNewItem("Clementine");
