const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch tasks for the logged-in user
const fetchTasks = async (req, res, next) => {
    if (req.session.user) {
        try {
            // Fetch articles
            const articles = await db.query(
                'SELECT ArticleID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM articles WHERE UserID = $1 ORDER BY ArticleID',
                [req.session.user.userid]
            );

            // Fetch lessons
            const lessons = await db.query(
                'SELECT LessonID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM lessons WHERE UserID = $1 ORDER BY LessonID',
                [req.session.user.userid]
            );

            // Fetch games
            const games = await db.query(
                'SELECT GameID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM games WHERE UserID = $1 ORDER BY GameID',
                [req.session.user.userid]
            );

            // Attach the fetched tasks to `res.locals`
            res.locals.articles = articles;
            res.locals.lessons = lessons;
            res.locals.games = games;

            console.log('Fetched tasks:', { articles, lessons, games });
        } catch (error) {
            console.error('Error fetching tasks:', error.message || error);
            res.locals.articles = [];
            res.locals.lessons = [];
            res.locals.games = [];
        }
    } else {
        res.locals.articles = [];
        res.locals.lessons = [];
        res.locals.games = [];
    }
    next();
};

module.exports = fetchTasks;