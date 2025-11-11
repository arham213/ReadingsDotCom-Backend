// scripts/seedBooks.js
import mongoose from "mongoose";
import BookModel from "./src/models/book.js"; // adjust path if needed

const MONGO_URI = "mongodb://localhost:27017/ReadingsDotCom"; // change to your DB name

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
  "691321a001a5ded69a78e388",
  "691321a001a5ded69a78e387",
];

// Utility helpers
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomItems = (arr, count = 1) =>
  arr.sort(() => 0.5 - Math.random()).slice(0, count);
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomFloat = (min, max, decimals = 2) =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

const FORMATS = ["Audio Book", "Board Book", "Flexi Bind", "Hard Cover", "Paperback"];
const LANGUAGES = ["English"];
const STATUS = ["In Stock", "Pre-Order", "Out of Stock"];

// Generate 50 random books
const generateBooks = (count = 50) => {
  const books = [];

  for (let i = 1; i <= count; i++) {
    const listPrice = randomInt(500, 2500);
    const discount = [0, 5, 10, 15, 20][Math.floor(Math.random() * 5)];
    const ourPrice = listPrice;
    const youSave = (ourPrice * discount) / 100;
    const ourPriceAfterDiscount = ourPrice - youSave;

    books.push({
      title: `Book Title ${i}`,
      imageUrl: `https://picsum.photos/seed/book${i}/400/600`,
      description: `This is a random description for book ${i}. A thrilling story full of mystery and adventure.`,
      ISBN: `ISBN-${1000000000000 + i}`,
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
      categories: getRandomItems(categoryIds, randomInt(1, 2)),
      subCategories: getRandomItems(categoryIds, 1),
      additionalCategories: getRandomItems(categoryIds, 1),
      status: getRandomItem(STATUS),
      statusMessage: "Available for immediate delivery",
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
    console.log("🧹 Existing books cleared");

    const books = generateBooks(50);
    await BookModel.insertMany(books);

    console.log(`📚 Successfully seeded ${books.length} books!`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (err) {
    console.error("❌ Error seeding books:", err);
    await mongoose.disconnect();
  }
}

seedBooks();