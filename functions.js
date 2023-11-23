export const includeHeader = (containerEl) => {
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");
  console.log(window.location);

  switch (window.location.pathname) {
    case "/":
      console.log("HOME PAGE");
      break;
    case "/newlist.html":
      console.log("NEW LIST PAGE");
  }

  const headerSidenavBtn = document.createElement("button");
  headerSidenavBtn.classList.add("button--icon", "header-sidenav-button");
  headerEl.appendChild(headerSidenavBtn);

  const headerSidenavIcon = document.createElement("i");
  headerSidenavIcon.classList.add("fa-solid", "fa-bars", "icon-md");
  headerSidenavBtn.appendChild(headerSidenavIcon);

  const headerTitleEl = document.createElement("h3");
  headerTitleEl.classList.add("header-title");
  headerTitleEl.innerText = "My Lists";
  headerEl.appendChild(headerTitleEl);

  document.body.appendChild(headerEl);

  headerSidenavBtn.addEventListener("click", handleHeaderNavigationClick);
};

const handleHeaderNavigationClick = () => {
  window.location.href = "/";
  sessionStorage.clear();
};
