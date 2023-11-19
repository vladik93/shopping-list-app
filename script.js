const mainEl = document.getElementById("main");

const lists = [];

const generateLists = () => {
  if (!lists.length) {
    const mainNoListsEl = document.createElement("div");
    mainNoListsEl.classList.add("main-no-lists");

    mainNoListsEl.innerHTML = `
      <div class="main-wrapper">
        <i class="fa-solid fa-clipboard-list icon--lg main-icon"></i>
        <p class="primary-text main-title">Let's plan your shopping</p>
        <p class="secondary-text">
          Tap the plus button to create your first list
        </p>
        <button class="button button--primary main-button">
        <i class="fa-solid fa-plus icon"></i>
        <span>New List</span>
      </button>
      </div>
     
    `;

    mainEl.appendChild(mainNoListsEl);
  }
};

// generateLists();
