const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch basics for all pages
const fetchTopics = async (req, res, next) => {
    try {
        // Fetch basics from the database
        const topics = await db.query(
            `SELECT TopicID, Title, Summary, Link, ButtonText
            FROM topics
            ORDER BY TopicID`
        );

        // Attach the fetched basics to `res.locals`
        res.locals.topics = topics;

    } catch (error) {
        console.error('Error fetching topics:', error.message || error);
        res.locals.topics = [];
    }
    next();
};

module.exports = fetchTopics;