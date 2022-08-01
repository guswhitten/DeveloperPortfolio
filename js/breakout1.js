const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;
const userStart = [230, 10];
let currentPosition = userStart;
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timerId;
let score = 0;
const blocks = [];
//my block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    this.topLeft = [xAxis, yAxis + blockHeight];
  }
}
//add user
const bUser = document.createElement("div");
bUser.classList.add("bUser");
grid.appendChild(bUser);

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
grid.appendChild(ball);

function startBreakout() {
  document.addEventListener("keydown", moveUser);
  timerId = setInterval(moveBall, 10);
  initBlocks(10, 270);
  drawUser();
  drawBall();
  addBlocks();
  // document.querySelector(".endgame").style.display = "none"; //hides game result until later
  // document.querySelector(".endgame .text").innerText = ""; //initializes game result text to empty string
  // document.querySelector(".selectSym").style.display = "block"; //displays selectSymbol element on new line, taking up whole width
  // for (let i = 0; i < cells.length; i++) {
  //   cells[i].innerText = "";
  //   cells[i].style.removeProperty("background-color");
  // }
}

function initBlocks(a, b) {
  for (let i = 0; i < 3; i++) {
    let c = a,
      d = b - i * 30;
    blocks.push(new Block(c, d));
    for (let i = 0; i < 4; i++) {
      c += 110;
      blocks.push(new Block(c, d));
    }
  }
}

//draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
    console.log(blocks[i].bottomLeft);
  }
}

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        console.log(currentPosition[0] > 0);
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        console.log(currentPosition[0]);
        drawUser();
      }
      break;
  }
}

//draw User
function drawUser() {
  bUser.style.left = currentPosition[0] + "px";
  bUser.style.bottom = currentPosition[1] + "px";
}

//draw Ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

//check for collisions
function checkForCollisions() {
  //check for block collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = "You Win!";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }
  // check for wall hits
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[0] <= 0 ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter
  ) {
    changeDirection();
  }

  //check for user collision
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  //game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = "You lose!";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
