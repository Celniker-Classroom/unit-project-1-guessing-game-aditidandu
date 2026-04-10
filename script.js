//Game State
let answer = 0;
let guessCount = 0;
let totalWins = 0;
let totalGuesses = 0;
let scores = [];

//Player Name and Properly Formatting it
let playerName = prompt("Enter your name:");
playerName = playerName.substring(0,1).toUpperCase() + playerName.substring(1).toLowerCase();
//Play
//get level
document.getElementById("playBtn").addEventListener("click", function(){
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
        resetButtons(); //stop guess and give up restart play
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
        document.getElementById("msg").textContent = "To high. " + temp;
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
        document.getElementById("msg").textContent = "To low. " + temp;
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
    resetButtons();
    updateScore(range);
    reset();
}

//update score when win
function updateScore(score){
    totalWins ++;
    totalGuesses += score;
    //score for round and average
    document.getElementById("wins").textContent = "Total wins: " + totalWins;
    document.getElementById("avgScore").textContent = "Average Score: " + (totalGuesses/totalWins).toFixed(1);
    
    //update leader board
    scores.push(score);
    scores.sort(function(a,b){return a-b;});

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i=0; i < leaderboard.length; i++){
        if(i < scores.length){
            leaderboard[i].textContent = scores[i];
        } else{
            leaderboard[i].textContent = "--";
        }
    }
}

function resetButtons(){
    let radios = document.getElementsByName("level");
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;

    let levelRadios = document.getElementsByName("level");
    for (let i = 0; i <levelRadios.length; i++){
        levelRadios[i].disabled = false;
    }
}