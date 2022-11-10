


// Defining first function according to TOP instructions:
function getComputerChoice() {
    // Get a random value in the range 1 - 3 (int)
    const returnOption = Math.floor(Math.random() * 3);
    // Array of return values (array of strings)
    const returnValues = ["Rock", "Paper", "Scissors"];
    // Return random option (index) of the returnValues
    return returnValues[returnOption];
}

