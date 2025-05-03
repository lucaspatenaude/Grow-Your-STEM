const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch tasks for the logged-in user
const fetchTasks = async (req, res, next) => {
    if (req.session.user) {
        try {
            // Fetch article task
            const articleTasks = await db.query(
                'SELECT ArticleTaskID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM articleTasks WHERE UserID = $1 ORDER BY ArticleTaskID',
                [req.session.user.userid]
            );

            // Fetch lesson task
            const lessonTasks = await db.query(
                'SELECT LessonTaskID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM lessonTasks WHERE UserID = $1 ORDER BY LessonTaskID',
                [req.session.user.userid]
            );

            // Fetch game tasks
            const gameTasks = await db.query(
                'SELECT GameTaskID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM gameTasks WHERE UserID = $1 ORDER BY GameTaskID',
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