import mongoose from "mongoose";
import { MONGO_URI } from "../../src/config/env.js";
import logger from "../logger/index.js";

export const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        logger.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
}