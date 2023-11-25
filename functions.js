/**
 * A function for logging the current time (in milliseconds).
 */
export const getCurrentTime = () => {
  let currentDate = new Date().getMilliseconds();

  return currentDate;
};
