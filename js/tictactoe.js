let origBoard;
let humanPlayer = "O";
let computerPlayer = "X";
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [6, 4, 2],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
];

//.querySelectorAll returns static NodeList of all elements in the document
//with CSS class="cell"
const cells = document.querySelectorAll(".cell");
startGame();

//called when person clicks on either CHOOSE X or CHOOSE O
//sym parameter will be string: either 'X' or 'O'
function selectSym(sym) {
  // assign symbols
  humanPlayer = sym;
  computerPlayer = sym === "O" ? "X" : "O";

  //add event listeners to each cell. Go first if CPU is X
  origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8]; //ALT: origBoard = Array.from(Array(9).keys());
  for (let i = 0; i < cells.length; i++) {
    //element.addEventListener(event, function)
    cells[i].addEventListener("click", turnClick); //add listening event to each cell
  }
  if (computerPlayer === "X") {
    //take turn if CPU is X
    turn(bestSpot(), computerPlayer);
  }
  document.querySelector(".selectSym").style.display = "none"; // hide selectSym element
}

//sets up initial conditions for game
function startGame() {
  document.querySelector(".endgame").style.display = "none"; //hides game result until later
  document.querySelector(".endgame .text").innerText = ""; //initializes game result text to empty string
  document.querySelector(".selectSym").style.display = "block"; //displays selectSymbol element on new line, taking up whole width

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.removeProperty("background-color");
  }
}

//executes when a cell is clicked on
function turnClick(square) {
  //ensures the clicked-on cell hasn't already been filled with an 'X' or 'O'
  if (typeof origBoard[square.target.id] === "number") {
    turn(square.target.id, humanPlayer);
    if (!checkWin(origBoard, humanPlayer) && !checkTie())
      turn(bestSpot(), computerPlayer);
  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerHTML = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
  checkTie();
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winningCombos.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  for (let index of winningCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor =
      gameWon.player === humanPlayer ? "blue" : "red";
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", turnClick, false);
  }
  declareWinner(gameWon.player === humanPlayer ? "You win!" : "You lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}
function emptySquares() {
  return origBoard.filter((elm, i) => i === elm);
}

function bestSpot() {
  return minimax(origBoard, computerPlayer).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    for (cell of cells) {
      cell.style.backgroundColor = "green";
      cell.removeEventListener("click", turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  var availSpots = emptySquares(newBoard);

  if (checkWin(newBoard, humanPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, computerPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  var moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player === computerPlayer)
      move.score = minimax(newBoard, humanPlayer).score;
    else move.score = minimax(newBoard, computerPlayer).score;
    newBoard[availSpots[i]] = move.index;
    if (
      (player === computerPlayer && move.score === 10) ||
      (player === humanPlayer && move.score === -10)
    )
      return move;
    else moves.push(move);
  }

  let bestMove, bestScore;
  if (player === computerPlayer) {
    bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
