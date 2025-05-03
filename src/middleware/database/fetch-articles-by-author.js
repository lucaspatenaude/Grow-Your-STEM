const db = require('../../../database/setup'); // Import the database connection

const fetchArticlesByAuthor = async (req, res, next) => {
    try {
        const authorMap = {
            lucas: 1,
            nathaniel: 2, // Map author names to their IDs
            clay: 3,
        };

        const authorID = authorMap[req.params.author.toLowerCase()];
        if (!authorID) {
            return res.status(404).send("Author not found");
        }

        // Fetch articles for the given authorID
        const articles = await db.query(
            `SELECT a.ArticleID, a.Title, a.Summary, a.Link, a.ImagePath, a.ImageAlt
            FROM articles a
            WHERE a.AuthorID = $1
            ORDER BY a.ArticleID`,
            [authorID]
        );

        // Fetch the author's name
        const authorResult = await db.query(
            `SELECT Name FROM authors WHERE AuthorID = $1`,
            [authorID]
        );

        const authorName = authorResult.rows[0]?.Name || "Unknown Author";

        // Attach articles and authorName to `res.locals`
        res.locals.articles = articles.rows;
        res.locals.authorName = authorName;
        next();
    } catch (error) {
        console.error("Error fetching articles by author:", error.message || error);
        res.locals.articles = [];
        res.locals.authorName = "Unknown Author";
        next();
    }
};

module.exports = fetchArticlesByAuthor;