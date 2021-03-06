import {displayScores} from "./leaderboard";

let SNAKE_SPEED = 200;
const SPEED_INCREASE = 40;
let changeSpeedFlag = 0;
const FIELD_SIZE = 20;


export const chooseLevel = () => {
    [...Array(5).keys()].forEach(i => {
        if (document.getElementById(i).checked === true) {
            SNAKE_SPEED = SNAKE_SPEED - SPEED_INCREASE * i;
        }
    })
};


const renderFinalScreen = () => {
    document.getElementById("game").style.display = "none";
    const form = document.getElementById("form");
    form.innerHTML = "<div class='end-game'><span class='end-game__instructions'>Please, enter your name</span> " +
        "<form id='form' class = 'end-game__form'>" +
        "<input class='end-game__text-field' id='text-field' type='text'>" +
        "<input type='submit' class='submit-button' value='Enter'></form></div>";
};

const saveResult = (score) => {
    const name = document.getElementById("text-field").value;
    localStorage.setItem(name, score);
};

const Cell = () => {
    let cell = document.createElement("div");
    cell.className = "cell";
    return cell;
};

const Row = (length) => {
    let row = document.createElement("div");
    row.className = "row";
    new Array(length).fill(0).map(() => Cell())
        .forEach((child) => row.appendChild(child));
    return row;
};

export const Field = (size) => {

    let field = document.createElement("div");
    field.className = "game__field";
    new Array(size).fill(0).map(() => Row(size))
        .forEach((child) => field.appendChild(child));

    [...Array(FIELD_SIZE).keys()].forEach(i => {
        [...Array(FIELD_SIZE).keys()].forEach( j => {
            let cell = field.children[i].children[j];
            if (i === 0) {
                cell.up = null;
            } else {
                cell.up = field.children[i - 1].children[j];
            }
            if (j === 0) {
                cell.left = null;
            } else {
                cell.left = field.children[i].children[j - 1];
            }
            if (j === FIELD_SIZE - 1) {
                cell.right = null;
            } else {
                cell.right = field.children[i].children[j + 1];
            }
            if (i === FIELD_SIZE - 1) {
                cell.down = null;
            } else {
                cell.down = field.children[i + 1].children[j];
            }
        });
    });
    return field;
};

const spawnFood = (field) => {
    let food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];
    food.className === "cell snake_cell" ? spawnFood() : () => {
    };
    food.eat = true;
    food.className = "cell food_cell";
};

export const spawnSnake = (field) => {
    [...Array(3).keys()].forEach(i => field.children[0].children[i].className = "cell snake_cell");
    let snake = field.children[0].children[2];
    snake.tail = field.children[0].children[1];
    snake.tail.tail = field.children[0].children[0];
    snake.direction = "down";
    return snake;
};

export const changeDirection = (event, snake) => {
    if (event.code === "ArrowUp") {
        if (snake[0].direction === "left" || snake[0].direction === "right") {
            snake[0].direction = "up";
        }
    }
    if (event.code === "ArrowDown") {
        if (snake[0].direction === "left" || snake[0].direction === "right") {
            snake[0].direction = "down";
        }
    }
    if (event.code === "ArrowLeft") {
        if (snake[0].direction === "up" || snake[0].direction === "down") {
            snake[0].direction = "left";
        }
    }
    if (event.code === "ArrowRight") {
        if (snake[0].direction === "up" || snake[0].direction === "down") {
            snake[0].direction = "right";
        }
    }
};


export const startScreen = (field,  snake) => {
    displayScores();
    document.getElementById("game").style.display = "none";
    let startButton = document.getElementById("start-screen__button");
    startButton.addEventListener("click", () => startGame(field, snake));
};


const Game = (field, score, snake) => {
    let nextCell = snake[0][snake[0].direction];

    if (nextCell && (nextCell.className !== "cell snake_cell")) {
        nextCell.direction = snake[0].direction;
        nextCell.tail = snake[0];
        if (nextCell.eat) {
            spawnFood(field);
            score.textContent++;
        }
        let currentCell = snake[0].tail;
        let previousCell;
        while (currentCell.tail) {
            previousCell = currentCell;
            currentCell = currentCell.tail;
        }
        if (!currentCell.eat) {
            delete previousCell.tail;
        } else {
            currentCell.eat = false;

        }
        currentCell.className = "cell";

        snake[0] = nextCell;
        snake[0].className = "cell snake_cell";


        if (score.textContent % 10 === 0 && changeSpeedFlag && SNAKE_SPEED !== SPEED_INCREASE) {
            SNAKE_SPEED = SNAKE_SPEED - SPEED_INCREASE;
            setTimeout(Game, SNAKE_SPEED, field, score, snake);
            changeSpeedFlag = 0;
        }
        else if ((score.textContent - 1) % 10 === 0) {
            changeSpeedFlag = 1;
            setTimeout(Game, SNAKE_SPEED, field, score, snake)
        }

        else {
            setTimeout(Game, SNAKE_SPEED, field, score, snake)
        }

    } else {
        renderFinalScreen();
        let form = document.getElementById("form");
        form.addEventListener("submit", () => {
            saveResult(score.textContent);
        });

    }

};


const startGame = (field, snake) => {
    chooseLevel();

    document.getElementById("game").style.display = "block";
    document.getElementById("start-screen").style.display = "none";

    let div = document.getElementById("game__field");
    div.appendChild(field);

    let score = document.getElementById("score");
    score.textContent = 0;

    spawnFood(field);
    setTimeout(Game, SNAKE_SPEED, field, score, snake);

};


