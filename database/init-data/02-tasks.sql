CREATE TABLE tasks (
    TaskID SERIAL PRIMARY KEY,
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    IsCompleted BOOLEAN DEFAULT FALSE
);

INSERT INTO tasks (UserID, TaskName, Points, IsCompleted)
VALUES
    (1, 'Read Article "How Do Tariffs Work"', 10, FALSE),
    (1, 'Read Article "Credit and Financing Options"', 10, FALSE),
    (1, 'Read Article "Retirement Accounts"', 10, FALSE),
    (1, 'Click Fundamentals Button', 5, FALSE),
    (1, 'Play "Universal Paperclips"', 5, FALSE),
    (1, 'Complete STEM Quiz', 15, FALSE),
    (1, 'Watch STEM Webinar', 20, FALSE),
    (1, 'Submit a STEM Project', 25, FALSE),
    (1, 'Join STEM Community Forum', 10, FALSE),
    (1, 'Share STEM Article on Social Media', 5, FALSE);