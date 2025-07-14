const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
require("dotenv").config();

async function main() {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("✅ Connected to MongoDB");

    await initDB();
    console.log("✅ Data was initialized");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error connecting or initializing DB:", err);
    process.exit(1);
  }
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "665c42af5343547912347c6d", // Replace with a real ObjectId from your users collection
    }));
    await Listing.insertMany(initData.data);
  } catch (err) {
    console.error("❌ Error while seeding data:", err);
  }
};

main();
