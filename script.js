// GAME BOARD IS DONE BUT NOW WE GOTTA CREATE OUR GAME BOARD VIA JAVASCRIPT

const gameBoard = document.getElementById("game-board");
const instruction = document.getElementById("start-game");
const gameOverText = document.getElementById("game-over");
gameOverText.style.display = "none";
// defining variables
let cell = [{ x: 0, y: 0 }];
// cell would represent each individual square on the grid
let snake = [{ x: 10, y: 10 }];
// snake is an array of kvp for coordinates
let food = changeFood();
// food will be generated randomly, so we have to use a function to randomly generate possible x and y values within the grid
// note that food should not be generated on the snake itself - remember to check for condition
let gameOver = false;
let gameStart = true;
function createBoard() {
  // clear the board everytime this function runs
  gameBoard.innerHTML = "";
  createSnake();
  createFood();
}

// snake array contains object that has x and y coordinates which corresponds to the location on the grid

function createSnake() {
  // snake is an array of kvp for coordinates
  // this function creates a 'div class' of 10px x 10px to represent 1 grid cell of each snake section, using the css .snake
  // define snake outside this function
  // loop through snake's kvp to perform a function for each kvp
  // console.log(snake);
  snake.forEach(function (cell) {
    const elementSnake = createCell("div", "snake");
    setLocation(elementSnake, cell);
    gameBoard.appendChild(elementSnake);
  });
}

function createFood() {
  // food should be like snake, an array of kvp, except that it only has 1 kvp.
  // define food above

  food.forEach(function (cell) {
    const elementFood = createCell("div", "food");
    setLocation(elementFood, cell);
    gameBoard.appendChild(elementFood);
  });
}

// creating individual cell/box - to be used for snake or food
function createCell(tag, className) {
  // create the cell/box using 'tag' and 'className' as parameters
  const box = document.createElement(tag);
  // set the cell's/box's class name to the parameter I define : which can be snake or food
  box.className = className;
  // box = div.food when console.log(createFood());
  return box;
}

// based on coordinates, set the location of the snake and food

function setLocation(cell, position) {
  // set the cell location to a specific coordinate in the grid
  cell.style.gridColumn = position.x;
  cell.style.gridRow = position.y;
}

function changeFood() {
  // math.random gives a value of 0 to <1 , math.floor rounds that number down. 30 due to grid size
  const x = Math.floor(Math.random() * 30) + 1;
  const y = Math.floor(Math.random() * 30) + 1;
  return [{ x, y }];
}

// movement of Snake
let direction = "right";
function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "right":
      if (head.x <= 29) {
        head.x++;
      }
      break;
    case "down":
      if (head.y <= 29) {
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

  // unshift to add to the first element

  snake.unshift(head);

  //console.log(head);
  // when snake eats food
  if (head.x === food[0].x && head.y === food[0].y) {
    food = changeFood();
  } else {
    // pop to remove the last element
    snake.pop();
  }
  checkCollisionWithBorder();
  console.log(head.x);
  console.log(head.y);
  console.log(snake[0].x);
  console.log(snake[0].y);
  console.log(snake[1].x);
  console.log(snake[1].y);

  checkCollisionWithItself();
}

// event listener for keypress

// refer to https://www.toptal.com/developers/keycode for keycode
document.addEventListener("keydown", (event) => {
  if (gameStart === true && event.key === "Enter") {
    instruction.style.display = "none";
    gameLoop();
  } else if (gameOver === true && event.key === " ") {
    // function to refresh page
    location.reload();
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

// setInterval runs the functions every 'delay' - in this case, 1000ms.
function gameLoop() {
  const gameLoop = setInterval(function () {
    // create the snake
    createBoard();

    // move the snake
    moveSnake();
    // check for collision
  }, 300);
}

//gameLoop();

// to work on - collision

// with itself
function checkCollisionWithItself() {
  let head = { x: snake[0].x, y: snake[0].y };

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver = true;
      gameOverText.style.display = "block";
      clearInterval(gameLoop);
      console.log("Game Over");
    }
  }
}

// with border

function checkCollisionWithBorder() {
  let head = { x: snake[0].x, y: snake[0].y };
  //console.log(head.x);
  //console.log(head.y);
  // check collision - if it exceeds the row and column values
  if (head.x < 1 || head.x >= 30 || head.y < 1 || head.y >= 30) {
    gameOver = true;
    gameOverText.style.display = "block";
    clearInterval(gameLoop);
    console.log("Game over");
  }
}

// current issues
// food spawns where snake is sometimes then bugs out
// snake should not be able to touch itself - make a function for this
// snake moves out of the grid...

// Pseudo code for Snake

// Create a canvas (board) to house the snake and food
// Outside of the canvas is for scoring / highscore

/* ===================================================
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  |                                                   |
  =====================================================
  ============                        ================
 |  score:    |                      | high score:    |
  ============                        ================
*/

// variables required
// snake array
// food - coordinates
// direction

// functions required

// createBoard {
// set up the board as required
// }

// createSnake() {
// makes the initial snake
// snake should be an array
// position the snake either at a fixed position or a random position everytime the game starts
// }

// createFood() {
// makes the food
// set time intervals at which the food appears
// decide if food remains and then reappears if snake doesn't eat food or stays until food is eaten
// position the food random (ensure it doesn't appear where the snake is)

// }

// moveSnake() {
// should call the initial snake (at very fast interval to simulate movement) (maybe think of fps)
// snake starts stationary then only starts moving once the first button click is registered
// or constant push and shift to simulate initial movement from somewhere on the canvas
// refer to Game Movement - https://www.w3schools.com/graphics/tryit.asp?filename=trygame_movement_forward
// decide if snake moves in just the X and Y axis or it translates and have angles involved
// }

// change directions
// input arrow key movements to change the direction of the snake
// using an event listener
// how does it make the snake go horizontally/vertically
// }

// foodEaten() {
// how to register the 'eating', like how do you know if it eats the food
// maybe track location (via x-y coordinates and if 'snake' overlaps with 'food')
// push() 'food' into the snake[]
// }

// updateScore() {
// tracks the current amount of food 'eaten'
// returns amount
// }

// updateHighScore() {
// updates only once game ends and if current score >= high score
// }

// think about collision for food and snake. also with boundaries of the canvas
// should make no boundaries (?)
// colors for the snake/food - in css
// future plan - think of PvP , accept 'w a s d' for another player
// difficulty or additional resource like food but gives a penalty instead
// speed

// 2 difficulties that was brought up during the project proposals
// collision (with itself)
// how does the snake know how to follow the direction when turning corners
