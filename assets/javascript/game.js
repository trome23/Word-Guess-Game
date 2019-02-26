//array of available mystery words
var mysteryWords = ["bouldering", "sport", "sharma", "ondra", "trad", "carabiner", "rope", "quickdraw", "project", "honnold", "yellowstone", "lcc", "bcc", "crack"];
//variables declaring what is on the game's page
var wins = 0;
var losses = 0;
var guessesLeft = 12;

//variables for the choices that a use can choose from
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

var underScores = [];


//Function of the game
function gameStart() {    
    //log user guess
    document.onkeyup = function (event) {
        var userGuess = event.key.toLowerCase();
        console.log(userGuess);
    }
    //mystery word chosen at random
    currentMysteryWord = mysteryWords[Math.floor(Math.random() * mysteryWords.length)];
    console.log(currentMysteryWord);
    //create underscores based on length of mystery word
    function generateUnderscore () {
        for (var i=0; i< currentMysteryWord.length; i++) {
            underScores.push("_");
        }
        return underScores;
    };
    console.log(generateUnderscore());
    //get Users guess

};

document.getElementById("startButton").onclick = function () {
    gameStart();
    console.log("startButton")
}
    
