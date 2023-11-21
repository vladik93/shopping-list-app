import { includeHeader } from "../functions.js";
import { suggestions } from "../data.js";

const containerEl = document.getElementById("container");
const newListWrapperEl = document.getElementById("new-list-wrapper");
// fa-solid fa-title
const icons = ["fish", "cheese", "carrot", "pizza-slice", "cookie"];

/**
 * Generates a random icon.
 * @param title - The title of the book.
 */

const generateRandomIcon = (parentEl) => {
  console.log("generateRandomIcon ===>");
  let index = Math.floor(Math.random() * icons.length);
  let icon = `fa-solid fa-${icons[index]}`;
  console.log(index);

  parentEl.innerHTML += `<i class="${icon} icon--mdx2">`;
};

const generateNewListPage = () => {
  const newListEl = document.createElement("div");
  newListEl.classList.add("new-list");

  newListEl.innerHTML = `
    <div class="new-list-wrapper" id="new-list-wrapper">
      
      <input type="text" class="input input--full" placeholder="New List" />
    </div>

    <div class="new-list-suggestions-wrapper">
      <span class="new-list-suggestions-title text--sm">Suggestions</span>
      <div class="new-list-suggestions">
        
      // suggestions function  

      </div>
    </div>

    <div class="new-list-button-wrapper">
      <button class="button--full button button--primary">CREATE</button>
    </div>  
  `;

  containerEl.appendChild(newListEl);
};

const generateSuggestions = (title) => {
  const newListSuggestionButton = document.createElement("button");
  newListSuggestionButton.classList.add(
    "new-list-suggestion",
    "button--secondary"
  );

  newListSuggestionButton.innerText = title;

  const parentElm = newListSuggestionButton.parentElement;

  console.log(parentElm);
};

includeHeader(containerEl);
generateRandomIcon(newListWrapperEl);
generateNewListPage();
