const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch articles for the logged-in user
const fetchArticles = async (req, res, next) => {
    if (req.session.user) {
        try {
            // Fetch articles for the logged-in user
            const articles = await db.query(
                `SELECT a.ArticleID, a.Title, a.Summary, a.Link, a.ImagePath, a.ImageAlt, au.Name AS Author
                 FROM articles a
                 INNER JOIN authors au ON a.AuthorID = au.AuthorID
                 ORDER BY a.ArticleID`
            );

            // Attach the fetched articles to `res.locals`
            res.locals.articles = articles;

            console.log('Fetched articles:', articles);
        } catch (error) {
            console.error('Error fetching articles:', error.message || error);
            res.locals.articles = [];
        }
    } else {
        res.locals.articles = [];
    }
    next();
};

module.exports = fetchArticles;