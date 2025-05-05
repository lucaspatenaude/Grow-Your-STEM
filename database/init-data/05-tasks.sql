-- Drop tables if they already exist
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS articleTasks;
DROP TABLE IF EXISTS topicTasks;
DROP TABLE IF EXISTS gameTasks;

-- Create the articleTasks table
CREATE TABLE articleTasks (
    ArticleTaskID INT NOT NULL, -- Unique identifier for each article
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, ArticleTaskID) -- Composite primary key
);

-- Create the basicTasks table
CREATE TABLE basicsTasks (
    BasicTaskID INT NOT NULL, -- Unique identifier for each basic
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, BasicTaskID) -- Composite primary key
);

-- Create the topicTasks table
CREATE TABLE topicTasks (
    TopicTaskID INT NOT NULL, -- Unique identifier for each topic
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, TopicTaskID) -- Composite primary key
);

-- Create the gameTasks table
CREATE TABLE gameTasks (
    GameTaskID INT NOT NULL, -- Unique identifier for each game
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, GameTaskID) -- Composite primary key
);