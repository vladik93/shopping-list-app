import { includeHeader } from "../functions.js";
import { suggestions } from "../data.js";

const containerEl = document.getElementById("container");

const icons = ["fish", "cheese", "carrot", "pizza-slice", "cookie"];

includeHeader();

/**
 * Generates a random icon.
 */
const renderRandomIcon = () => {
  let index = Math.floor(Math.random() * icons.length);
  let icon = `fa-solid fa-${icons[index]}`;

  // return `<i class="${icon} icon--mdx2">`;

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

  newListInputWrapper.innerHTML = `<input type="text" class="input input--full" />`;

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
    const suggestionEl = document.createElement("button");
    suggestionEl.classList.add("suggestion", "button--secondary");
    suggestionEl.innerText = suggestion;

    suggestionsEl.appendChild(suggestionEl);
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
  renderRandomIcon();
  renderNewListInput();
  renderSuggestions();
  renderNewListButton();
};

renderNewListPage();
