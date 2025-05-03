const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch articles for all pages
const fetchArticles = async (req, res, next) => {
    try {
        // Fetch articles from the database
        const articles = await db.query(
            `SELECT a.ArticleID, a.Title, a.Summary, a.Link, a.ImagePath, a.ImageAlt, au.Name AS Author
            FROM articles a
            INNER JOIN authors au ON a.AuthorID = au.AuthorID
            ORDER BY a.ArticleID`
        );

        // Attach the fetched articles to `res.locals`
        res.locals.articles = articles;

    } catch (error) {
        console.error('Error fetching articles:', error.message || error);
        res.locals.articles = [];
    }
    next();
};

module.exports = fetchArticles;
