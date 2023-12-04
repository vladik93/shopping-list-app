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

let collectionArr = [
  {
    id: 0,
    item: "turkey",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date(),
  },
  {
    id: 1,
    item: "bread",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date(),
  },
  {
    id: 2,
    item: "cheese",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date(),
  },
  {
    id: 4,
    item: "chicken",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date("2015-03-25"),
  },
  {
    id: 5,
    item: "blouse",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date("2015-03-25"),
  },
  {
    id: 6,
    item: "butter",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date("2023-12-04"),
  },
  {
    id: 7,
    item: "potatoes",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date("2015-03-25"),
  },
  {
    id: 8,
    item: "eggs",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date("2015-03-25"),
  },
  {
    id: 9,
    item: "toothpaste",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date("2015-03-25"),
  },
  {
    id: 10,
    item: "deodorant",
    isPopular: true,
    isRecent: false,
    dateAdded: new Date("2015-03-25"),
  },
];

export let collection =
  JSON.parse(localStorage.getItem("COLLECTION")) || collectionArr;

const updateIsRecent = () => {
  console.log("updateIsRecent ====>", new Date());

  let currentDate = new Date();
  let futureDate = new Date(currentDate);

  futureDate.setDate(futureDate.getDate() + 2);

  console.log("collection ===>", collection);
  let newCollection = collection.map((item) => {
    if (new Date(item.dateAdded).getTime() < futureDate.getTime()) {
      return { ...item, isRecent: true };
    }
    return { ...item, isRecent: false };
  });

  localStorage.setItem("COLLECTION", JSON.stringify(newCollection));
};

updateIsRecent();
