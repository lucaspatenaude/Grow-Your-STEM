const express = require('express');
const router = express.Router();
const db = require('../../database/setup'); // Assuming you have a database connection module

// Mark task as completed and update user score
router.post('/complete-task', async (req, res) => {
    const { userId, taskName } = req.body;

    try {
        const task = await db.query(
            'SELECT TaskID, Points, IsCompleted FROM tasks WHERE UserID = $1 AND TaskName = $2',
            [userId, taskName]
        );

        if (task.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const { TaskID, Points, IsCompleted } = task.rows[0];

        if (IsCompleted) {
            return res.status(400).json({ error: 'Task already completed' });
        }

        await db.query('UPDATE tasks SET IsCompleted = TRUE WHERE TaskID = $1', [TaskID]);
        await db.query('UPDATE users SET Score = Score + $1 WHERE UserID = $2', [Points, userId]);

        res.json({ message: 'Task completed successfully', points: Points });
    } catch (error) {
        console.error('Error in /complete-task route:', error.message || error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;