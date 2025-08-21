import app from "./src/app";
import { PORT } from "./src/config/env.js";
import { connectToMongo } from "./src/db/mongo.js";
import logger from "./src/logger/index.js";



const startServer = async () => {

    // Connect to MongoDB
    await connectToMongo();

    // Start the Express server
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });

}

startServer().catch((error) => {
    logger.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process with failure
});