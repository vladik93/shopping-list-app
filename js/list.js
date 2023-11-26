import { lists } from "../data.js";

console.log("list.js ====>");

const url = window.location.href;

const searchParams = new URL(url).searchParams;

const entries = new URLSearchParams(searchParams).values();

const array = Array.from(entries);

let listId = array[0];

let isFound = lists.some((list) => list.id === parseInt(listId));

console.log("isFound ===>", isFound);
