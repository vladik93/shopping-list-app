import { lists } from "../data.js";
import { includeHeader } from "../header.js";

const containerEl = document.querySelector(".container");

includeHeader();

const generateLists = () => {
  const mainEl = document.createElement("main");
  mainEl.classList.add("main");
  mainEl.setAttribute("id", "main");

  mainEl.innerHTML = "";

  if (!lists.length) {
    const mainNoListsEl = document.createElement("div");
    mainNoListsEl.classList.add("main-no-lists");

    mainNoListsEl.innerHTML = `
      <div class="main-wrapper">
        <i class="fa-solid fa-clipboard-list icon--mdx3 main-icon"></i>
        <p class="primary-text main-title">Let's plan your shopping</p>
        <p class="secondary-text">
          Tap the plus button to create your first list
        </p>
      </div>
     
    `;
    mainEl.appendChild(mainNoListsEl);
    containerEl.appendChild(mainEl);
  } else {
    const mainListsEl = document.createElement("div");
    mainListsEl.classList.add("main-lists");

    mainListsEl.innerHTML += lists
      .map(
        (list) => `
      <div class="list-item" id=${list.id}>
        <button class="list-item-actions button--icon">
          <i class="fa-solid fa-ellipsis-vertical icon-md"></i>
        </button>
        <h3>${list.title}</h3>
        <div class="main-progress">
          <div class="main-progress-bar">
            <span class="progress-bar-filled"></span>
          </div>
          <span class="main-progress-count">0/0</span>
        </div>
      </div>
    `
      )
      .join("");

    mainEl.appendChild(mainListsEl);
    containerEl.appendChild(mainEl);
  }

  const newListButtonEl = document.createElement("button");
  newListButtonEl.classList.add("button", "button--primary", "main-button");

  const newListButtonIconEl = document.createElement("i");
  newListButtonIconEl.classList.add("fa-solid", "fa-plus", "icon");

  newListButtonEl.appendChild(newListButtonIconEl);

  const newListButtonTextEl = document.createElement("span");
  newListButtonTextEl.innerHTML = "New List";
  newListButtonEl.appendChild(newListButtonTextEl);

  mainEl.appendChild(newListButtonEl);

  mainEl.addEventListener("click", handleMainClick);

  newListButtonEl.addEventListener("click", () => {
    document.location.assign("./newlist.html");
  });
};

const addList = () => {
  const list = {
    id: new Date().getTime(),
    title: "New Added List",
  };

  lists.push(list);

  generateLists();
};

const handleMainClick = (e) => {
  console.log("handleMainClick ===>");
  let target = e.target;

  if (target.closest(".list-item")) {
    let id = target.closest(".list-item").id;

    console.log("id >>>>", id);
  }
};

generateLists();
