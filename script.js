//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

let startTime = 0;
let fastestTime = null;
let totalTime = 0;
let roundsPlayed = 0;

//Player Name and Properly Formatting it
let playerName = prompt("Enter your name:");
playerName = playerName.substring(0,1).toUpperCase() + playerName.substring(1).toLowerCase();

//Play
//get level
document.getElementById("playBtn").addEventListener("click", function(){
    startTime = new Date().getTime();
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value);
        }
    }
    //pick answer
    answer = Math.floor(Math.random() * range) + 1;
    guessCount = 0; //resets guess count for new round
    //Disable and Enable buttons and radio choices
    document.getElementById("msg").textContent = playerName + ", guess a number between 1 and " + range;
    document.getElementById("guess").value="";
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    let levelRadios = document.getElementsByName("level");
    for (let i = 0; i <levelRadios.length; i++){
        levelRadios[i].disabled = true;
    }
});

//Time and Date
function time(){
    let now = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = now.getDate();
    let suffix = "th";
    if (day % 10 === 1 && day !== 11){
        suffix = "st";
    } else if (day % 10 === 2 && day !== 12){
        suffix = "nd";
    } else if (day % 10 === 3 && day !== 13){
        suffix = "rd";
    }
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    return months[now.getMonth()] + " " + day + suffix + ", " + now.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
}
//clock
setInterval(function(){
    document.getElementById("date").textContent = time();
}, 1000);

//update timer properly
function updateTimers(endMs){
    let elapsed = (endMs - startTime) / 1000;
    roundsPlayed ++;
    totalTime += elapsed;
    if (fastestTime === null || elapsed < fastestTime){
        fastestTime = elapsed;
    }
    document.getElementById("fastest").textContent = "Fastest Time: " + fastestTime.toFixed(2) + " seconds";
    document.getElementById("avgTime").textContent = "Average Time: " + ((roundsPlayed === 0) ? 0 : (totalTime/roundsPlayed).toFixed(2)) + " seconds";
}


//Guessing
document.getElementById("guessBtn").addEventListener("click", function(){
    let input = document.getElementById("guess").value;
    let num = parseInt(input);

    if (isNaN(num)){
        document.getElementById("msg").textContent = "Please enter a valid number!";
        return;
    }

    guessCount ++;
    let diff = Math.abs(num - answer);

    //correct
    if (num === answer){
        document.getElementById("msg").textContent = "Correct! " + playerName + " got it in " + guessCount + " guesses!";
        updateScore(guessCount);
        updateTimers(new Date().getTime());
        reset(); //stop guess and give up restart play
    }
    //higher
    else if (num > answer){
        let temp = "";
        if (diff <=2){
            temp = "Hot!";
        } else if (diff <= 5){
            temp = "Warm!";
        } else{
            temp = "Cold!";
        }
        document.getElementById("msg").textContent = "Too high. " + temp;
    }

    else if (num < answer){
        let temp = "";
        if (diff <=2){
            temp = "Hot!";
        } else if (diff <= 5){
            temp = "Warm!";
        } else{
            temp = "Cold!";
        }
        document.getElementById("msg").textContent = "Too low. " + temp;
    }
        
})

//Give up button
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function giveUp(){
    let radios = document.getElementsByName("level");
    let range = 3;
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            range = parseInt(radios[i].value);
        }
    }
    document.getElementById("msg").textContent = playerName + " gave up. The correct answer was " + answer + ". Play again?";
    updateScore(range);
    updateTimers(new Date().getTime());
    
    reset();
}

//update score when win
function updateScore(score){
    totalWins ++;
    totalGuesses += score;
    //score for round and average
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + Math.round(totalGuesses/totalWins);
    
    //update leader board
    scores.push(score);
    scores.sort(function(a,b){return a-b;});
    
    //i added this because to make sure only 3 scores were shown
    let displayScores = scores.slice(0,3);
    let leaderboard = document.getElementsByName("leaderboard");
    for (let i=0; i < leaderboard.length; i++){
        leaderboard[i].textContent = "--";
        if(i < displayScores.length){
            leaderboard[i].textContent = displayScores[i];
        } else{
            leaderboard[i].textContent = "--";
        }
    }
}

function reset(){
    let radios = document.getElementsByName("level");
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    let levelRadios = document.getElementsByName("level");
    for (let i = 0; i <levelRadios.length; i++){
        levelRadios[i].disabled = false;
    }
}