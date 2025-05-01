const express = require('express');
const router = express.Router();
const db = require('../../database/setup'); // Assuming you have a database connection module

// Middleware to set user tasks in res.locals
router.use(async (req, res, next) => {
    if (req.session.user) {
        try {
            const tasks = await db.query(
                'SELECT TaskID, TaskName, Points, IsCompleted FROM tasks WHERE UserID = $1 ORDER BY TaskID',
                [req.session.user.userid]
            );
            console.log('Fetched tasks:', tasks);
            res.locals.tasks = tasks;
        } catch (error) {
            console.error('Error fetching tasks:', error.message || error);
            res.locals.tasks = [];
        }
    } else {
        res.locals.tasks = [];
    }
    next();
});

// Mark task as completed and update user score
router.post('/complete-task', async (req, res) => {
    const { userId, taskId } = req.body;

    console.log("User ID:", userId);
    console.log("Task ID:", taskId);

    try {
        // Fetch the task from the database
        const task = await db.query(
            'SELECT TaskID, Points, IsCompleted FROM tasks WHERE UserID = $1 AND TaskID = $2',
            [userId, taskId]
        );

        if (!task || task.length === 0) { // Handle undefined or empty array
            console.error('Task not found for UserID:', userId, 'TaskID:', taskId);
            return res.status(404).json({ error: 'Task not found' });
        }

        const { Points, IsCompleted } = task[0]; // Access the first row of the result

        if (IsCompleted) {
            return res.status(400).json({ error: 'Task already completed' });
        }

        // Mark the task as completed
        await db.query('UPDATE tasks SET IsCompleted = TRUE WHERE TaskID = $1', [taskId]);

        // Update the user's score
        await db.query('UPDATE users SET Score = Score + $1 WHERE UserID = $2', [Points, userId]);

        res.redirect('/'); // Redirect to the account screen
    } catch (error) {
        console.error('Error in /complete-task route:', error.message || error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;