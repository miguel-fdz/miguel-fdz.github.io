//Reset score on game start
let playerScore = 0;
let computerScore = 0;

function resetScore() {
    playerScore = 0;
    computerScore = 0;

    displayScore();
    document.querySelectorAll('button').forEach(button => button.disabled = false);
    container.removeChild(container.firstElementChild)
}

/*
 * Randomly selects the computer choice returns {string} the computer choice
 */
const choices = ["rock", "paper", "scissors"]; //Establish the possible choices for the computer

function computerMove() {
    let selection = Math.floor(Math.random() * 3); //Computer randomly selects from integers 0 through 2 (rounded down for accuracy with Math.floor function)
    return choices[selection]; //Computer uses random number generated to select item from list
}

/*
 * On any button press, play round according to respective button's id
 */
const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => playRound(button.id))
});

/*
 * Plays round 
 */        
function playRound(playerSelection) {
    let myNode = document.getElementById("container");
    while (myNode.firstChild) myNode.removeChild(myNode.firstChild); //erase previous round display if it already exists

    const playerChoice = document.createElement('p'); 
    playerChoice.textContent = `You play: ${playerSelection}`; //display player move on DOM
    
    let computerSelection = computerMove();
    const computerChoice = document.createElement('p'); 
    computerChoice.textContent = `Computer plays: ${computerSelection}`; //display computer move on DOM
    

    const roundResult = document.createElement('p'); 

    if ((playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        roundResult.textContent = ('You win this round!'); //announce player as round winner on DOM
        keepScore('player');
    }
    else if (
        (playerSelection === "rock" && computerSelection === "paper") ||
        (playerSelection === "paper" && computerSelection === "scissors") ||
        (playerSelection === "scissors" && computerSelection === "rock")
    ){
        roundResult.textContent = ('Computer wins this round!'); //announce computer as round winner
        keepScore();
    }
    else {
        roundResult.textContent = ('Play again!'); //if computer and player chose the same move, advise player to retry
    }

    container.appendChild(playerChoice);
    container.appendChild(computerChoice);
    container.appendChild(roundResult);
}

/*
 * Announces the winner 
 */     
function keepScore(x) {
    if (x === 'player') playerScore++;
    else computerScore++;
    
    displayScore();

    //Once number of rounds is reached, alert winner and disable buttons
    if ((playerScore + computerScore) >= document.getElementById("rounds").value) {
        if (playerScore > computerScore) alert("You win!");
        else alert("Computer wins!");

        document.querySelectorAll('button').forEach(button => button.disabled = true);
        
        const restart = document.createElement('button');
        restart.textContent = "Restart";
        restart.addEventListener('click', () => resetScore());
        container.appendChild(restart);
    }
}

// Remove previous running score and display new result
function displayScore() {
    score.removeChild(score.firstElementChild);
    const runningResult = document.createElement('p'); 
    runningResult.textContent = `Player score: ${playerScore} || Computer score: ${computerScore}`; //display running score
    score.appendChild(runningResult);
}

