// const gameGrid = document.querySelector(".grid");
// //grid width = 1000px
// //grid height = 500px
// const scoreDisplay = document.querySelector("#score");
// const userStart = 320;
// const ballStartX = 100;
// const ballStartY = 200;
// let ballPosition = [ballStartX, ballStartY];
// let currentPos = userStart;
// let timerId;
// let xDirection = -2;
// let yDirection = 2;

// const addBlock = (fromLeft, fromTop, bn) => {
//   const gameBlock = document.createElement("div");
//   const blockNumber = document.createElement("p");
//   blockNumber.innerHTML = bn;
//   blockNumber.style.fontSize = "small";
//   gameBlock.classList.add("gameBlock");
//   gameGrid.appendChild(gameBlock);
//   gameBlock.appendChild(blockNumber);
//   gameBlock.style.left = fromLeft;
//   gameBlock.style.top = fromTop;
// };

// const setupBoard = () => {
//   let pixelsX = 100;
//   let pixelsY = 40;
//   for (let i = 1; i < 101; i++) {
//     pixelsX += 30;
//     addBlock(pixelsX + "px", pixelsY + "px", i);
//     if (pixelsX > 580) {
//       pixelsX = 100;
//       pixelsY += 30;
//     }
//   }
// };
// setupBoard();

// //Create trampoline
// const breakoutUser = document.createElement("div");
// breakoutUser.classList.add("bUser");
// breakoutUser.style.left = userStart + "px";
// gameGrid.appendChild(breakoutUser);

// //give user movement functionality
// const moveUser = (e) => {
//   switch (e.key) {
//     case "ArrowLeft":
//       if (currentPos > 10) {
//         currentPos -= 15;
//         breakoutUser.style.left = currentPos + "px";
//       }
//       break;
//     case "ArrowRight":
//       if (currentPos < 650) {
//         currentPos += 15;
//         breakoutUser.style.left = currentPos + "px";
//       }
//       break;
//   }
// };

// document.addEventListener("keydown", moveUser);

// //create a ball
// const breakoutBall = document.createElement("div");
// breakoutBall.classList.add("bBall");
// gameGrid.appendChild(breakoutBall);
// breakoutBall.style.left = ballStartX + "px";
// breakoutBall.style.bottom = ballStartY + "px";

// //draw the ball
// const drawBall = () => {
//   breakoutBall.style.left = ballPosition[0] + "px";
//   breakoutBall.style.bottom = ballPosition[1] + "px";
// };

// //move the ball
// const moveBall = () => {
//   ballPosition[0] += xDirection;
//   ballPosition[1] += yDirection;
//   drawBall();
//   checkCollisions();
// };

// //ball speed
// timerId = setInterval(moveBall, 10);

// // set ball physics
// const checkCollisions = () => {
//   //check for block collisions
//   if (
//     ballPosition[0] > 100 &&
//     ballPosition[0] < 600 &&
//     ballPosition[1] > 290 &&
//     ballPosition[1] < 460
//   ) {
//     let x = ballPosition[0];
//     let y = ballPosition[1];
//     const allBlocks = Array.from(document.querySelectorAll(".gameBlock"));
//     for (let i = 0; i < allBlocks.length; i++) {
//       let left = allBlocks[i].style.left;
//       let top = allBlocks[i].style.top;
//       let thing = left.slice(0, 3);
//       let otherThing = top.slice(0, 3);
//       if (otherThing[2] === "p") otherThing = top.slice(0, 2);
//       if (Math.abs(Number(thing) - x) <= 30) {
//         if (Math.abs(475 - (Number(otherThing) + y)) <= 20) {
//           allBlocks[i].remove();
//         }
//       }
//     }
//     console.log(allBlocks);
//     changeDirections();
//   }
//   //check for trampoline collisions
//   if (
//     ballPosition[1] == 34 &&
//     ballPosition[0] < currentPos + 110 &&
//     ballPosition[0] > currentPos
//   ) {
//     yDirection = 2;
//   }
//   if (
//     ballPosition[0] >= 750 ||
//     ballPosition[1] >= 480 ||
//     ballPosition[0] <= 0
//   ) {
//     //check for wall collisions
//     changeDirections();
//   }
//   //check for game over
//   if (ballPosition[1] <= -4) {
//     clearInterval(timerId);
//     scoreDisplay.innerHTML = "Game Over";
//     document.removeEventListener("keydown", moveUser);
//   }
// };
// const changeDirections = () => {
//   if (xDirection === 2 && yDirection === 2) {
//     yDirection = -2;
//     return;
//   }
//   if (xDirection === -2 && yDirection === 2) {
//     xDirection = 2;
//     return;
//   }
//   if (xDirection === 2 && yDirection === -2) {
//     xDirection = -2;
//     return;
//   }
//   if (xDirection === -2 && yDirection === -2) {
//     yDirection = 2;
//     return;
//   }
// };
