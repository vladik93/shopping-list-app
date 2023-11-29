export let lists = JSON.parse(localStorage.getItem("LISTS")) || [];

export let items = JSON.parse(localStorage.getItem("ITEMS")) || [];

export const suggestions = [
  "shopping",
  "groceries",
  "trip",
  "pharmacy",
  "food",
  "supermarket",
];

export const icons = ["fish", "cheese", "carrot", "pizza-slice", "cookie"];

export const popularItems = [
  "turkey",
  "bread",
  "cheese",
  "chicken",
  "blouse",
  "butter",
  "potatoes",
  "eggs",
  "toothpaste",
  "deodorant",
];
