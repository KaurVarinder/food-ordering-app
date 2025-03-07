require("dotenv").config(); // Load .env variables
const mongoose = require("mongoose");

// Debugging: Check if MONGO_URI is loaded
if (!process.env.MONGODB_URI) {
    console.error("❌ MONGO_URI is undefined. Check your .env file.");
    process.exit(1); // Exit if no MongoDB URI is found
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Handle connection
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
