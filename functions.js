import { items } from "./data.js";

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

export const addListItem = (title, listid) => {
  if (currentList) {
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

    let newList = lists.map((list) => {
      if (list.id === listid) {
        return { ...list, listItems: [...list.listItems, listItem] };
      } else {
        return list;
      }
    });
    localStorage.setItem("LISTS", JSON.stringify(newList));
    getListById(listid);
  }
};
