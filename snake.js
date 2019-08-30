FIELD_SIZE = 20;
SNAKE_SPEED = 100;


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

const Field = (size) => {

    let field = document.createElement("div");
    field.className = "game__field";
    field.spawnSnake = spawnSnake;
    new Array(size).fill(0).map(() => Row(size))
        .forEach((child) => field.appendChild(child));

    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            cell = field.children[i].children[j];
            if (i == 0) {
                cell.up = null;
            } else {
                cell.up = field.children[i-1].children[j];
            }
            if (j == 0) {
                cell.left = null;
            } else {
                cell.left = field.children[i].children[j-1];
            }
            if (j == FIELD_SIZE - 1) {
                cell.right = null;
            } else {
                cell.right = field.children[i].children[j+1];
            }
            if (i == FIELD_SIZE - 1) {
                cell.down = null;
            } else {
                cell.down = field.children[i+1].children[j];
            }
        }
    }
    return field;
};

const spawnFood = () => {
    let food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];
    food.className === "cell snake_cell" ? spawnFood() : () => {};
    food.eat = true;
    food.className = "cell food_cell";
};

const spawnSnake = () => {
    [...Array(3).keys()].forEach(i => field.children[0].children[i].className = "cell snake_cell");
    snake = field.children[0].children[2];
    snake.tail = field.children[0].children[1];
    snake.tail.tail = field.children[0].children[0];
    snake.direction = "down";
    return snake;
};

const changeDirection = (event) => {
    if (event.code ==  "ArrowUp") {
        if (snake.direction == "left" || snake.direction == "right") {
            snake.direction = "up";
        }
    }
    if (event.code ==  "ArrowDown") {
        if (snake.direction == "left" || snake.direction == "right") {
            snake.direction = "down";
        }
    }
    if (event.code ==  "ArrowLeft") {
        if (snake.direction == "up" || snake.direction == "down") {
            snake.direction = "left";
        }
    }
    if (event.code ==  "ArrowRight") {
        if (snake.direction == "up" || snake.direction == "down") {
            snake.direction = "right";
        }
    }
};


const startScreen = () => {
    document.getElementById("game").style.display = "none";
    let startButton = document.getElementById("start-screen__button");
    console.log(startButton);
    startButton.addEventListener("click", startGame);
    changeSpeed = 0;
};



const Game = () => {
    let nextCell = snake[snake.direction];

    if (nextCell && (nextCell.className != "cell snake_cell")) {
        nextCell.direction = snake.direction;
        nextCell.tail = snake;
        if (nextCell.eat) {
            spawnFood();
            score.textContent++;
        }
        let currentCell = snake.tail;
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

        snake = nextCell;
        snake.className = "cell snake_cell";
        if((score.textContent-1)%10 === 0){
            changeSpeed = 1;
        }
        console.log(SNAKE_SPEED);
        console.log(changeSpeed);
        if(score.textContent%10 === 0 && changeSpeed){
            SNAKE_SPEED = SNAKE_SPEED-50;
            setTimeout(Game, SNAKE_SPEED);
            changeSpeed = 0;
            console.log(SNAKE_SPEED);
        }

        else{setTimeout(Game, SNAKE_SPEED)}
    } else {
        setTimeout = null;
        let newGame = confirm("You lose with " + score.textContent + " score!\nCreate a new game?");
        if (newGame) {
            document.getElementById("game__field").removeChild(field);
            startGame();
        }
        clearTimeout(intervalID);
    }

};


const startGame = () => {
    document.getElementById("game").style.display = "block";
    document.getElementById("start-screen").style.display = "none";

    field = Field(FIELD_SIZE);

    let div = document.getElementById("game__field");
    div.appendChild(field);


    snake = field.spawnSnake();

    score = document.getElementById("score");
    score.textContent = 0;

    spawnFood();
    intervalID = setTimeout(Game, SNAKE_SPEED);

};

startScreen();
addEventListener("keydown", changeDirection, false);
