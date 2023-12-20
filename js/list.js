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

const ITEMS = JSON.parse(localStorage.getItem("ITEMS")) || [];
