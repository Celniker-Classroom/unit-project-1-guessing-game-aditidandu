CSS styling and visual design:
    1. I added style.css, where I changed the background color,  made the text centered, changed the font, made the buttons increase in size when you hover on them, and changed font-size and formatting for #msg, wins, avgScore, fastest, and avgTime. I also added a title on the page.
    2.  index.html: lines 6 and 10
        style.css: lines 1-26
    3. I wanted to make the game more visually appealing and easier to read.

Dark mode:
    1. I added a dark mode button, which makes the background darker and the text lighter. You can switch back and forth between light mode and dark mode during the game. 
    2.  index.html: line 12 
        style.css: lines 28-37 
        script.js: lines 20-28
    3. I think it improves the game as it can make the it more appealing to play in darker areas.

Custom difficulty levels:
    1. I added 2 new difficulty levels: Difficult(1-500) and Extreme(1-1000).
    2. index.html: lines 18 and 19
    3. It adds more challenge to the game.

Input validation:
    1. If the player enters a number not in the correct range for the difficulty, they get a message: "Please enter a number between 1 and _ for this level!"
    2. script.js: lines 106-109
    3. It makes it clear to players what to do and if they are playing incorrectly.

Score quality feedback:
    1. I added small messages after the player guesses the correct number based on how many attempts it took for them to guess
    2. script.js: lines 118-126
    3. It makes the game more fun and might make the player try again to get a better score.

