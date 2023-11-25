import { getCurrentTime } from "./functions.js";

const handleBackButtonClick = () => {
  history.back();
  sessionStorage.clear();
};

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
  { icon: "user-plus", listener: onHandleListShareClick },
  { icon: "envelope", listener: onHandleListShareClick },
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
    const headerSidenavBtn = document.createElement("button");
    headerSidenavBtn.classList.add("button--icon", "header-sidenav-button");
    headerEl.appendChild(headerSidenavBtn);

    const headerSidenavIcon = document.createElement("i");
    headerSidenavIcon.classList.add("fa-solid", "fa-bars", "icon--md");
    headerSidenavBtn.appendChild(headerSidenavIcon);
  } else {
    const headerBackBtn = document.createElement("button");
    headerBackBtn.classList.add("button--icon", "header-sidenav-button");
    headerEl.appendChild(headerBackBtn);

    const headerBackIcon = document.createElement("i");
    headerBackIcon.classList.add("fa-solid", "fa-arrow-left", "icon--md");
    headerBackBtn.appendChild(headerBackIcon);

    headerBackBtn.addEventListener("click", handleBackButtonClick);
  }

  const headerTitleEl = document.createElement("h3");
  headerTitleEl.classList.add("header-title");
  headerTitleEl.innerText = title;
  headerEl.appendChild(headerTitleEl);

  const headerActionsEl = document.createElement("div");
  headerActionsEl.classList.add("header-actions");
  headerEl.appendChild(headerActionsEl);

  actionsArr.map((action) => {
    const headerActionBtn = document.createElement("button");
    headerActionBtn.classList.add("header-action", "button--icon");

    const headerActionIcon = document.createElement("i");
    headerActionIcon.classList.add("fa-solid", `fa-${action.icon}`, "icon--md");

    headerActionBtn.appendChild(headerActionIcon);

    headerActionsEl.appendChild(headerActionBtn);

    headerActionBtn.addEventListener("click", action.listener);
  });
  headerEl.appendChild(headerActionsEl);

  document.body.appendChild(headerEl);
};
