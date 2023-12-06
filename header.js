import { getCurrentTime } from "./functions.js";
const containerEl = document.querySelector(".container");

console.log(containerEl, document.location.href);

const setHeaderOptions = (title, isToggler, actions = []) => {
  let headerOptions = {
    title,
    isToggler: isToggler,
    actionsArr: [],
  };

  actions.map((action) => headerOptions.actionsArr.push(action));

  return headerOptions;
};

const mainHeaderOpts = setHeaderOptions("My Lists", true, [
  { action: "list-share", icon: "user-plus" },
  { action: "account-open", icon: "envelope" },
]);

const newListOpts = setHeaderOptions("", false, []);

const listOpts = setHeaderOptions();

/**
 * Renders the header element in a page based on the current URL.
 */
export const includeHeader = () => {
  switch (window.location.pathname) {
    case "/":
      renderDynamicHeader(mainHeaderOpts);
      break;
    case "/newlist.html":
      renderDynamicHeader(newListOpts);
      break;
    case "/list.html":
      renderDynamicHeader(mainHeaderOpts);
      break;
  }
};

const renderDynamicHeader = ({ title, isToggler, actionsArr }) => {
  console.log("renderDynamicHeader ===>");
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  if (isToggler) {
    headerEl.innerHTML += `<button class="button--icon header-sidenav-button">
      <i class="fa-solid fa-bars icon--md">
    </button>`;
  } else {
    headerEl.innerHTML += `<button class="button--icon header-sidenav-button" data-header-action="back">
      <i class="fa-solid fa-arrow-left icon--md"></i>
    </button>`;
  }

  headerEl.innerHTML += `<h3 class="header-title">${title}</h3>`;

  const headerActionsEl = document.createElement("div");
  headerActionsEl.classList.add("header-actions");
  headerEl.appendChild(headerActionsEl);

  headerActionsEl.innerHTML += actionsArr
    .map((action) => {
      return `<button class="header-action button--icon">
      <i class="fa-solid fa-${action.icon} icon--md"></i>
    </button>`;
    })
    .join("");

  headerEl.appendChild(headerActionsEl);

  console.log("before container append ====>");
  document.body.insertAdjacentElement("afterbegin", headerEl);

  headerEl.addEventListener("click", handleHeader);
};

const handleHeader = (e) => {
  let target = e.target;
  let targetParent = target.parentElement;

  let headerAction = targetParent.dataset.headerAction;

  if (headerAction === "back") {
    handleBackButtonClick();
  }
};

const handleBackButtonClick = () => {
  history.back();
  sessionStorage.clear();
};
