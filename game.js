///
// Game implementation (game logic)
///

// Declared global return values 
// Array of return values (array of strings)
const returnValues = [{value: "Rock", beat: "Paper"}, {value: "Paper", beat: "Scissors"}, {value: "Scissors", beat: "Rock"}];


// Defining first function according to TOP instructions:
function getComputerChoice() {
    // Get a random value in the range 1 - 3 (int)
    const returnOption = Math.floor(Math.random() * 3);
    // Return random option (index) of the returnValues and only return its value, not the object
    return returnValues[returnOption].value;
}


// Display the correct message
function getPlayerMessage(result, playerSelection, computerSelection) {
    const sps = sanitizeValue(playerSelection);
    const scs = sanitizeValue(computerSelection); 
    if (result === "tie") {
        return `Tie! ${sps} doesn't beat ${scs}`;
    }
    if (result === "win") {
        return `You win! ${sps} beats ${scs}`;
    }
    if (result === "lost") {
        return `You lose! ${sps} is beaten by ${scs}`;
    }
}


// Writing a function that plays a single round of the game:
function playRound(playerSelection, computerSelection) {
    const playerSelectionSanitized = sanitizeValue(playerSelection);
    const computerSelectionSanitized = sanitizeValue(computerSelection);
    // Paper beats rock
    // Scissor beats paper
    // Rock beats scissor
    // What if it is a tie? (same value)
    // No need to do any checks if it is a tie:
    if (playerSelectionSanitized === computerSelectionSanitized) {
        // I want to return capitalized words, no matter that the input is.
        return "tie"
    } 
    
    // I don't want to create comparisons for every option...
    // If we have an array of objects where each value has its "beat" value listed
    // We loop through the array until we find the index of the object that matches our input value
    // If the computerSelection is the "beat" value, the player lost.
    // Keep track of who has won or lost by variable, assumed to have won since loop finds out if we lose
    let playerLost = false;
    for (let i = 0; i < 3; i++) {
        // If this comparison is true, the player has lost
        if (returnValues[i].value === playerSelectionSanitized && returnValues[i].beat === computerSelectionSanitized) {
            playerLost = true;
            // Stop loop if we know the answer
            break;
        }
    }

    if (playerLost) {
        return "lost"
    }
    else {
        // If the player has not lost, we can return the win statement
        return "win"
    }

    // If the player picks paper, the player has lost if the computer picks rock.
    // If the player picks scissor, the player has lost if the computer picks paper.
    // If the player picks rock, the player has lost if the computer picks paper.
}


// This function standardizes the text/input for our logic and messages
function sanitizeValue(input) {
    let sanitizedInput = input.toLowerCase()
    sanitizedInput = sanitizedInput.replace(sanitizedInput.charAt(), sanitizedInput.charAt().toUpperCase());
    return sanitizedInput;
}


// Implement the game loop/function
// This will be our main function that runs the game
function gameConsole(rounds) {
    // For the amount of rounds, loop once per round
    for (let i = 0; i < rounds; i++) {
        const input = prompt('Rock, paper or scissors?');
        console.log(playRound(input, getComputerChoice()));
    }
}

// gameConsole(5);



///
// UI implementation
///

// Keep track of result
let maxRounds = 5;
let playerWins = 0;
let ties = 0;
let round = 0;

// Display result of played round 
function displayPlayerMessage(message) {
    document.getElementById("result").textContent = message;
}

// Display result of played round 
function displayPlayerWins(wins) {
    document.getElementById("wins").textContent = `${wins} wins, round ${round} / ${maxRounds}`;
}

// Play a round with UI
function playRoundUI(e) {
    // Play round
    const cc = getComputerChoice();
    const pc = e.target.dataset["choice"];
    const result = playRound(pc, cc);
    if (result === "win") playerWins++;
    round++;
    displayPlayerMessage(getPlayerMessage(result, pc, cc));
    displayPlayerWins(playerWins);
}

// Reset game UI
function resetGameUI(message) {
    // Reset game
    playerWins = 0;
    round = 0;
    displayPlayerMessage(message + ", play again?", "", "");
    displayPlayerWins("Start by clicking a button");
}

// Game logic to decide when we win/lose the game, when to play a new round and when to reset the game
function gameUI(e) {
    if ((maxRounds - playerWins) < (maxRounds / 2)) {
        // Player won
        resetGameUI("You won")
    }
    if ((maxRounds - playerWins) > (maxRounds / 2) && round === maxRounds) {
        // Player lost
        resetGameUI("You lost")
    }
    // Otherwise continue playing the game
    playRoundUI(e);
}

// Play game with UI
const playerChoiceButtons = document.querySelectorAll(".playerChoiceButton");
playerChoiceButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        // Play the game
        gameUI(e);
    })
})


