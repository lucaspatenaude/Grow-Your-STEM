const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch tasks for the logged-in user
const fetchTasks = async (req, res, next) => {
    if (req.session.user) {
        try {
            // Fetch article tasks
            const articleTasks = await db.query(
                'SELECT ArticleID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM articleTasks WHERE UserID = $1 ORDER BY ArticleID',
                [req.session.user.userid]
            );

            // Fetch lesson tasks
            const lessonTasks = await db.query(
                'SELECT LessonID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM lessonTasks WHERE UserID = $1 ORDER BY LessonID',
                [req.session.user.userid]
            );

            // Fetch game tasks
            const gameTasks = await db.query(
                'SELECT GameID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM gameTasks WHERE UserID = $1 ORDER BY GameID',
                [req.session.user.userid]
            );

            // Attach the fetched tasks to `res.locals`
            res.locals.articleTasks = articleTasks;
            res.locals.lessonTasks = lessonTasks;
            res.locals.gameTasks = gameTasks;

            console.log('Fetched tasks:', { articleTasks, lessonTasks, gameTasks });
        } catch (error) {
            console.error('Error fetching tasks:', error.message || error);
            res.locals.articleTasks = [];
            res.locals.lessonTasks = [];
            res.locals.gameTasks = [];
        }
    } else {
        res.locals.articleTasks = [];
        res.locals.lessonTasks = [];
        res.locals.gameTasks = [];
    }
    next();
};

module.exports = fetchTasks;