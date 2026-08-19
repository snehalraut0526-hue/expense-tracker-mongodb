const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});

app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});