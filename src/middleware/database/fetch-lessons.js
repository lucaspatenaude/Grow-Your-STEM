const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch basics for all pages
const fetchBasics = async (req, res, next) => {
    try {
        // Fetch basics from the database
        const basics = await db.query(
            `SELECT BasicID, Title, Summary, Link, ImagePath, ImageAlt
            FROM basics
            ORDER BY BasicID`
        );

        // Attach the fetched basics to `res.locals`
        res.locals.basics = basics;

    } catch (error) {
        console.error('Error fetching basics:', error.message || error);
        res.locals.basics = [];
    }
    next();
};

module.exports = fetchBasics;