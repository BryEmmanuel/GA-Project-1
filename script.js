// GAME BOARD IS DONE BUT NOW WE GOTTA CREATE OUR GAME BOARD VIA JAVASCRIPT

// Defining all HTML elements

const gameBoard = document.getElementById("game-board");
const instruction = document.getElementById("start-game");
// set game over text to not appear at the start
const gameOverText = document.getElementById("game-over");
gameOverText.style.display = "none";
// set restart text to not appear at the start
const restart = document.getElementById("restart");
restart.style.display = "none";
// set initial highscore
// display the high score at the start of the game
let highScore = 0;
document.getElementById("high-score").innerHTML = "HighScore: " + highScore;

// Defining all variables
// Cell, Snake and Food are arrays containing KVPs of coordinates
// each cell represents one grid box , with X and Y coordinates
let cell = [{ x: 0, y: 0 }];
// initial snake starts at X: 10, Y: 10
let snake = [{ x: 10, y: 10 }];
// food be a function that randomly generates food and different X and Y positions
// food should also not be generated on snake itself (note this for later)
let food = changeFood();
// set the inital state of the game
let gameOver = false;
let gameStart = false;
let foodEaten = false;
// set the delay at which setInterval is called later on , also known as the game loop itself
let gameSpeed = 200;
// set initial points of the game
let points = 0;
// define gameLoop
let gameLoop;

// =========================================== FUNCTIONS ================================================ //

// to create the game board that houses the snake and food
function createBoard() {
  // clear the board everytime this function runs
  gameBoard.innerHTML = "";
  // create snake
  createSnake();
  // create food
  createFood();
}

// function to create snake
function createSnake() {
  // iterate through the snake, creates a cell (corresponding to the grid)
  snake.forEach(function (cell) {
    // creates a cell and gives it a class 'div' and name of 'snake'
    const elementSnake = createCell("div", "snake");
    // sets the location on the grid
    setLocation(elementSnake, cell);
    // create the snake on the board
    gameBoard.appendChild(elementSnake);
  });
}

function createFood() {
  // similar to create snake, except name is 'food'
  food.forEach(function (cell) {
    const elementFood = createCell("div", "food");
    setLocation(elementFood, cell);
    gameBoard.appendChild(elementFood);
  });
}

// creating individual cell/box, using 'tag' and 'className' as parameters - to be used for snake or food
function createCell(tag, className) {
  // using 'box' here to prevent confusion with defined 'cell' variable
  const box = document.createElement(tag);
  // set the cell's class name to the parameter I define : which can be snake or food
  box.className = className;
  // e.g box = div.food when console.log(createFood());
  return box;
}

// setting the location of the created 'cell' based on the X and Y coordinates
function setLocation(cell, position) {
  // set the cell location to a specific coordinate in the grid
  cell.style.gridColumn = position.x;
  cell.style.gridRow = position.y;
}

// to randomly generate food at various location on the grid
function changeFood() {
  // math.random gives a value of 0 to <1 , math.floor rounds that number down. 30 due to grid size. + 1 so it doesn't give 0.
  const x = Math.floor(Math.random() * 30) + 1;
  const y = Math.floor(Math.random() * 30) + 1;
  // return an array of kvp that is stored in food
  return [{ x, y }];
}

// movement of Snake
// set initial direction to allow continuous movement
let direction = "right";
function moveSnake() {
  // create the 'head' of the snake so that it always start at the 0 index
  let head = { x: snake[0].x, y: snake[0].y };
  // check for the 4 directions and increment that direction, restricting it to the grid(i.e 30 and 1)
  switch (direction) {
    case "right":
      if (head.x <= 30) {
        head.x++;
      }
      break;
    case "down":
      if (head.y <= 30) {
        head.y++;
      }
      break;
    case "left":
      if (head.x >= 1) {
        head.x--;
      }
      break;
    case "up":
      if (head.y >= 1) {
        head.y--;
      }
      break;
  }

  // unshift to add 'head' to the front of the snake
  snake.unshift(head);

  // when snake eats food
  if (head.x === food[0].x && head.y === food[0].y) {
    // set the condition
    foodEaten = true;
    // increase the speed of snake each time food is eaten
    increaseSpeed();
    // increase the points
    increaseScore();
    // generate new food
    food = changeFood();
    // to prevent food from spawning on itself - checks if new food generated is in the snake
    for (let i = 0; i < snake.length; i++) {
      if (food[0].x === snake[i].x && food[0].y === snake[i].y) {
        food = changeFood();
      }
    }
    // revert to initial state of food eaten
    foodEaten = false;
  } else {
    // if food not eaten, pop to remove the last element to simulate movement
    snake.pop();
  }
}

