CREATE TABLE authors (
    AuthorID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE,
    Route VARCHAR(255)
);

CREATE TABLE articles (
    ArticleID SERIAL PRIMARY KEY,
    AuthorID INT NOT NULL REFERENCES authors(AuthorID) ON DELETE CASCADE,
    Title VARCHAR(255) NOT NULL,
    Summary TEXT NOT NULL,
    Link VARCHAR(255) NOT NULL,
    ImagePath VARCHAR(255) NOT NULL,
    ImageAlt VARCHAR(255) NOT NULL
);

-- Insert authors
INSERT INTO authors (Name, Route)
VALUES
    ('Lucas Patenaude', 'Lucas'),
    ('Nathaniel Beatty', 'Nathaniel'),
    ('Clay Kress', 'Clay');

-- Insert articles
INSERT INTO articles (AuthorID, Title, Summary, Link, ImagePath, ImageAlt)
VALUES
    
    (1, 'Credit and Financing Options', 'Navigating funding and credit options for education can be daunting. This article explores popular options for STEM majors', '/articles/lucas/credit-and-financing-options', '/img/articles/Lucas/Credit-and-Finance-Options.jpg', 'Sample Event Image'),
    (1, 'The Future of AI in the Workplace', 'An in-depth analysis on what the effects of current-day tariffs look like', '/articles/lucas/future-of-ai-in-the-workplace', '/img/articles/Lucas/Future-of-AI-in-the-Workplace.jpg', 'Sample Event Image'),
    (1, 'Investment Trends in 2025', 'In a quickly shifting world it can feel overwhelming to keep up. This article explores where markets are shifting today and how you jump in', '/articles/lucas/investment-trends-2025', '/img/articles/Lucas/Investment-Trends-2025.jpg', 'Sample Event Image'),
    (1, 'The Dangers of Modern Investment Platforms', 'Apps like Robinhood have turned investing into a game, but not every game is winnable. This article explores how gamified design can lead to risky decisions and hidden costs.', '/articles/lucas/dangers-of-modern-investment-platforms', '/img/articles/Lucas/Dangers-of-Modern-Investment-Platforms.jpg', 'Sample Event Image'),
    (1, 'Popularity of Options Trading', 'Options trading is booming, but fast profits often come with fast risks. This article breaks down what’s driving the surge, how options really work, and why caution matters.', '/articles/lucas/popularity-of-options-trading', '/img/articles/Lucas/Popularity-of-Options-Trading.jpg', 'Sample Event Image'  ),
    (2, 'How do Tariffs Work?', 'An in-depth analysis on what the effects of current-day tariffs look like', '/articles/nathaniel/how-do-tariffs-work', '/img/articles/Nathaniel/How-Do-Tariffs-Work.jpg', 'Sample Event Image'),
    (3, 'Retirement Accounts: How Do They Work?', 'Saving money at a young age can seem daunting but the benefits are far reaching', '/articles/clay/retirement-accounts', '/img/articles/Clay/Retirement-Accounts.jpg', 'Sample Event Image'),
    (3, 'The US Dollar as the Global Reserve Currency.', 'The United States holds a lot of power as the nation behind the global reserve currency, but what does it mean for us? What happens if we lose it?', '/articles/clay/global-reserve', '/img/articles/Clay/Retirement-Accounts.jpg', 'Sample Event Image'),
    (3, 'What on Earth Does a Negative Price Mean?', 'Summary', '/articles/clay/whats-a-negative-price', '/img/articles/Clay/What-on-Earth-Does-a-Negative-Price-Mean.jpg', 'Sample Event Image'),
    (3, 'Meme Stocks and Cryptocurrency', 'Summary', '/articles/clay/meme-stocks-and-crypto', '/img/articles/Clay/Meme-Stocks-and-Cryptocurrency.jpg', 'Sample Event Image');