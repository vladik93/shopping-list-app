import { lists, icons } from "../data.js";
import { navigateToPage } from "../functions.js";
import { includeHeader } from "../header.js";

console.log("list.js ====>");

includeHeader();

const containerEl = document.querySelector(".container");

const url = window.location.href;
const searchParams = new URL(url).searchParams;
const entries = new URLSearchParams(searchParams).values();
const array = Array.from(entries);

const randomIconIndex = sessionStorage.getItem("randomIconIndex") || 0;

let listId = array[0];

let newItemUrl = "http://localhost:5500/newitem.html?";

console.log(lists);

function renderListPage(listId) {
  console.log("renderListPage ===>");
  console.log("elm param ====>", listId);

  console.log("listItems ===>", lists);

  if (lists.some((item) => item.id == listId)) {
    const found = lists.find((item) => item.id === parseInt(listId));

    const listPageEl = document.createElement("div");
    listPageEl.classList.add("list-page");

    listPageEl.innerHTML = `
      <i class="fa-solid fa-${icons[randomIconIndex]} icon--mdx3 list-icon"></i>
      <p class="primary-text main-title">Let's plan your shopping</p>
        <p class="secondary-text">
          Tap the plus button to create your first list
        </p>
        
        <div class="list-button-wrapper">
          <button class="add-item-button button button--lg button--primary" id="add-item">
            <i class="fa-solid fa-plus"></i>
            <span>ADD</span>
          </button>
        </div>
    `;

    containerEl.appendChild(listPageEl);

    listPageEl.addEventListener("click", handleListPageClick);
  }
}

const handleListPageClick = (e) => {
  console.log("handleListPageClick ===>");
  let target = e.target;

  if (target.closest("#add-item")) {
    navigateToNewTasksPage(listId);
  }
};

const navigateToNewTasksPage = (listId) => {
  const searchParams = new URLSearchParams({ id: listId });
  const queryString = searchParams.toString();

  window.location.href = newItemUrl + queryString;
};

renderListPage(listId);
