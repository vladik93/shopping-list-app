import { getCurrentTime } from "./functions.js";

const setHeaderOptions = (title, isToggler, actions = []) => {
  let headerOptions = {
    title,
    isToggler: isToggler,
    actionsArr: [],
  };

  actions.map((action) => headerOptions.actionsArr.push(action));

  return headerOptions;
};

// HEADER EVENT LISTENERS
const onHandleListShareClick = () => {
  console.log("HELLO");
};

// HEADER OPTIONS

const mainHeaderOpts = setHeaderOptions("My Lists", true, [
  { action: "list-share", icon: "user-plus" },
  { action: "account-open", icon: "envelope" },
]);

const newListOpts = setHeaderOptions("", false, []);

// HEADER SWITCH CASES

export const includeHeader = (containerEl) => {
  console.log(window.location);

  switch (window.location.pathname) {
    case "/":
      renderDynamicHeader(mainHeaderOpts);
      break;
    case "/newlist.html":
      renderDynamicHeader(newListOpts);
  }
};

const renderDynamicHeader = ({ title, isToggler, actionsArr }) => {
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  if (isToggler) {
    headerEl.innerHTML += `<button class="button--icon header-sidenav-button">
      <i class="fa-solid fa-bars icon--md">
    </button>`;
  } else {
    headerEl.innerHTML += `<button class="button--icon header-sidenav-button" data-action="back">
      <i class="fa-solid fa-arrow-left icon--md"></i>
    </button>`;
  }

  headerEl.innerHTML += `<h3 class="header-title">${title}</h3>`;

  const headerActionsEl = document.createElement("div");
  headerActionsEl.classList.add("header-actions");
  headerEl.appendChild(headerActionsEl);

  headerActionsEl.innerHTML += actionsArr
    .map((action) => {
      return `<button class="header-action button--icon" id="${action.action}">
      <i class="fa-solid fa-${action.icon} icon--md"></i>
    </button>`;
    })
    .join("");

  headerEl.appendChild(headerActionsEl);

  document.body.appendChild(headerEl);

  // EVENT LISTENERS

  headerActionsEl.addEventListener("click", handleHeaderActions);
  headerEl.addEventListener("click", handleHeader);
};

const handleHeaderActions = (e) => {
  let element = e.target;
  let elementParent = element.parentElement;

  if (elementParent.id === "list-share") {
    console.log("list-share triggered ===>");
  } else if (elementParent.id === "account-open") {
    console.log("account-open triggered ====>");
  }
};

const handleHeader = (e) => {
  let element = e.target;
  let parentElement = element.parentElement;
  let action = parentElement.dataset.action;

  if (action === "back") {
    history.back();
    sessionStorage.clear();
  }
};
