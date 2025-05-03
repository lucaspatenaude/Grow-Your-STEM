-- Drop tables if they already exist
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS articleTasks;
DROP TABLE IF EXISTS lessonTasks;
DROP TABLE IF EXISTS gameTasks;

-- Create the articleTasks table
CREATE TABLE articleTasks (
    ArticleID INT NOT NULL, -- Unique identifier for each article
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, ArticleID) -- Composite primary key
);

-- Create the lessonTasks table
CREATE TABLE lessonTasks (
    LessonID INT NOT NULL, -- Unique identifier for each lesson
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, LessonID) -- Composite primary key
);

-- Create the gameTasks table
CREATE TABLE gameTasks (
    GameID INT NOT NULL, -- Unique identifier for each game
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, GameID) -- Composite primary key
);