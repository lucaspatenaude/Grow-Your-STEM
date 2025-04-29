require("dotenv").config();
const pgp = require("pg-promise")();

// Database configuration using environment variables
const dbConfig = {
    host: process.env.DB_HOST,
    port: 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

const db = pgp(dbConfig);

// Test database connection
db.connect()
    .then((obj) => {
        console.log(`Database connection successful on port ${process.env.DB_PORT}`);
        obj.done();
    })
    .catch((error) => {
        console.log("ERROR:", error.message || error);
    });

module.exports = db;
