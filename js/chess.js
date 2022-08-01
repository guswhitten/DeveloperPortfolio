// let originalBoard;
// const chessCells = document.querySelectorAll(".cell1");

// //.querySelectorAll returns static NodeList of all elements in the document
// //with CSS class="cell"

// setup();

// //sets up initial conditions for game
// function setup() {
//   document.querySelector(".endOfgame").style.display = "none"; //hides game result until later
//   document.querySelector(".endOfgame .text").innerText = ""; //initializes game result text to empty string
//   document.querySelector(".selectPiece").style.display = "block"; //displays selectPiecebol element on new line, taking up whole width

//   let count = 1;
//   for (let i = 0; i < chessCells.length; i++) {
//     if (i % 8 === 0) {
//       count++;
//     }
//     if (chessCells[i].id % 2 === 0) {
//       if (count % 2 === 0) {
//         i++;
//       }
//       chessCells[i].style.backgroundColor = "saddlebrown";
//     }
//   }
// }

// function selectPiece(sym) {
//   // sym = 'W' or 'B'
//   human = sym;
//   computer = sym === "B" ? "W" : "B";

//   //add event listeners to each cell. Go first if CPU is X
//   originalBoard = Array.from(Array(64).keys());
//   for (let i = 0; i < chessCells.length; i++) {
//     //element.addEventListener(event, function)
//     chessCells[i].addEventListener("click", turnClick); //add listening event to each cell
//   }
//   if (computer === "W") {
//     //take turn if CPU is 'W' / white pieces
//     turn(bestSpot(), computer);
//   }
//   document.querySelector(".selectPiece").style.display = "none"; // hide selectPiece element
// }

// //executes when a cell is clicked on
// function turnClick(square) {
//   const cellID = square.srcElement.id; //ID of clicked on cell
//   var d1 = document.getElementById(cellID); //element w/ corresponding ID
//   if (d1.hasAttribute("<i/>")) {
//     console.log("true");
//   } else {
//     console.log("false");
//   }
//   //what do i do with this element?
//   //i need to find valid moves for this piece

//   d1.insertAdjacentHTML("beforeend", '<i class="fas fa-chess-rook"></i>');

//   //ensures the clicked-on cell hasn't already been filled with an 'X' or 'O'
//   //   if (typeof originalBoard[square.target.id] === "number") {
//   //     //
//   //     turn(square.target.id, human);
//   //     if (!checkWin(originalBoard, human) && !checkTie())
//   //       turn(bestSpot(), computer);
//   //   }
// }

// function turn(squareId, player) {
//   originalBoard[squareId] = player;
//   document.getElementById(squareId).innerHTML = player;
//   let gameWon = checkWin(originalBoard, player);
//   if (gameWon) gameOver(gameWon);
//   checkTie();
// }

// function checkWin(board, player) {
//   let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
//   let gameWon = null;
//   for (let [index, win] of winningCombos.entries()) {
//     if (win.every((elem) => plays.indexOf(elem) > -1)) {
//       gameWon = { index: index, player: player };
//       break;
//     }
//   }
//   return gameWon;
// }

// function gameOver(gameWon) {
//   for (let index of winningCombos[gameWon.index]) {
//     document.getElementById(index).style.backgroundColor =
//       gameWon.player === human ? "blue" : "red";
//   }
//   for (let i = 0; i < chessCells.length; i++) {
//     chessCells[i].removeEventListener("click", turnClick, false);
//   }
//   declareWinner(gameWon.player === human ? "You win!" : "You lose");
// }

// function declareWinner(who) {
//   document.querySelector(".endgame").style.display = "block";
//   document.querySelector(".endgame .text").innerText = who;
// }
// function emptySquares() {
//   return originalBoard.filter((elm, i) => i === elm);
// }

// function bestSpot() {
//   return minimax(originalBoard, computer).index;
// }

// function checkTie() {
//   if (emptySquares().length === 0) {
//     for (cell of chessCells) {
//       cell.style.backgroundColor = "green";
//       cell.removeEventListener("click", turnClick, false);
//     }
//     declareWinner("Tie game");
//     return true;
//   }
//   return false;
// }

// function minimax(newBoard, player) {
//   var availSpots = emptySquares(newBoard);

//   if (checkWin(newBoard, human)) {
//     return { score: -10 };
//   } else if (checkWin(newBoard, computer)) {
//     return { score: 10 };
//   } else if (availSpots.length === 0) {
//     return { score: 0 };
//   }

//   var moves = [];
//   for (let i = 0; i < availSpots.length; i++) {
//     var move = {};
//     move.index = newBoard[availSpots[i]];
//     newBoard[availSpots[i]] = player;

//     if (player === computer) move.score = minimax(newBoard, human).score;
//     else move.score = minimax(newBoard, computer).score;
//     newBoard[availSpots[i]] = move.index;
//     if (
//       (player === computer && move.score === 10) ||
//       (player === human && move.score === -10)
//     )
//       return move;
//     else moves.push(move);
//   }

//   let bestMove, bestScore;
//   if (player === computer) {
//     bestScore = -1000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score > bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   } else {
//     bestScore = 1000;
//     for (let i = 0; i < moves.length; i++) {
//       if (moves[i].score < bestScore) {
//         bestScore = moves[i].score;
//         bestMove = i;
//       }
//     }
//   }

//   return moves[bestMove];
// }
