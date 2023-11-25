import { includeHeader } from "../header.js";
import { suggestions } from "../data.js";

const containerEl = document.getElementById("container");

const icons = ["fish", "cheese", "carrot", "pizza-slice", "cookie"];

let newListInputValue = "";

includeHeader();

window.addEventListener("popstate", () => {
  sessionStorage.removeItem("isNewListPage");
});

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

  const newListInput = document.createElement("input");
  newListInput.setAttribute("type", "text");
  newListInput.classList.add("input", "input--full");
  newListInput.setAttribute("id", "new-list-input");
  newListInput.value = newListInputValue;

  newListInput.addEventListener("change", handleNewListInputChange);

  newListInputWrapper.appendChild(newListInput);

  containerEl.appendChild(newListInputWrapper);
};

/**
 * Renders suggestion buttons in HTML.
 * @param {*} containerEl - suggestions container element
 */
const renderSuggestionElement = (containerEl) => {
  const suggestionsEl = document.createElement("div");
  suggestionsEl.classList.add("suggestions");

  suggestions.map((suggestion) => {
    const suggestionBtn = document.createElement("button");
    suggestionBtn.classList.add("suggestion", "button--secondary");
    suggestionBtn.innerText = suggestion;

    suggestionBtn.addEventListener("click", handleSuggestionButtonClick);

    suggestionsEl.appendChild(suggestionBtn);
  });

  containerEl.appendChild(suggestionsEl);
};

const renderSuggestions = () => {
  const suggestionsWrapperEl = document.createElement("div");
  suggestionsWrapperEl.classList.add("suggestions-wrapper");

  suggestionsWrapperEl.innerHTML = `<span class="suggestions-title text--sm">Suggestions</span>`;

  renderSuggestionElement(suggestionsWrapperEl);

  containerEl.appendChild(suggestionsWrapperEl);
};

/**
 * Renders the button for creating the new list.
 */
const renderNewListButton = () => {
  const newListButtonWrapperEl = document.createElement("div");
  newListButtonWrapperEl.classList.add("new-list-button-wrapper");
  newListButtonWrapperEl.innerHTML = `<button class="new-list-button button--full button button--primary">CREATE</button>`;

  containerEl.appendChild(newListButtonWrapperEl);
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

// EVENT LISTENER FUNCTIONS

/**
 * Listen to changes made in the new-list input field.
 * @param {*} event - input event
 */
const handleNewListInputChange = (event) => {
  newListInputValue = event.target.value;
};

const handleSuggestionButtonClick = (event) => {
  newListInputValue = event.target.innerHTML;
  renderNewListPage();
};

// INVOKED FUNCTIONS

renderNewListPage();
