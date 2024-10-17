import mongoose from "mongoose";

/**
 * Connects to MongoDB using the provided URI.
 * @param {string} uri - MongoDB connection string.
 * @returns {Promise<void>} - Resolves if connected, logs error otherwise.
 */
const connectMongoDb = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Optional: Exit process on connection failure
    }
};

export { connectMongoDb };
