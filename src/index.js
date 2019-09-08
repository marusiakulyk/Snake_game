import {Field, startScreen, changeDirection, spawnSnake} from "../src/snake";

const FIELD_SIZE = 20;

let field = Field(FIELD_SIZE);
let snake = [spawnSnake(field)];


startScreen(field,  snake);
console.log(localStorage);
addEventListener("keydown", (event) => changeDirection(event, snake), false);
