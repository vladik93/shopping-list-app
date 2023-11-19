const mainEl = document.getElementById("main");

const lists = [];

const generateLists = () => {
  mainEl.innerHTML = "";

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
      </div>
     
    `;
    mainEl.appendChild(mainNoListsEl);
  } else {
    const mainListsEl = document.createElement("div");
    mainListsEl.classList.add("main-lists");

    mainListsEl.innerHTML += lists
      .map(
        (list) => `
      <div class="list-item" id=${list.id}>
        <button class="list-item-actions button--icon">
          <i class="fa-solid fa-ellipsis-vertical icon-md"></i>
        </button>
        <h3>${list.title}</h3>
        <div class="main-progress">
          <div class="main-progress-bar">
            <span class="progress-bar-filled"></span>
          </div>
          <span class="main-progress-count">0/0</span>
        </div>
      </div>
    `
      )
      .join("");

    mainEl.appendChild(mainListsEl);
  }

  mainEl.innerHTML += `<button class="button button--primary main-button">
  <i class="fa-solid fa-plus icon"></i>
  <span>New List</span>
</button>`;
};

const addList = () => {
  const list = {
    id: new Date().getTime(),
    title: "New Added List",
  };

  lists.push(list);

  generateLists();
};

generateLists();
