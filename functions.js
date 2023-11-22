export const includeHeader = (containerEl) => {
  const headerEl = document.createElement("header");
  headerEl.classList.add("header");

  headerEl.innerHTML = `<button class="button--icon header-sidenav-button">
  <i class="fa-solid fa-bars icon-md"></i>
</button>
<h3 class="header-title">My Lists</h3>`;

  document.body.appendChild(headerEl);
};
