const express = require('express');
const router = express.Router();
const db = require('../../database/setup'); // Assuming you have a database connection module

// Mark task as completed and update user score
router.post('/complete-task', async (req, res) => {


    const { userId, taskId, taskType } = req.body;

    try {
        // Determine the table and column based on taskType
        let tableName;
        let columnName;

        if (taskType === 'article') {
            tableName = 'articletasks';
            columnName = 'articletaskid';
        } 
        else if (taskType === 'basic') {
            tableName = 'basicstasks';
            columnName = 'basictaskid';
        }
        else if (taskType === 'topic') {
            tableName = 'topictasks';
            columnName = 'topictaskid';
        } 
        else if (taskType === 'game') {
            tableName = 'gametasks';
            columnName = 'gametaskid';
        } 
        else {
            return res.status(400).json({ error: 'Invalid task type' });
        }

        // Fetch the task from the appropriate table
        const task = await db.query(
            `SELECT ${columnName} AS taskid, points, iscompleted 
             FROM ${tableName} 
             WHERE UserID = $1 AND ${columnName} = $2`,
            [userId, taskId]
        );

        if (!task || task.length === 0) {
            console.error(`Task not found for UserID: ${userId}, TaskID: ${taskId}, Table: ${tableName}`);
            return res.status(404).json({ error: 'Task not found' });
        }

        const { points, iscompleted } = task[0];

        if (points == null) {
            console.error(`Points value is null for TaskID: ${taskId}, Table: ${tableName}`);
            return res.status(500).json({ error: 'Invalid task points' });
        }

        if (iscompleted) {

            // Subtract the points from the user's score only if the task is not a topic or game
            if (taskType !== 'topic' && taskType !== 'game') {
                await db.query(
                    'UPDATE users SET Score = Score - $1 WHERE UserID = $2', // Removed iscompleted column
                    [points, userId]
                );
                console.log(`Task ${taskId} in ${tableName} marked as not completed. Points subtracted: ${points}`);
            } else {
                console.log(`Task ${taskId} in ${tableName} status not changed. No points subtracted for task type: ${taskType}`);
            }
        } else {
            // Mark the task as completed
            await db.query(
                `UPDATE ${tableName} SET iscompleted = TRUE WHERE ${columnName} = $1 AND UserID = $2`,
                [taskId, userId]
            );

            // Add the points to the user's score
            await db.query('UPDATE users SET Score = Score + $1 WHERE UserID = $2', [points, userId]);

            console.log(`Task ${taskId} in ${tableName} marked as completed. Points added: ${points}`);
        }

        // Fetch the updated user score
        const updatedUser = await db.query('SELECT Score FROM users WHERE UserID = $1', [userId]);

        // Update the session with the new score
        req.session.user.score = updatedUser[0].score;

        res.redirect('/'); // Redirect to the account screen
    } catch (error) {
        console.error('Error in /complete-task route:', error.message || error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;