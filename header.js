import { lists } from "./data.js";

const containerEl = document.querySelector(".container");

// document.addEventListener("DOMContentLoaded", () => {

const currentListId = JSON.parse(localStorage.getItem("CURRENT_LIST_ID"));

const getCurrentList = () => {
  if (currentListId !== null) {
    const found = lists.find((list) => list.id === currentListId);

    return found;
  }
};

let currentList = getCurrentList() || {};

const setHeaderSettings = (id = "", mainBtn = {}, title = "", actions = []) => {
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
  [({ icon: "user-plus" }, { icon: "gift" })],
  { option: "progress" }
);

const mainPageSettings = setHeaderSettings(
  "main",
  { icon: "bars", url: "#" },
  "My Lists",
  [{ icon: "gift" }, { icon: "bolt" }]
);

const newListSettings = setHeaderSettings(
  "new-list",
  { icon: "arrow-left", url: "/", data: "new-list" },
  "",
  []
);

export const renderHeader = (headerSettingsObject) => {
  const {
    mainBtn: { url, icon, data },
    title,
    actionsArray,
  } = headerSettingsObject;

  const headerEl = document.createElement("header");
  headerEl.classList.add("header", `header-${data}`);

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

  // containerEl.appendChild(headerEl);
  containerEl.insertAdjacentElement("afterbegin", headerEl);

  headerEl.addEventListener("click", handleHeaderClick);
};

const handleHeaderRenderByUrl = () => {
  switch (window.location.pathname) {
    case "/":
      renderHeader(mainPageSettings);
      break;
    case "/list.html":
      renderHeader(listPageSettings);
      break;
    case "/newlist.html":
      renderHeader(newListSettings);
      break;
  }
};

const handleHeaderClick = (e) => {
  let target = e.target;

  if (target.closest("[data-button='list']")) {
    const headerMainBtn = target.closest("[data-button='list']");
    const data = headerMainBtn.dataset.buttonUrl;

    localStorage.removeItem("CURRENT_LIST_ID");
    sessionStorage.removeItem("isNewListPage");
    sessionStorage.removeItem("randomIconIndex");

    window.location.href = data;
  } else if (target.closest("[data-button='new-list']")) {
    const headerMainBtn = target.closest("[data-button='new-list']");
    const data = headerMainBtn.dataset.buttonUrl;

    sessionStorage.removeItem("isNewListPage");
    sessionStorage.removeItem("randomIconIndex");

    window.location.href = data;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  handleHeaderRenderByUrl();
});
