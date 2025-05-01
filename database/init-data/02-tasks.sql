DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks (
    TaskID INT NOT NULL, -- TaskID is no longer a SERIAL PRIMARY KEY
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, TaskID) -- Composite primary key
);