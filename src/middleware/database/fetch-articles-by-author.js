const db = require('../../../database/setup'); // Import the database connection

const fetchArticlesByAuthor = async (req, res, next) => {
    try {
        console.log("Starting fetchArticlesByAuthor middleware...");

        const authorMap = {
            lucas: 1,
            nathaniel: 2,
            clay: 3,
        };

        const authorParam = req.params.author.toLowerCase();
        console.log(`Author parameter received: ${authorParam}`);

        const authorID = authorMap[authorParam];
        console.log(`Resolved author ID: ${authorID}`);

        if (!authorID) {
            console.warn(`Author not found for parameter: ${authorParam}`);
            res.locals.articles = [];
            res.locals.authorName = "Unknown Author";
            return next();
        }

        // Fetch articles for the given authorID
        console.log(`Fetching articles for author ID: ${authorID}`);
        const articlesQuery = await db.query(
            `SELECT articleid, title, summary, link, imagepath, imagealt
            FROM articles
            WHERE authorid = $1
            ORDER BY articleid`,
            [authorID]
        );
        console.log(`Articles query result:`, articlesQuery.rows);

        // Fetch the author's name
        console.log(`Fetching author name for author ID: ${authorID}`);
        const authorQuery = await db.query(
            `SELECT name FROM authors WHERE authorid = $1`,
            [authorID]
        );
        console.log(`Author query result:`, authorQuery.rows);

        // Attach the fetched data to `res.locals`
        res.locals.articles = articlesQuery.rows || [];
        res.locals.authorName = authorQuery.rows?.length > 0 ? authorQuery.rows[0].name : "Unknown Author";
        console.log(`Resolved author name: ${res.locals.authorName}`);
        console.log(`Resolved articles:`, res.locals.articles);

    } catch (error) {
        console.error("Error fetching articles by author:", error.message || error);
        res.locals.articles = [];
        res.locals.authorName = "Unknown Author";
    }

    console.log("fetchArticlesByAuthor middleware completed.");
    next();
};

module.exports = fetchArticlesByAuthor;