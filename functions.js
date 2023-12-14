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

export const navigateToPageWithId = (pageName, id) => {
  const searchParams = new URLSearchParams({ id });
  const queryString = searchParams.toString();
  window.location.href = `${pageName}.html?` + queryString;
};
