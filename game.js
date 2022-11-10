

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


// Writing a function that plays a single round of the game:
function playRound(playerSelection, computerSelection) {
    const playerSelection = sanitizeValue(playerSelection);
    const computerSelection = sanitizeValue(computerSelection);
    // Paper beats rock
    // Scissor beats paper
    // Rock beats scissor
    // What if it is a tie? (same value)
    // No need to do any checks if it is a tie:
    if (playerSelection === computerSelection) {
        // I want to return capitalized words, no matter that the input is.
        return `Tie! ${playerSelection} doesn't beat ${computerSelection}`;
    } 
    
    // I don't want to create comparisons for every option...
    // If we have an array of objects where each value has its "beat" value listed
    // We loop through the array until we find the index of the object that matches our input value
    // If the computerSelection is the "beat" value, the player lost.
    for (let i = 0; i < 3; i++) {
        // If this comparison is true, the player has lost
        if (returnValues[i].value === playerSelection && returnValues[i].beat === computerSelection) {
            return `You lose! ${computerSelection} beats ${playerSelection}`;
        }
    }

    // If the player has not lost, we can return the win statement
    return `You win! ${playerSelection} beats ${computerSelection}`;
    
    // If the player picks paper, the player has lost if the computer picks rock.
    // If the player picks scissor, the player has lost if the computer picks paper.
    // If the player picks rock, the player has lost if the computer picks paper.
}


function sanitizeValue(input) {
    let inputArray = toLowerCase(input).split("");
    inputArray[0].toUpperCase();
    return inputArray.join("");
}