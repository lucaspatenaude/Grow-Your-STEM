const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch tasks for the logged-in user
const fetchTasks = async (req, res, next) => {
    if (req.session.user) {
        try {
            // Fetch article tasks
            const articleTasks = await db.query(
                'SELECT ArticleTaskID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM articleTasks WHERE UserID = $1 ORDER BY ArticleTaskID',
                [req.session.user.userid]
            );

            // Fetch basics tasks
            const basicsTasks = await db.query(
                'SELECT BasicTaskID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM basicsTasks WHERE UserID = $1 ORDER BY BasicTaskID',
                [req.session.user.userid]
            );

            // Fetch lesson tasks
            const topicTasks = await db.query(
                'SELECT TopicTaskID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM topicTasks WHERE UserID = $1 ORDER BY TopicTaskID',
                [req.session.user.userid]
            );

            // Fetch game tasks
            const gameTasks = await db.query(
                'SELECT GameTaskID AS taskid, TaskName AS taskname, Points, IsCompleted, Location FROM gameTasks WHERE UserID = $1 ORDER BY GameTaskID',
                [req.session.user.userid]
            );

            // Attach the fetched tasks to `res.locals`
            res.locals.articleTasks = articleTasks;
            res.locals.basicsTasks = basicsTasks; // Add basics tasks to res.locals
            res.locals.topicTasks = topicTasks;
            res.locals.gameTasks = gameTasks;

        } catch (error) {
            console.error('Error fetching tasks:', error.message || error);
            res.locals.articleTasks = [];
            res.locals.basicsTasks = []; // Default to an empty array if an error occurs
            res.locals.topicTasks = [];
            res.locals.gameTasks = [];
        }
    } else {
        res.locals.articleTasks = [];
        res.locals.basicsTasks = []; // Default to an empty array if the user is not logged in
        res.locals.topicTasks = [];
        res.locals.gameTasks = [];
    }
    next();
};

module.exports = fetchTasks;