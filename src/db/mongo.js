import mongoose from "mongoose";
import { MONGO_URI } from "../config/env";
import logger from "../logger";

export const connectToMongo = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        logger.info("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        logger.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure
    }
}