CREATE TABLE authors (
    AuthorID SERIAL PRIMARY KEY, -- Unique identifier for each author <-- linked to in articles table
    Name VARCHAR(255) NOT NULL UNIQUE,
    Route VARCHAR(255) -- Used to add route to button in article cards for author pages
);

CREATE TABLE articles (
    ArticleID SERIAL PRIMARY KEY, -- Unique identifier for each article
    AuthorID INT NOT NULL REFERENCES authors(AuthorID) ON DELETE CASCADE, -- Foreign key to link to author in authors table
    
    -- Article Attributes
    Title VARCHAR(255) NOT NULL,
    Summary TEXT NOT NULL,
    Link VARCHAR(255) NOT NULL, -- Used to add route to button in article cards for article pages
    ImagePath VARCHAR(255) NOT NULL,
    ImageAlt VARCHAR(255) NOT NULL
);

-- Insert authors
INSERT INTO authors (Name, Route)
VALUES
    ('Lucas Patenaude', 'Lucas'), -- AuthorID 1
    ('Nathaniel Beatty', 'Nathaniel'), -- AuthorID 2
    ('Clay Kress', 'Clay'); -- AuthorID 3

-- Insert articles into the articles table
-- Note: These are the order the cards will be displayed on the articles page
INSERT INTO articles (AuthorID, Title, Summary, Link, ImagePath, ImageAlt)
VALUES
    
    (1, 'Credit and Financing Options', 'Navigating funding and credit options for education can be daunting. This article explores popular options for STEM majors', '/articles/lucas/credit-and-financing-options', '/img/articles/Lucas/Credit-and-Finance-Options.jpg', 'Sample Event Image'),
    (1, 'The Future of AI in the Workplace', 'An in-depth analysis on what the effects of current-day tariffs look like', '/articles/lucas/future-of-ai-in-the-workplace', '/img/articles/Lucas/Future-of-AI-in-the-Workplace.jpg', 'Sample Event Image'),
    (1, 'Investment Trends in 2025', 'In a quickly shifting world it can feel overwhelming to keep up. This article explores where markets are shifting today and how you jump in', '/articles/lucas/investment-trends-2025', '/img/articles/Lucas/Investment-Trends-2025.jpg', 'Sample Event Image'),
    (1, 'The Dangers of Modern Investment Platforms', 'Apps like Robinhood have turned investing into a game, but not every game is what it appears.', '/articles/lucas/dangers-of-modern-investment-platforms', '/img/articles/Lucas/Dangers-of-Modern-Investment-Platforms.jpg', 'Sample Event Image'),
    (1, 'Popularity of Options Trading', 'Options trading is booming, but fast profits often come with fast risks. What’s driving the surge and why caution matters.', '/articles/lucas/popularity-of-options-trading', '/img/articles/Lucas/Popularity-of-Options-Trading.jpg', 'Sample Event Image'  ),
    (2, 'How do Tariffs Work?', 'An in-depth analysis on what the effects of current-day tariffs look like', '/articles/nathaniel/how-do-tariffs-work', '/img/articles/Nathaniel/How-Do-Tariffs-Work.jpg', 'Sample Event Image'),
    (3, 'Retirement Accounts: How Do They Work?', 'Saving money at a young age can seem daunting but the benefits are far reaching', '/articles/clay/retirement-accounts', '/img/articles/Clay/Retirement-Accounts.jpg', 'Sample Event Image'),
    (3, 'The US Dollar as the Global Reserve Currency.', 'The United States holds a lot of power as the nation behind the global reserve currency, but what does it mean for us? What happens if we lose it?', '/articles/clay/global-reserve', '/img/articles/Clay/Global-Reserve.jpg', 'Sample Event Image'),
    (3, 'What on Earth Does a Negative Price Mean?', 'How can energy prices go negative. In a rapidly changing world so to is energy.', '/articles/clay/whats-a-negative-price', '/img/articles/Clay/Negative-Price.jpg', 'Sample Event Image'),
    (3, 'Why YOU care about Crypto Currency', 'The emergence of Crypto is changing how the world views currency. What makes it different?', '/articles/clay/crypto', '/img/articles/Clay/Crypto.jpg', 'Sample Event Image');

-- Go to '/src/routes/login-and-restrigation.js' under the POST '/register' route to ddd the article attributes (title, points). Due to their scoring system, they are not added to the database at this time.