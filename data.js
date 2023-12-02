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
  { id: 0, item: "turkey" },
  { id: 1, item: "bread" },
  { id: 2, item: "cheese" },
  { id: 4, item: "chicken" },
  { id: 5, item: "blouse" },
  { id: 6, item: "butter" },
  { id: 7, item: "potatoes" },
  { id: 8, item: "eggs" },
  { id: 9, item: "toothpaste" },
  { id: 10, item: "deodorant" },
];
