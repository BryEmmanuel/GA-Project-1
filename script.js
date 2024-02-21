// GAME BOARD IS DONE BUT NOW WE GOTTA CREATE OUR GAME BOARD VIA JAVASCRIPT

const gameBoard = document.getElementById("game-board");
// defining variables
let snake = [{ x: 10, y: 10 }];
let cell = [{ x: 15, y: 15 }];

function createBoard() {
  // clear the board everytime this function runs
  gameBoard.innerHTML = "";
  createSnake();
  cell.forEach(function (cell) {
    const elementFood = createFood("div", "food");
    setLocation(elementFood, cell);
    gameBoard.appendChild(elementFood);
  });
}
// snake array contains object that has x and y coordinates which corresponds to the location on the grid

function createSnake() {
  // snake is an array of kvp for coordinates
  // this function creates a 'div class' of 10px x 10px to represent 1 grid cell of each snake section, using the css .snake
  // define snake outside this function
  // loop through snake's kvp to perform a function for each kvp
  snake.forEach(function (cell) {
    const elementSnake = createFood("div", "snake");
    setLocation(elementSnake, cell);
    gameBoard.appendChild(elementSnake);
  });
}

// creating individual cell/box - to be used for snake or food
function createFood(tag, className) {
  // create the cell/box using 'tag' and 'className' as parameters
  const box = document.createElement(tag);
  // set the cell's/box's class name to the parameter I define : which can be snake or food
  box.className = className;
  // box = div.food when createFood();
  return box;
}

// based on coordinates, set the location of the snake and food

function setLocation(cell, position) {
  // set the cell location to a specific coordinate in the grid
  cell.style.gridColumn = position.x;
  cell.style.gridRow = position.y;
}

// movement of Snake
function moveSnake() {
  document.body.addEventListener("keydown", function (event) {
    const key = event.key;
    switch (key) {
      case "ArrowLeft":
        console.log("left arrow pressed");
        console.log(snake[0].x);
        for (let i = 0; i < snake.length; i++) {
          return (snake = snake[i].x - 1);
        }
        break;
      case "ArrowRight":
        console.log("right arrow pressed");
        for (let i = 0; i < snake.length; i++) {
          snake[i].x + 1;
        }
        break;
      case "ArrowUp":
        console.log("up arrow pressed");
        for (let i = 0; i < snake.length; i++) {
          snake[i].y - 1;
        }
        break;
      case "ArrowDown":
        console.log("down arrow pressed");
        for (let i = 0; i < snake.length; i++) {
          snake[i].y + 1;
        }
        break;
    }
  });
}
moveSnake();
/*

// there should be a gameloop function that continuously runs the game

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
