const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in backend/.env");
        }

        if (process.env.MONGODB_DNS_SERVER) {
            dns.setServers([process.env.MONGODB_DNS_SERVER]);
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;