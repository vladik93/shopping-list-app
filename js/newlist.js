import { renderHeader } from "../header.js";
import { suggestions, lists, icons } from "../data.js";

console.log("<<< newList.js >>");

const containerEl = document.querySelector(".container");

// CONTAINER EVENT LISTENERS

let newListInputValue = "";

let newListUrl = "http://localhost:5500/list.html?";

/**
 * Generates a random icon.
 */
const renderRandomIcon = () => {
  let index =
    sessionStorage.getItem("randomIconIndex") ||
    Math.floor(Math.random() * icons.length);

  let icon = `fa-solid fa-${icons[index]}`;

  if (sessionStorage.getItem("isNewListPage") === null) {
    sessionStorage.setItem("isNewListPage", true);
    sessionStorage.setItem("randomIconIndex", index);
  }

  const randomIconWrapperEl = document.createElement("div");
  randomIconWrapperEl.classList.add("random-icon-wrapper");

  randomIconWrapperEl.innerHTML = `<i class="${icon} icon--mdx2"></i>`;

  containerEl.appendChild(randomIconWrapperEl);
};

/**
 * Generates input box for adding new lists.
 */

const renderNewListInput = () => {
  const newListInputWrapper = document.createElement("div");
  newListInputWrapper.classList.add("new-list-input-wrapper");

  newListInputWrapper.innerHTML = `
  <input type="text" class="input input--full" data-input="new-list" value="${newListInputValue}" placeholder="New List" />`;
  containerEl.appendChild(newListInputWrapper);

  newListInputWrapper.addEventListener("input", handleNewListInputChange);
};

/**
 * Renders a suggestion button from an array/DB.
 * @param {*} suggestion - suggestion title
 * @returns suggestion button element.
 */
const renderSuggestionButton = (suggestion) => {
  return `<button class="suggestion button--secondary" 
  data-suggestion=${suggestion}>
  ${suggestion}
  </button>`;
};

/**
 * Renders available suggestions from an array or db.
 */

const renderSuggestions = () => {
  console.log("renderSuggestions ===>");
  const suggestionsWrapperEl = document.createElement("div");
  suggestionsWrapperEl.classList.add("suggestions-wrapper");

  suggestionsWrapperEl.innerHTML = `<span class="suggestions-title text--sm">Suggestions</span>`;

  const suggestionsEl = document.createElement("div");
  suggestionsEl.classList.add("suggestions");

  suggestionsEl.innerHTML += suggestions
    .map((suggestion) => renderSuggestionButton(suggestion))
    .join("");

  suggestionsWrapperEl.appendChild(suggestionsEl);
  containerEl.appendChild(suggestionsWrapperEl);

  suggestionsEl.addEventListener("click", handleSuggestionsClick);
};

/**
 * Renders the button for creating the new list.
 */
const renderNewListButton = () => {
  console.log("renderNewListButton ===>");
  const newListButtonWrapperEl = document.createElement("div");
  newListButtonWrapperEl.classList.add("new-list-button-wrapper");
  newListButtonWrapperEl.innerHTML = `<button class="new-list-button button--full button button--primary" data-button-action='create'>CREATE</button>`;

  containerEl.appendChild(newListButtonWrapperEl);

  newListButtonWrapperEl.addEventListener("click", handleNewListButtonClick);
};

/**
 * Renders the full new list page.
 */
const renderNewListPage = () => {
  containerEl.innerHTML = "";

  renderRandomIcon();
  renderNewListInput();
  renderSuggestions();
  renderNewListButton();
};

/**
 * Listen to changes made in the new-list input field.
 * @param {*} event - input event
 */
const handleNewListInputChange = (e) => {
  console.log("handleNewListInputChange >>>>");
  let target = e.target;

  if (target.closest('[data-input="new-list"]')) {
    newListInputValue = document.querySelector('[data-input="new-list"]').value;
  }
};

/**
 * Inputs clicked suggestion in the input box.
 * @param {*} e - event parameter
 */

const handleSuggestionsClick = (e) => {
  console.log("handleSuggestionsClick ===>");
  let target = e.target;

  if (target.closest(`[data-suggestion]`)) {
    let value = target.closest(`[data-suggestion]`).innerText;

    // let value = target.dataset.suggestion;
    newListInputValue = value;
  }

  renderNewListPage();
};

const handleNewListButtonClick = (e) => {
  console.log("handleNewListButtonClick >>>>");

  let listTitle = newListInputValue;
  console.log("listTitle ===>", listTitle);

  let target = e.target;
  let action = target.dataset.buttonAction;

  if (action === "create") {
    // addNewList(listTitle);
    addNewList(listTitle);
  }
};

const addNewList = (title) => {
  console.log("addNewList >>>");

  let newList = {
    id: new Date().getTime(),
    dateAdded: new Date(),
    title: title !== "" ? title : "New List",
  };

  lists.push(newList);

  localStorage.setItem("LISTS", JSON.stringify(lists));

  // document.querySelector('[data-input="new-list"]').value = "";

  navigateToNewListPage(newList.id);
};

const navigateToNewListPage = (newListId) => {
  console.log("navigateToNewListPage ===>");

  if (lists.find((list) => list.id == newListId)) {
    console.log("id found ===>", newListId);

    // window.location.href = "/";

    const searchParams = new URLSearchParams({ id: newListId });

    const queryString = searchParams.toString();

    localStorage.setItem("CURRENT_LIST_ID", JSON.stringify(newListId));

    window.location.href = newListUrl + queryString;
  }
};

// INVOKED FUNCTIONS

renderNewListPage();
