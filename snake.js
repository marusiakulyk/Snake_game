FIELD_SIZE = 20;
SNAKE_SPEED = 500;


const changeDirection = (event) => {
    if (event.keyCode ==  38) {
        if (snake.direction == "left" || snake.direction == "right") {
            snake.direction = "up";
        }
    }
    if (event.keyCode ==  40) {
        if (snake.direction == "left" || snake.direction == "right") {
            snake.direction = "down";
        }
    }
    if (event.keyCode ==  37) {
        if (snake.direction == "up" || snake.direction == "down") {
            snake.direction = "left";
        }
    }
    if (event.keyCode ==  39) {
        if (snake.direction == "up" || snake.direction == "down") {
            snake.direction = "right";
        }
    }
};

const spawnSnake = () => {
    for (var i = FIELD_SIZE - 3; i < FIELD_SIZE; i++) {
        field.children[FIELD_SIZE - 1].children[i].className = "snake-cell";
    }

    snake = field.children[FIELD_SIZE - 1].children[FIELD_SIZE - 3];
    snake.tail = field.children[FIELD_SIZE - 1].children[FIELD_SIZE - 2];
    snake.tail.tail = field.children[FIELD_SIZE - 1].children[FIELD_SIZE - 1];

    snake.direction = "left";
    return snake;
};

const Cell = () => {
    let cell = document.createElement("div");
    cell.className = "cell";
    return cell;
};

const Row = (length) => {
    let row = document.createElement("div");
    row.className = "row";
    new Array(length).fill(length).map(() => Cell())
        .forEach((child) => row.appendChild(child));
    return row;
};

const Field = (size) => {

    let field = document.createElement("div");
    field.className = "game__field";
    field.spawnSnake = spawnSnake;
    new Array(size).fill(size).map(i => Row(size))
        .forEach((child) => field.appendChild(child));

    for (var i = 0; i < FIELD_SIZE; i++) {
        for (var j = 0; j < FIELD_SIZE; j++) {
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

const startScreen = () => {
    document.getElementById("game").style.display = "none";
    let startButton = document.getElementsByClassName("start-screen__button")[0];
    startButton.addEventListener("click", startGame);
};

const startGame = () => {
    document.getElementsByClassName("game")[0].style.display = "block";

    document.getElementById("start-screen").style.display = "none";

    field = Field(FIELD_SIZE);

    let div = document.getElementById("game__field");
    div.appendChild(field);


    snake = field.spawnSnake();

    points = document.getElementById("score");
    points.textContent = 0;

    spawnFood();
    intervalID = setInterval(snakeMotion, SNAKE_SPEED);

};

const spawnFood = () => {
    let food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];
    food.className === "cell snake_cell" ? spawnFood() : () => {}
    food.eat = true;
    food.className = "cell food_cell";
};


const snakeMotion = () => {
    var nextCell = snake[snake.direction];

    if (nextCell && (nextCell.className != "cell snake_cell")) {
        nextCell.direction = snake.direction;
        nextCell.tail = snake;
        if (nextCell.eat) {
            spawnFood();
            points.textContent++;
        }
        var currentCell = snake.tail;
        var previousCell;
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
        currentCell.style.background = " ";

        snake = nextCell;
        snake.className = "cell snake_cell";
    } else {
        setInterval = null;
        var newGame = confirm("You lose with " + points.textContent + " points!\nCreate a new game?");
        if (newGame) {
            document.getElementById("game__field").removeChild(field);
            startGame();
        }
        clearInterval(intervalID);
    }

};

startScreen();
addEventListener("keydown", changeDirection, false);
