const FIELD_SIZE = 20;
let SNAKE_SPEED = 200;
let changeSpeedFlag = 0;

const displayScores = () => {
    let scores = sortLocalStorage();
    let scoresTable = document.createElement("table");
    scoresTable.className = "start-screen__leaderboard";
    scoresTable.innerHTML = "<tr><th>Name</th><th>Score</th>";
    document.getElementById('start-screen').appendChild(scoresTable);
    [...Array(Math.min(scores.length, 5)).keys()].forEach(i => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${scores[i][0]}</td> <td>${scores[i][1]}</td>`;
        scoresTable.appendChild(tr);
    });

};

const sortLocalStorage = () => Object.keys(localStorage)
        .map((k) =>[k, localStorage.getItem(k)])
    .sort((i, j) => j[1] - i[1])
;

const renderFinalScreen = () =>{
    document.getElementById("game").style.display = "none";
    const form = document.getElementById("form");
    form.innerHTML = "<div class='end-game'><span class='end-game__instructions'>Please, enter your name</span> " +
        "<form id='form' class = 'end-game__form'>" +
        "<input class='end-game__text-field' id='text-field' type='text'>" +
        "<input type='submit' class='submit-button' title='Enter'></form></div>";
};

const saveResult = (score) => {
    const name = document.getElementById("text-field").value;
    localStorage.setItem(name,score);
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

const Field = (size) => {

    let field = document.createElement("div");
    field.className = "game__field";
    field.spawnSnake = spawnSnake;
    new Array(size).fill(0).map(() => Row(size))
        .forEach((child) => field.appendChild(child));

    for (let i = 0; i < FIELD_SIZE; i++) {
        for (let j = 0; j < FIELD_SIZE; j++) {
            cell = field.children[i].children[j];
            if (i === 0) {
                cell.up = null;
            } else {
                cell.up = field.children[i-1].children[j];
            }
            if (j === 0) {
                cell.left = null;
            } else {
                cell.left = field.children[i].children[j-1];
            }
            if (j === FIELD_SIZE - 1) {
                cell.right = null;
            } else {
                cell.right = field.children[i].children[j+1];
            }
            if (i === FIELD_SIZE - 1) {
                cell.down = null;
            } else {
                cell.down = field.children[i+1].children[j];
            }
        }
    }
    return field;
};

const spawnFood = (field) => {
    let food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];
    food.className === "cell snake_cell" ? spawnFood() : () => {};
    food.eat = true;
    food.className = "cell food_cell";
};

const spawnSnake = (field) => {
    [...Array(3).keys()].forEach(i => field.children[0].children[i].className = "cell snake_cell");
    let snake = field.children[0].children[2];
    snake.tail = field.children[0].children[1];
    snake.tail.tail = field.children[0].children[0];
    snake.direction = "down";
    return snake;
};

const changeDirection = (event) => {
    if (event.code ===  "ArrowUp") {
        if (snake.direction === "left" || snake.direction === "right") {
            snake.direction = "up";
        }
    }
    if (event.code ===  "ArrowDown") {
        if (snake.direction === "left" || snake.direction === "right") {
            snake.direction = "down";
        }
    }
    if (event.code ===  "ArrowLeft") {
        if (snake.direction === "up" || snake.direction === "down") {
            snake.direction = "left";
        }
    }
    if (event.code ===  "ArrowRight") {
        if (snake.direction === "up" || snake.direction === "down") {
            snake.direction = "right";
        }
    }
};


const startScreen = () => {
    displayScores();
    document.getElementById("game").style.display = "none";
    let startButton = document.getElementById("start-screen__button");
    startButton.addEventListener("click", startGame);
};



const Game = (field,  score) => {
    let nextCell = snake[snake.direction];

    if (nextCell && (nextCell.className !== "cell snake_cell")) {
        nextCell.direction = snake.direction;
        nextCell.tail = snake;
        if (nextCell.eat) {
            spawnFood(field);
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
            changeSpeedFlag = 1;
        }

        if(score.textContent%10 === 0 && changeSpeedFlag){
            SNAKE_SPEED = SNAKE_SPEED-20;
            setTimeout(Game, SNAKE_SPEED, field,  score);
            changeSpeedFlag = 0;
        }

        else{setTimeout(Game, SNAKE_SPEED, field,  score)}
    }
    else {
        renderFinalScreen();
        let form = document.getElementById("form");
        form.addEventListener("submit", ()=>{
            saveResult(score.textContent);
            console.log(score.textContent);
            console.log(localStorage);
        });

    }

};


const startGame = () => {
    document.getElementById("game").style.display = "block";
    document.getElementById("start-screen").style.display = "none";
    let field = Field(FIELD_SIZE);

    let div = document.getElementById("game__field");
    div.appendChild(field);


    snake = field.spawnSnake(field);

    let score = document.getElementById("score");
    score.textContent = 0;

    spawnFood(field);
    intervalID = setTimeout(Game, SNAKE_SPEED, field,  score);

};

startScreen();
addEventListener("keydown", changeDirection, false);

