const db = require('../../../database/setup'); // Import the database connection

// Middleware to fetch tasks for the logged-in user
const fetchTasks = async (req, res, next) => {
    if (req.session.user) {
        try {
            const tasks = await db.query(
                'SELECT TaskID, TaskName AS taskname, Points, IsCompleted FROM tasks WHERE UserID = $1 ORDER BY TaskID',
                [req.session.user.userid]
            );
            console.log('Fetched tasks:', tasks); // This will now log correctly
            res.locals.tasks = tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error.message || error);
            res.locals.tasks = [];
        }
    } else {
        res.locals.tasks = [];
    }
    next();
};

module.exports = fetchTasks;