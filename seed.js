import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

import BookModel from "./src/models/book.js";
import AuthorModel from "./src/models/author.js";
import PublisherModel from "./src/models/publisher.js";
import CategoryModel from "./src/models/category.js";

dotenv.config();

// Defaulting to typical local MongoDB URI if missing
const MONGO_URI = "mongodb+srv://arhamasjid213_db_user:PDi4Zmo7F2jkjekO@chat-app.xxiraqy.mongodb.net/readingsdotcom";

const CATEGORIES_TO_SEED = [
  // All Books / General Top Rows
  { name: "New Releases", code: 301 },
  { name: "Coming Soon (Pre-Order)", code: 304 },

  // Fiction
  { name: "Latest Fiction", code: 401 },
  { name: "Award Winners", code: 402 },
  { name: "Romance", code: 403 },
  { name: "Sci-Fi & Fantasy", code: 404 },
  { name: "Mystery & Thrillers", code: 405 },
  { name: "Historical Fiction", code: 406 },

  // Non-Fiction
  { name: "New Arrivals", code: 501 },
  { name: "Bestsellers", code: 502 },
  { name: "Biography & Memoir", code: 503 },
  { name: "Business & Economics", code: 504 },
  { name: "History", code: 505 },
  { name: "Self-Help", code: 506 },

  // Young Adults
  { name: "YA Fantasy", code: 601 },
  { name: "YA Romance", code: 602 },
  { name: "Coming of Age", code: 603 },

  // Children
  { name: "Ages 0-2 (Toddlers)", code: 701 },
  { name: "Ages 3-5 (Preschool)", code: 702 },
  { name: "Ages 6-8", code: 703 },
  { name: "Ages 9-12", code: 704 },

  // Urdu Books
  { name: "New Urdu Releases", code: 801 },
  { name: "Urdu Fiction", code: 802 },
  { name: "Urdu Poetry", code: 803 },
  { name: "Urdu History", code: 804 },
  { name: "Islamic Books", code: 805 },

  // Our Publications
  { name: "Featured Publications", code: 901 },
  { name: "Bestsellers", code: 902 },
  { name: "Upcoming Releases", code: 903 },

  // High Discounts
  { name: "50% Off", code: 1001 },
  { name: "Clearance Sale", code: 1002 },
  { name: "Bargain Books", code: 1003 },

  // Stationery & Art Supplies
  { name: "Notebooks & Journals", code: 1101 },
  { name: "Pens & Pencils", code: 1102 },
  { name: "Art Material", code: 1103 },
  { name: "Office Supplies", code: 1104 },

  // Toys & Games
  { name: "Educational Toys", code: 1201 },
  { name: "Board Games", code: 1202 },
  { name: "Puzzles", code: 1203 },

  // Send Gift Card
  { name: "Digital Gift Cards", code: 1301 },
  { name: "Physical Gift Cards", code: 1302 },
  { name: "Corporate Gifting", code: 1303 },
];

const FORMATS = ["Audio Book", "Board Book", "Flexi Bind", "Hard Cover", "Paperback"];
const STATUSES = ["In Stock", "Pre-Order", "Out of Stock"];

const getRandomItems = (arr, min, max) => {
  const count = faker.number.int({ min, max });
  return faker.helpers.arrayElements(arr, count);
};

function toTitleCase(str) {
  return str.replace(/\b\w/g, l => l.toUpperCase());
}

async function seedDatabase() {
  try {
    console.log(`⏳ Connecting to MongoDB at ${MONGO_URI}...`);
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected securely.");

    // 1. Clear Existing
    console.log("🧹 Clearing existing collections...");
    await BookModel.deleteMany({});
    await CategoryModel.deleteMany({});
    await AuthorModel.deleteMany({});
    await PublisherModel.deleteMany({});
    console.log("✅ Cleared existing data.");

    // 2. Seed Categories
    console.log("🌱 Seeding Categories...");
    const insertedCategories = await CategoryModel.insertMany(CATEGORIES_TO_SEED);
    console.log(`✅ Seeded ${insertedCategories.length} categories.`);

    // 3. Seed Authors & Publishers
    console.log("🌱 Seeding Authors and Publishers...");
    const authorsToSelect = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      aboutInfo: faker.lorem.paragraph(),
    }));
    const insertedAuthors = await AuthorModel.insertMany(authorsToSelect);

    const publishersToSelect = Array.from({ length: 8 }).map(() => ({
      name: faker.company.name(),
    }));
    const insertedPublishers = await PublisherModel.insertMany(publishersToSelect);
    console.log(`✅ Seeded ${insertedAuthors.length} authors and ${insertedPublishers.length} publishers.`);

    // 4. Seed Books
    console.log("🌱 Seeding random Books...");
    const booksToInsert = [];
    for (let i = 0; i < 100; i++) {
        const listPrice = faker.number.int({ min: 500, max: 5000 });
        const discount = faker.helpers.arrayElement([0, 10, 20, 50]);
        const ourPrice = listPrice;
        const youSave = (ourPrice * discount) / 100;
        const ourPriceAfterDiscount = ourPrice - youSave;

        // Ensure we fetch IDs of generated categories/authors/publishers
        const bookCategories = getRandomItems(insertedCategories, 1, 3).map(c => c._id);
        const bookAuthors = getRandomItems(insertedAuthors, 1, 2).map(a => a._id);
        const bookPublisher = faker.helpers.arrayElement(insertedPublishers)._id;

        booksToInsert.push({
            title: toTitleCase(faker.lorem.words({ min: 2, max: 6 })),
            imageUrl: faker.image.url({ width: 400, height: 600 }),
            description: faker.lorem.paragraphs(2),
            ISBN: faker.string.numeric(13),
            pagesCount: faker.number.int({ min: 50, max: 1000 }),
            shippingWeight: faker.number.float({ min: 0.1, max: 2, fractionDigits: 2 }),
            dimensions: `${faker.number.float({min: 4, max: 10, fractionDigits: 1})} x ${faker.number.float({min: 6, max: 12, fractionDigits: 1})} inches`,
            listPrice: listPrice,
            listPriceCurrency: "PKR",
            ourPrice: ourPrice,
            discount: discount,
            ourPriceAfterDiscount: ourPriceAfterDiscount,
            youSave: youSave,
            format: faker.helpers.arrayElement(FORMATS),
            publicationYear: faker.number.int({ min: 1980, max: 2024 }),
            status: faker.helpers.arrayElement(STATUSES),
            statusMessage: faker.helpers.arrayElement(["Available now", "Ships tomorrow", "Limited stock"]),
            inStock: faker.number.int({ min: 0, max: 50 }),
            language: faker.helpers.arrayElement(["English", "Urdu"]),
            
            // Relational fields
            publisher: bookPublisher,
            authors: bookAuthors,
            categories: bookCategories,
            subCategories: [],
            additionalCategories: []
        });
    }

    const insertedBooks = await BookModel.insertMany(booksToInsert);
    console.log(`✅ Seeded ${insertedBooks.length} random books successfully!`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB. Seeding Complete.");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
