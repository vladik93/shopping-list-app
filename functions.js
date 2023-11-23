const handleHeaderNavigationClick = () => {
  window.location.href = "/";
  sessionStorage.clear();
};

const renderFullHeader = (title) => {
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  const headerSidenavBtn = document.createElement("button");
  headerSidenavBtn.classList.add("button--icon", "header-sidenav-button");
  headerEl.appendChild(headerSidenavBtn);

  const headerSidenavIcon = document.createElement("i");
  headerSidenavIcon.classList.add("fa-solid", "fa-bars", "icon-md");
  headerSidenavBtn.appendChild(headerSidenavIcon);

  const headerTitleEl = document.createElement("h3");
  headerTitleEl.classList.add("header-title");
  headerTitleEl.innerText = title;
  headerEl.appendChild(headerTitleEl);

  document.body.appendChild(headerEl);

  headerSidenavBtn.addEventListener("click", handleHeaderNavigationClick);
};

const renderBackButtonHeader = () => {
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  const headerSidenavBtn = document.createElement("button");
  headerSidenavBtn.classList.add("button--icon", "header-sidenav-button");
  headerEl.appendChild(headerSidenavBtn);

  const headerSidenavIcon = document.createElement("i");
  headerSidenavIcon.classList.add("fa-solid", "fa-arrow-left", "icon--md");
  headerSidenavBtn.appendChild(headerSidenavIcon);

  headerSidenavBtn.addEventListener("click", handleHeaderNavigationClick);

  headerEl.appendChild(headerSidenavBtn);

  document.body.appendChild(headerEl);
};

export const includeHeader = (containerEl) => {
  console.log(window.location);

  switch (window.location.pathname) {
    case "/":
      renderFullHeader("Add List");
      break;
    case "/newlist.html":
      renderBackButtonHeader();
  }
};
