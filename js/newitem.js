import { popularItems, items } from "../data.js";

const containerEl = document.querySelector(".container");
const itemHeaderTabsEl = document.querySelector("#item-header-tabs");

const newItemInputEl = document.getElementById("new-item-input");
let newItemInputFlag = false;

const handleItemHeaderInput = (e) => {
  console.log("handleItemHeaderSearch ===>");

  let target = e.target;
  let dataInput = e.target.dataset.input;

  if (target.closest(`[data-input=${dataInput}]`)) {
    let inputValue = newItemInputEl.value;
    target.value = inputValue;

    if (inputValue.length) {
      console.log("inputValue ===>", "not empty");
      if (!newItemInputFlag) {
        newItemInputFlag = true;

        renderAddItemButton();
      }
    } else {
      newItemInputFlag = false;
      let addItemBtn = document.querySelector("#add-item-button");

      addItemBtn.remove();
    }
  }
};

newItemInputEl.addEventListener("input", handleItemHeaderInput);

const renderAddItemButton = () => {
  let addItemButtonEl = `<button class="add-item-button" id="add-item-button"><i class="fa-solid fa-check icon"></i></button>`;

  containerEl.innerHTML += addItemButtonEl;
};

const handleItemHeaderTabsClick = (e) => {
  console.log("handleItemHeaderTabsClick ====>");

  let target = e.target;

  const headerTabActiveEl = document.querySelector(".tab.active");

  headerTabActiveEl.classList.remove("active");

  if (target.closest("#recent-tab")) {
    target.classList.add("active");
    renderPopular();
  }
  if (target.closest("#popular-tab")) {
    target.classList.add("active");
  }
};

itemHeaderTabsEl.addEventListener("click", handleItemHeaderTabsClick);

const createListItem = (title) => {
  let listItem = {
    dateCreated: new Date().getTime(),
    title,
    quantity: 0,
  };

  popularItems.push(listItem);
};

const renderListItem = (item) => {
  let listItemTemplate = `
    <div class="list-item">
      <div class="list-item-content">
        <span><i class="fa-solid fa-plus icon"></i></span> 
        <p>${item}</p>
      </div>
      <div class="list-item-quantity">
        <span>2</span>
        <button id="item-quantity-action"><i class="fa-solid fa-minus"></i></button>
      </div>
    </div>
  `;

  return listItemTemplate;
};

const renderPopular = () => {
  containerEl.innerHTML = "";
  const popularItemListEl = document.createElement("div");
  popularItemListEl.classList.add("item-list", "popular");

  popularItemListEl.innerHTML += popularItems
    .map((item) => renderListItem(item))
    .join("");

  containerEl.appendChild(popularItemListEl);
};

const renderRecent = () => {};

renderPopular();
