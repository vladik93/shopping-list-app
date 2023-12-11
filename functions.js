import { host } from "./data.js";

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

/**
 * Navigate to provided page by name.
 * @param {string} pageName - The name of the page file (w/o extension) where to navigate
 * @returns Server URL + /pageName.html (if name provided - otherwise returns '/').
 */
export const navigateToPage = (pageName) => {
  console.log("navigateToPage ====>");
  let localUrl = getLocalUrl();

  let url = pageName !== undefined ? `${localUrl}/${pageName}.html` : localUrl;

  window.location.href = url;
};

export const navigateToPageWithId = (url, id) => {
  const searchParams = new URLSearchParams({ id });
  const queryString = searchParams.toString();
  window.location.href = `http://localhost:${host}/${url}.html?` + queryString;
};
