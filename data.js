console.log("data.js ===>");

if (localStorage.getItem("LISTS") !== null) {
  console.log("list storage found!!!");
}

export const host = 5500;

export let lists = JSON.parse(localStorage.getItem("LISTS")) || [];

export let items = JSON.parse(localStorage.getItem("ITEMS")) || [];

export let collection = JSON.parse(localStorage.getItem("COLLECTION")) || [];

export const suggestions = [
  "shopping",
  "groceries",
  "trip",
  "pharmacy",
  "food",
  "supermarket",
];

export const icons = [
  "fish",
  "cheese",
  "carrot",
  "pizza-slice",
  "cookie",
  "bowl-food",
  "burger",
  "egg",
  "ice-cream",
  "martini-glass-citrus",
];

const addToCollection = (title) => {
  let item = {
    id: new Date().getTime(),
    title,
    dateAdded: new Date(),
  };

  if (collection.some((item) => item.title === title)) return;
  collection.push(item);
  localStorage.setItem("COLLECTION", JSON.stringify(collection));
};

// const updateIsRecent = () => {
//   console.log("updateIsRecent ====>", new Date());

//   let currentDate = new Date();
//   let futureDate = new Date(currentDate);

//   futureDate.setDate(futureDate.getDate() + 2);

//   let newCollection = collection.map((item) => {
//     if (new Date(item.dateAdded).getTime() < futureDate.getTime()) {
//       console.log("itemDate < futureDate ===>");
//       console.log("futureDate ===>", futureDate);
//       console.log("itemDate ====>", item.dateAdded);
//       return { ...item, isRecent: true };
//     }
//     return { ...item, isRecent: false };
//   });

//   localStorage.setItem("COLLECTION", JSON.stringify(newCollection));
// };

// updateIsRecent();

const setIsRecent = (daysTilExpire = 3) => {
  // console.log("updateIsRecent ===>");
  // collection.map((item) => {
  //   const dateAdded = item.dateAdded.getTime();
  //   const untilDate =
  //     item.dateAdded.getTime() + daysTilExpire * 24 * 60 * 60 * 1000;
  //   console.log("item Name ===>", item.item);
  //   console.log("dateAdded ===>", dateAdded);
  //   console.log("untilDate ===>", untilDate);
  // });
};

document.addEventListener("DOMContentLoaded", setIsRecent(3));
