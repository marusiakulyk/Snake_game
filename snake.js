FIELD_SIZE = 20;
SNAKE_SPEED = 100;

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


function touchCatched(event) {
    touch = event;
}

function touchEnded(event) {
    var offsetX = touch.changedTouches[0].clientX - event.changedTouches[0].clientX;
    var offsetY = touch.changedTouches[0].clientY - event.changedTouches[0].clientY;

    var rule = {};

    if (Math.abs(offsetX) > Math.abs(offsetY)) {
        if (offsetX < 0) {
            rule.keyCode = 39;
        } else {
            rule.keyCode = 37;
        }
    } else {
        if (offsetY < 0) {
            rule.keyCode = 40;
        } else {
            rule.keyCode = 38;
        }
    }
    changeDirection(rule);
}

function spawnSnake() {
    for (var i = FIELD_SIZE - 3; i < FIELD_SIZE; i++) {
        field.children[FIELD_SIZE - 1].children[i].className = "snake-cell";
    }

    snake = field.children[FIELD_SIZE - 1].children[FIELD_SIZE - 3];
    snake.tail = field.children[FIELD_SIZE - 1].children[FIELD_SIZE - 2];
    snake.tail.tail = field.children[FIELD_SIZE - 1].children[FIELD_SIZE - 1];

    snake.direction = "left";
    return snake;
}

const Cell = () => {
    var cell = document.createElement("div");
    cell.className = "cell";
    return cell;
};

const Row = (length) => {

    var row = document.createElement("div");
    row.className = "row";

    for (var i = 0; i < length; i++) {
        row.appendChild(Cell());
    }
    return row;
};

function Field(size) {

    var field = document.createElement("div");
    field.className = "game__field";
    field.spawnSnake = spawnSnake;

    for (var i = 0; i < size; i++) {
        field.appendChild(Row(size));
    }

    for (var i = 0; i < FIELD_SIZE; i++) {
        for (var j = 0; j < FIELD_SIZE; j++) {
            cell = field.children[i].children[j];
            if (i == 0) {
                cell.up = field.children[FIELD_SIZE-1].children[j];
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
}

function startScreen() {
    document.getElementById("game").style.display = "none";

    var preloadScreen = document.getElementsByClassName("start-screen")[0];
    var startButton = document.getElementsByClassName("start-screen__button")[0];
    startButton.addEventListener("click", startGame);
}

function startGame() {
    document.getElementsByClassName("game")[0].style.display = "block";

    document.getElementById("start-screen").style.display = "none";

    field = Field(FIELD_SIZE);

    var div = document.getElementById("game__field");
    div.appendChild(field);


    snake = field.spawnSnake();

    points = document.getElementById("score");
    points.textContent = 0;

    spawnFood();
    intervalID = window.setInterval(snakeMotion, SNAKE_SPEED);

}

/* up: 38; down:40; left: 37; right: 39*/


function spawnFood() {
    var food;
    do {
        food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];
    } while (food.className == "snake-cell");
    food.eat = true;
    food.style.background = "white";
}

function snakeMotion() {
    var nextCell = snake[snake.direction];
    SNAKE_SPEED = Math.floor(points/10)*100;
    if (nextCell && (nextCell.className != "snake-cell")) {
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
        currentCell.style.background = "";
    } else {
        window.setInterval = null;
        var newGame = confirm("You lose with " + points.textContent + " points!\nCreate a new game?");
        if (newGame) {
            document.getElementById("game").removeChild(field);
            startGame();
        }
        clearInterval(intervalID);
    }
    snake = nextCell;
    snake.className = "snake-cell";
}

window.onload = startScreen();
window.addEventListener("keydown", changeDirection, false);
window.addEventListener("touchstart", touchCatched, false);
window.addEventListener("touchmove", touchEnded, false);
