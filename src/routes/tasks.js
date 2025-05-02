const express = require('express');
const router = express.Router();
const db = require('../../database/setup'); // Assuming you have a database connection module

// Mark task as completed and update user score
router.post('/complete-task', async (req, res) => {
    const { userId, taskId } = req.body;

    console.log("User ID:", userId);
    console.log("Task ID:", taskId);

    try {
        // Fetch the task from the database
        const task = await db.query(
            'SELECT TaskID, points, iscompleted FROM tasks WHERE UserID = $1 AND TaskID = $2',
            [userId, taskId]
        );

        if (!task || task.length === 0) {
            console.error('Task not found for UserID:', userId, 'TaskID:', taskId);
            return res.status(404).json({ error: 'Task not found' });
        }

        const { points: Points, iscompleted } = task[0];

        if (Points == null) {
            console.error('Points value is null for TaskID:', taskId);
            return res.status(500).json({ error: 'Invalid task points' });
        }

        if (iscompleted) {
            // If the task is already completed, mark it as not completed and subtract points
            await db.query('UPDATE tasks SET iscompleted = FALSE WHERE TaskID = $1', [taskId]);

            // Subtract the points from the user's score
            await db.query('UPDATE users SET Score = Score - $1 WHERE UserID = $2', [Points, userId]);

            console.log(`Task ${taskId} marked as not completed. Points subtracted: ${Points}`);
        } else {
            // Mark the task as completed
            await db.query('UPDATE tasks SET iscompleted = TRUE WHERE TaskID = $1', [taskId]);

            // Add the points to the user's score
            await db.query('UPDATE users SET Score = Score + $1 WHERE UserID = $2', [Points, userId]);

            console.log(`Task ${taskId} marked as completed. Points added: ${Points}`);
        }

        // Fetch the updated user score
        const updatedUser = await db.query(
            'SELECT Score FROM users WHERE UserID = $1',
            [userId]
        );

        // Update the session with the new score
        req.session.user.score = updatedUser[0].score;

        res.redirect('/'); // Redirect to the account screen
    } catch (error) {
        console.error('Error in /complete-task route:', error.message || error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;