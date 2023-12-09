console.log("~ header.js ~");

const containerEl = document.querySelector(".container");

console.log("container ===>", containerEl);

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
  [{ icon: "user-plus" }, { icon: "gift" }]
);

const mainPageSettings = setHeaderSettings(
  { icon: "bars", url: "#" },
  "My Lists",
  [{ icon: "gift" }]
);

export const renderHeader = (headerSettingsObject) => {
  console.log("renderHeader >>>");

  const {
    mainBtn: { url, icon },
    title,
    actionsArray,
  } = headerSettingsObject;

  console.log("headerSettingsObject ===>", headerSettingsObject);

  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  headerEl.innerHTML = `
    <button class="button--icon header-main-button" data-main-button data-button-url=${url}>
      <i class="fa-solid fa-${icon} icon--md"></i>
    </button>
    <h3 class="header-title">${title}</h3>
    <div class="header-actions">
      ${actionsArray
        .map((action) => {
          return `
        <button class="header-action button--icon">
          <i class="fa-solid fa-${action.icon} icon--md"></i>
        </button>`;
        })
        .join("")}
    </div>
    `;

  containerEl.appendChild(headerEl);

  headerEl.addEventListener("click", handleHeaderClick);
};

const handleHeaderRenderByUrl = () => {
  switch (window.location.pathname) {
    case "/":
      renderHeader(mainPageSettings);
      break;
    case "/list.html":
      renderHeader(listPageSettings);
  }
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

document.addEventListener("DOMContentLoaded", () => {
  handleHeaderRenderByUrl();
});
