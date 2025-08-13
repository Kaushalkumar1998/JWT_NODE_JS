import app from "./src/app";
import { PORT } from "./src/config/env.js";
import { connectToMongo } from "./src/db/mongo.js";
import { connectToMySQL, sequelize } from "./src/db/mysql.js";
import logger from "./src/logger/index.js";
import UserMySQL from "./src/models/user.mysql.js";
import logger from "./src/logger/index.js";


const startServer = async () => {

    // Connect to MongoDB
    await connectToMongo();

    // Connect to MySQL
    await connectToMySQL();

    // Sync MySQL models
    await sequelize.sync();
    logger.info("MySQL models synced successfully");

    // Start the Express server
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });

}

startServer().catch((error) => {
    logger.error("Error starting the server:", error.message);
    process.exit(1); // Exit the process with failure
});