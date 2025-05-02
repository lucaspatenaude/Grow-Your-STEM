-- Drop tables if they already exist
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS lessons;
DROP TABLE IF EXISTS games;

-- Create the articles table
CREATE TABLE articles (
    ArticleID INT NOT NULL, -- Unique identifier for each article
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, ArticleID) -- Composite primary key
);

-- Create the lessons table
CREATE TABLE lessons (
    LessonID INT NOT NULL, -- Unique identifier for each lesson
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, LessonID) -- Composite primary key
);

-- Create the games table
CREATE TABLE games (
    GameID INT NOT NULL, -- Unique identifier for each game
    UserID INT REFERENCES users(UserID) ON DELETE CASCADE,
    TaskName VARCHAR(255) NOT NULL,
    Points INT NOT NULL,
    Location VARCHAR(255),
    IsCompleted BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (UserID, GameID) -- Composite primary key
);