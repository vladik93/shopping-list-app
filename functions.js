import { items } from "./data.js";

console.log("functions.js exported ===>");

/**
 * A function for logging the current time (in milliseconds).
 */
export const getCurrentTime = () => {
  let currentDate = new Date().getMilliseconds();

  return currentDate;
};

export const getLocalUrl = () => {
  let url = `http://localhost:5500`;

  return url;
};

export const navigateToPageWithId = (pageName, id) => {
  const searchParams = new URLSearchParams({ id });
  const queryString = searchParams.toString();
  window.location.href = `${pageName}.html?` + queryString;
};

// CRUD OPERATIONS

// ITEMS

export const addListItem = (title, listId) => {
  console.log("addListItem ===>");
  if (items.some((item) => item.title === title)) return;

  let listItem = {
    id: new Date().getTime(),
    dateCreated: new Date(),
    title,
    quantity: undefined,
    unit: undefined,
    category: "other",
    isDone: false,
    listId: parseInt(listId),
  };

  items.push(listItem);

  localStorage.setItem("ITEMS", JSON.stringify(items));
};
