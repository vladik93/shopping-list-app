import { popularItems } from "../data.js";

const containerEl = document.getElementById("container");
const itemHeaderTabsEl = document.querySelector("#item-header-tabs");

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
