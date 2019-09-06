import {Field, startScreen, changeDirection} from "../src/snake";

const FIELD_SIZE = 20;

let field = Field(FIELD_SIZE);
let snake = [field.spawnSnake(field)];
startScreen(field, snake);

addEventListener("keydown", (event) => changeDirection(event, snake), false);
