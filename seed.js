// scripts/seedBooks.js
import mongoose from "mongoose";
import BookModel from "./src/models/book.js";

const MONGO_URI = "mongodb://localhost:27017/ReadingsDotCom";

// Provided IDs
const authorIds = [
  "691322b444dbc65c0c5b9e38",
  "691322b444dbc65c0c5b9e3a",
  "691322b444dbc65c0c5b9e3e",
];
const publisherIds = [
  "691322fb949cff4508818540",
  "691322fb949cff4508818541",
  "691322fb949cff4508818542",
];
const categoryIds = [
  "691321a001a5ded69a78e37a",
  "691321a001a5ded69a78e37b",
  "691321a001a5ded69a78e37c",
  "691321a001a5ded69a78e37d",
  "691321a001a5ded69a78e37e",
  "691321a001a5ded69a78e37f",
];

// Helpers
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomItems = (arr, count = 1) =>
  arr.sort(() => 0.5 - Math.random()).slice(0, count);
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, decimals = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const FORMATS = ["Audio Book", "Board Book", "Flexi Bind", "Hard Cover", "Paperback"];
const LANGUAGES = ["English"];
const STATUS = ["In Stock", "Pre-Order", "Out of Stock"];

// Generate 50 books for each category
const generateBooksForCategory = (categoryId, count = 50) => {
  const books = [];

  for (let i = 1; i <= count; i++) {
    const listPrice = randomInt(500, 2500);
    const discount = [0, 5, 10, 15, 20][Math.floor(Math.random() * 5)];
    const ourPrice = listPrice;
    const youSave = (ourPrice * discount) / 100;
    const ourPriceAfterDiscount = ourPrice - youSave;

    books.push({
      title: `Category-${categoryId}-Book-${i}`,
      imageUrl: `https://picsum.photos/seed/${categoryId}-${i}/400/600`,
      description: `Random description for category ${categoryId}, book ${i}.`,
      ISBN: `ISBN-${categoryId}-${i}`,
      pagesCount: randomInt(100, 600),
      shippingWeight: randomFloat(0.3, 1.5),
      dimensions: `${randomInt(5, 7)} x ${randomInt(8, 10)} inches`,
      listPrice,
      listPriceCurrency: "Rs.",
      ourPrice,
      discount,
      ourPriceAfterDiscount,
      youSave,
      format: getRandomItem(FORMATS),
      publicationYear: randomInt(1990, 2024),
      publisher: getRandomItem(publisherIds),
      authors: getRandomItems(authorIds, randomInt(1, 2)),
      categories: [categoryId],
      subCategories: [],
      additionalCategories: [],
      status: getRandomItem(STATUS),
      statusMessage: "Available",

      // ⭐ NEW ATTRIBUTE ADDED HERE
      inStock: randomInt(0, 5),

      language: getRandomItem(LANGUAGES),
    });
  }

  return books;
};

async function seedBooks() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await BookModel.deleteMany({});
    console.log("🧹 Cleared existing books");

    let allBooks = [];

    for (const categoryId of categoryIds) {
      const books = generateBooksForCategory(categoryId, 50);
      allBooks = allBooks.concat(books);
    }

    await BookModel.insertMany(allBooks);

    console.log(`📚 Successfully seeded ${allBooks.length} books!`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error seeding books:", err);
    await mongoose.disconnect();
  }
}

seedBooks();
