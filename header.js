console.log("~ header.js ~");

import { lists } from "./data.js";

const containerEl = document.querySelector(".container");

// document.addEventListener("DOMContentLoaded", () => {

const currentListId = JSON.parse(localStorage.getItem("CURRENT_LIST_ID"));

const getCurrentList = () => {
  if (currentListId !== null) {
    const found = lists.find((list) => list.id === currentListId);

    console.log("found ==>", found);

    return found;
  }
};

let currentList = getCurrentList() || {};

console.log("currentList ===>", currentList);

const setHeaderSettings = (id = "", mainBtn = {}, title = "", actions = []) => {
  console.log("<<< setHeaderSettings >>>");

  console.log("currentList ===>", currentList);

  id = id;

  mainBtn.icon = mainBtn.icon;
  mainBtn.url = mainBtn.url;

  title = title;

  const actionsArray = [];
  actions.forEach((action) => actionsArray.push(action));

  return { mainBtn, title, actionsArray };
};

const listPageSettings = setHeaderSettings(
  "list-page",
  { icon: "arrow-left", url: "/", data: "list" },
  currentList.title,
  [({ icon: "user-plus" }, { icon: "gift" })]
);

const mainPageSettings = setHeaderSettings(
  "main",
  { icon: "bars", url: "#" },
  "My Lists",
  [{ icon: "gift" }, { icon: "bolt" }]
);

export const renderHeader = (headerSettingsObject) => {
  console.log("renderHeader >>>");

  const {
    mainBtn: { url, icon, data },
    title,
    actionsArray,
  } = headerSettingsObject;

  console.log("headerSettingsObject ===>", headerSettingsObject);

  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  headerEl.innerHTML = `
    <button class="button--icon header-main-button" data-main-button data-button=${data} data-button-url=${url}>
      <i class="fa-solid fa-${icon} icon--md"></i>
    </button>
    <h3 class="header-title">${title}</h3>
    <div class="header-actions">
      ${actionsArray
        .map((action) => {
          return `
        <button class="header-action button--icon">
          <i class="fa-solid fa-${action.icon} icon--md"></i>
        </button>`;
        })
        .join("")}
    </div>
    `;

  containerEl.appendChild(headerEl);

  headerEl.addEventListener("click", handleHeaderClick);
};

const handleHeaderRenderByUrl = () => {
  switch (window.location.pathname) {
    case "/":
      renderHeader(mainPageSettings);
      break;
    case "/list.html":
      renderHeader(listPageSettings);
  }
};

const handleHeaderClick = (e) => {
  console.log("handleHeaderClick >>>");

  let target = e.target;
  let buttonData = target.dataset;

  if (target.closest("[data-button='list']")) {
    const headerMainBtn = document.querySelector("[data-main-button]");
    const buttonUrl = headerMainBtn.dataset.buttonUrl;

    localStorage.removeItem("CURRENT_LIST_ID");

    window.location.href = buttonUrl;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  handleHeaderRenderByUrl();
});
