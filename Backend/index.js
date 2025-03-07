const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Razorpay instance
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

// Export instance for use in controllers
module.exports = instance;

const db = require("./db"); // MongoDB connection
const productRouter = require("./routes/productRouter");
const paymentRouter = require("./routes/paymentRouter");
const userRouter = require("./routes/userRouter");

const app = express();

// Enable CORS
var corsOptions = {
    origin: "https://food-ordering-app-frontend-61bn.onrender.com",
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check database connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Root API endpoint
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Food Ordering App" });
});

// API routes
app.use("/api", productRouter);
app.use("/api", paymentRouter);
app.use("/api", userRouter);


// getting key 

app.get("/api/getkey", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

// Start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