// event listener for keypress
// refer to https://www.toptal.com/developers/keycode for keycode
document.addEventListener("keydown", (event) => {
  if (gameStart === false && event.key === "Enter") {
    startGame();
  } else if (gameOver === true && event.key === " ") {
    endGameAndTryAgain();
  } else {
    switch (event.key) {
      // also prevents moving in the opposite direction
      case "ArrowUp":
        if (direction != "down") {
          direction = "up";
        }
        break;
      case "ArrowRight":
        if (direction != "left") {
          direction = "right";
        }
        break;
      case "ArrowDown":
        if (direction != "up") {
          direction = "down";
        }
        break;
      case "ArrowLeft":
        if (direction != "right") {
          direction = "left";
        }
        break;
    }
  }
});

// to start the game
function startGame() {
  // set the state of the game
  gameStart = true;
  // make the instruction text disappear
  instruction.style.display = "none";
  // change the text of points
  document.getElementById("points").innerHTML = "Points: " + points;
  // run the game at the current game interval
  runGame(gameSpeed);
}

// the game loop runGame accepts a new game speed each time it is ran , this allows the increment of the speed of the snake
function runGame(newGameSpeed) {
  // stops the previous game interval
  clearInterval(gameLoop);
  // create a game loop that repeats on its own based on the time provided
  gameLoop = setInterval(function () {
    // create the board/snake/food
    createBoard();
    // move the snake
    moveSnake();
    // check collision - game stops the moment collision is detected
    checkCollisionWithBorder(gameLoop);
    checkCollisionWithItself(gameLoop);
  }, newGameSpeed);
}

// to increase the speed of the snake
function increaseSpeed() {
  if (foodEaten === true && gameSpeed > 50) {
    gameSpeed -= 5;
    // note that gameSpeed changes and is passed into runGame(), hence the increment works
    runGame(gameSpeed);
  }
}

// Checking for collision
// with itself
function checkCollisionWithItself(gameLoop) {
  let head = { x: snake[0].x, y: snake[0].y };
  // iterate through the 'snake' to check if the 'head' of the snake touches any part of itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      // set the game state
      gameOver = true;
      // make the game over text appear
      gameOverText.style.display = "block";
      // make the restart text appear
      restart.style.display = "block";
      // stop the loop
      clearInterval(gameLoop);
    }
  }
}
// with border
function checkCollisionWithBorder(gameLoop) {
  let head = { x: snake[0].x, y: snake[0].y };
  // check collision - if it exceeds the row and column values
  if (head.x < 1 || head.x > 30 || head.y < 1 || head.y > 30) {
    // set the state of the game
    gameOver = true;
    // make the game over text appear
    gameOverText.style.display = "block";
    // make the restart text appear
    restart.style.display = "block";
    // stop the loop
    clearInterval(gameLoop);
  }
}

// increase the score
function increaseScore() {
  // only increase score if food is eaten
  if (foodEaten == true) {
    // points increment
    points += 1;
    // set the text to new points
    document.getElementById("points").innerHTML = "Points: " + points;
  }
}

// increase the high score
function increaseHighScore() {
  // only increase highscore whenever initial points is higher than the current highscore
  if (points > highScore) {
    highScore = points;
    // set the text to new high score
    document.getElementById("high-score").innerHTML = "HighScore: " + highScore;
  }
}

// to restart the game
function endGameAndTryAgain() {
  // reset the state of the game
  resetGame();
  // revert the game to it's initial state
  gameStart = false;
  // start the game
  startGame();
}

// to reset the initial state of the game
function resetGame() {
  // set everything to how it was before the starting the game of the first time
  restart.style.display = "none";
  gameOverText.style.display = "none";
  // call increase high score here such that it gets the previous score before 'points' is reset
  increaseHighScore();
  // everything below here resets the game back to initial state
  points = 0;
  document.getElementById("points").innerHTML = points;
  snake = [{ x: 10, y: 10 }];
  food = changeFood();
  direction = "right";
  gameSpeed = 200;
}
