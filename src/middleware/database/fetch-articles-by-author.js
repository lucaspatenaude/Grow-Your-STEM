const db = require('../../../database/setup'); // Import the database connection
const { locals } = require('../../app');

const fetchArticlesByAuthor = async (req, res, next) => {
    try {
        
        const authorMap = {
            lucas: 1,
            nathaniel: 2,
            clay: 3,
        };

        const authorParam = req.params.author.toLowerCase();
        const authorID = authorMap[authorParam];

        // Fetch articles for the given authorID
        console.log(`Fetching articles for author ID: ${authorID}`);
        const articles = await db.query(
            `SELECT articleid, title, summary, link, imagepath, imagealt
            FROM articles
            WHERE authorid = $1
            ORDER BY articleid`,
            [authorID]
        );

        // Fetch the author's name
        console.log(`Fetching author name for author ID: ${authorID}`);
        const author = await db.query(
            `SELECT authorname FROM authors WHERE authorid = $1`,
            [authorID]
        );

        // Attach the fetched data to `res.locals`
        res.locals.articles = articles;
        res.locals.authorName = author[0].authorname;
        res.locals.authorRoute = authorParam;

    } catch (error) {
        console.error("Error fetching articles by author:", error.message || error);
        res.locals.articles = [];
        res.locals.authorName = "Unknown Author";
    }

    next();
};

module.exports = fetchArticlesByAuthor;