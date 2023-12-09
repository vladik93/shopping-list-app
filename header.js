console.log("~ header.js ~");

const containerEl = document.querySelector(".container");

const setHeaderSettings = (mainBtn = {}, title = "", actions = []) => {
  console.log("<<< setHeaderSettings >>>");

  mainBtn.icon = mainBtn.icon;
  mainBtn.url = mainBtn.url;

  title = title;

  const actionsArray = [];
  actions.forEach((action) => actionsArray.push(action));

  return { mainBtn, title, actionsArray };
};

const listPageSettings = setHeaderSettings(
  { icon: "arrow-left", url: "/" },
  "my list",
  []
);

export const renderHeader = ({
  mainBtn: { url, icon },
  title,
  actions = [],
}) => {
  console.log("renderHeader >>>");

  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  headerEl.innerHTML = `
    <button class="button--icon header-main-button" data-main-button data-button-url=${url}>
      <i class="fa-solid fa-${icon} icon--md">
    </button>
    
    `;

  containerEl.appendChild(headerEl);

  headerEl.addEventListener("click", handleHeaderClick);
};

const handleHeaderClick = (e) => {
  console.log("handleHeaderClick >>>");

  let target = e.target;

  if (target.closest("[data-main-button]")) {
    const headerMainBtn = document.querySelector("[data-main-button]");
    const buttonUrl = headerMainBtn.dataset.buttonUrl;

    window.location.href = buttonUrl;
  }
};

renderHeader(listPageSettings);
