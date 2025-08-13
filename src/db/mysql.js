import { Sequelize } from "sequelize";

import {
    MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB,
} from "../config/env.js";
import logger from "../logger/index.js";

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASSWORD, {
    host: MYSQL_HOST,
    dialect: "mysql",
    logging: (msg) => logger.debug(msg), // Use logger for SQL queries in debug
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});


const connectToMySQL = async () => {
    try {
        await sequelize.authenticate();
        logger.info("Connected to MySQL successfully");
    } catch (error) {
        logger.error("Error connecting to MySQL:", error.message);
        process.exit(1); // Exit the process with failure
    }
}

export { sequelize, connectToMySQL };