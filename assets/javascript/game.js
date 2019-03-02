//Grab reference to DOM elements
var $startButton = document.getElementById('start-button');
var $placeholders = document.getElementById('placeholders');
var $guessedLetters = document.getElementById('guessed-letters');
var $guessesLeft = document.getElementById('guesses-left');
var $wins = document.getElementById('wins');
var $losses = document.getElementById('losses');

//array of available mystery words
var mysteryWords = ["finger jam", "cam", "bouldering", "sport", "Sharma", "Ondra", "trad", "carabiner", "rope", "quickdraw", "project", "Honnold", "Yellowstone", "LCC", "crack"];

//variables for the game
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var gameRunning = false;
var pickedWord = '';
var pickedWordPlaceholderArr = [];
var guessedLetterBank = [];
var incorrectLetterBank = [];


//New Game function to reset all parts of game and pick new mystery word

//Function of the game
function newGame() {    
    gameRunning = true;
    guessesLeft = 10
    guessedLetterBank = [];
    incorrectLetterBank = [];
    pickedWordPlaceholderArr = [];
    
    //mystery word chosen at random
    pickedWord = mysteryWords[Math.floor(Math.random() * mysteryWords.length)];
    console.log("Mystery Word is: "+ pickedWord);
    //create underscores based on length of mystery word
    for (var i=0; i< pickedWord.length; i++) {
        if (pickedWord[i] === ' ') {
            pickedWordPlaceholderArr.push(' ');
        } else {
            pickedWordPlaceholderArr.push('_');
        }
    }
    console.log(pickedWordPlaceholderArr)
    //write all new game info to DOM
    $guessesLeft.textContent = guessesLeft;
    $placeholders.textContent = pickedWordPlaceholderArr.join(' ');
    $guessedLetters.textContent = incorrectLetterBank;
}

//letterGuess function- takes in the letter you pressed and checks if it's in the pickedWord
    function letterGuess(letter) {
        console.log(letter);
        if (gameRunning === true && guessedLetterBank.indexOf(letter) == -1) {
            //Run game logic
            guessedLetterBank.push(letter);
            //Check if guessed letter is in my picked word
            for (var i = 0; i < pickedWord.length; i++) {
                //convert both values to lowercase(if mystery word had caps or capslock on)
                if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                    //If a match, swap out that character in the placeholder with the actdual letter
                    pickedWordPlaceholderArr[i] = pickedWord[i];
                }
            }
            $placeholders.textContent = pickedWordPlaceholderArr.join(' ');
            //Pass letter into our checkIncorrect function
            checkIncorrect(letter);
        }
        else {
            if (!gameRunning) {
                alert ("The game isn't running, click on the START button to start over");
            } else {
                alert ("You've already guessed this letter, try a new one!");
            }
        }
    }

//checkIncorrect(letter)
function checkIncorrect(letter) {
    //check to see if letter didn't make it to our pickedWordPlaceHolder(incorrect guess) for upper and lowercase letters in picked word
    if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
    pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
        //decreases guess
        guessesLeft--;
        //add incorrect letter to incorrectLetterBank
        incorrectLetterBank.push(letter);
        //write new bank of incorrect letters guessed to DOM
        $guessedLetters.textContent=incorrectLetterBank.join(' ');
        //write new amount of guessesLeft to DOM
        $guessesLeft.textContent = guessesLeft;
    }
    checkLoss();
}

//check for loss
function checkLoss() {
    if (guessesLeft === 0) {
        losses ++;
        gameRunning = false;
        $losses.textContent = losses;
        $placeholders.textContent = pickedWord;
    }
    checkWin();
}

//check for win
function checkWin() {
    if (pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase()) {
        wins ++;
        gameRunning = false;
        $wins.textContent = wins;
    }  
}

//add eventListener for new game button
$startButton.addEventListener('click', newGame);

//Add onkeyup even to trigger letterGuess (to only use letters-hence the 65(A) and 90(Z))
document.onkeyup = function(event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        letterGuess(event.key);
    }
}



    
