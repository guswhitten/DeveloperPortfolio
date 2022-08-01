const computer = document.getElementById("computer-choice");
const user = document.getElementById("user-choice");
const result = document.getElementById("result");
const combinations = document.querySelectorAll(".rpsButtons");
let usersChoice;
let cpuChoice;

const someFunction = (event) => {
  usersChoice = event.target.id; //
  user.innerHTML = usersChoice;
  generateComputerChoice();
  displayResult();
};

const displayResult = () => {
  if (usersChoice === cpuChoice) {
    result.innerHTML = "It's a tie!";
    result.style.color = "green";
    user.style.color = "green";
    computer.style.color = "green";
  } else {
    usersChoice === "rock" && cpuChoice === "paper" ? youLost() : youWon();
    usersChoice === "scissors" && cpuChoice === "rock" ? youLost() : youWon();
    usersChoice === "paper" && cpuChoice === "scissors" ? youLost() : youWon();
  }
};

const youLost = () => {
  result.innerHTML = "You lost!";
  user.style.color = "red";
  computer.style.color = "blue";
  result.style.color = "red";
};

const youWon = () => {
  result.innerHTML = "You won!";
  result.style.color = "blue";
  user.style.color = "blue";
  computer.style.color = "red";
};

const generateComputerChoice = () => {
  const randomNumber = Math.random();
  if (randomNumber > 0.66) {
    cpuChoice = "rock";
  } else if (randomNumber > 0.33) {
    cpuChoice = "paper";
  } else {
    cpuChoice = "scissors";
  }
  computer.innerHTML = cpuChoice;
};

combinations.forEach((combination) => {
  combination.addEventListener("click", someFunction);
});
