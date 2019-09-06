/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_snake__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/snake */ \"./src/snake.js\");\n\r\n\r\nconst FIELD_SIZE = 20;\r\n\r\nlet field = Object(_src_snake__WEBPACK_IMPORTED_MODULE_0__[\"Field\"])(FIELD_SIZE);\r\nlet snake = [field.spawnSnake(field)];\r\nObject(_src_snake__WEBPACK_IMPORTED_MODULE_0__[\"startScreen\"])(field, snake);\r\n\r\naddEventListener(\"keydown\", (event) => Object(_src_snake__WEBPACK_IMPORTED_MODULE_0__[\"changeDirection\"])(event, snake), false);\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/leaderboard.js":
/*!****************************!*\
  !*** ./src/leaderboard.js ***!
  \****************************/
/*! exports provided: displayScores */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayScores\", function() { return displayScores; });\nconst displayScores = () => {\r\n    let scores = sortLocalStorage();\r\n    let scoresTable = document.createElement(\"table\");\r\n    scoresTable.className = \"start-screen__leaderboard\";\r\n    scoresTable.innerHTML = \"<tr><th>Name</th><th>Score</th>\";\r\n    document.getElementById('start-screen').appendChild(scoresTable);\r\n    [...Array(Math.min(scores.length, 5)).keys()].forEach(i => {\r\n        let tr = document.createElement('tr');\r\n        tr.innerHTML = `<td>${scores[i][0]}</td> <td>${scores[i][1]}</td>`;\r\n        scoresTable.appendChild(tr);\r\n    });\r\n\r\n};\r\n\r\n\r\nconst sortLocalStorage = () => Object.keys(localStorage)\r\n    .map((k) => [k, localStorage.getItem(k)])\r\n    .sort((i, j) => j[1] - i[1])\r\n;\r\n\r\n\n\n//# sourceURL=webpack:///./src/leaderboard.js?");

/***/ }),

/***/ "./src/snake.js":
/*!**********************!*\
  !*** ./src/snake.js ***!
  \**********************/
/*! exports provided: chooseLevel, Field, spawnSnake, changeDirection, startScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"chooseLevel\", function() { return chooseLevel; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Field\", function() { return Field; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"spawnSnake\", function() { return spawnSnake; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"changeDirection\", function() { return changeDirection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startScreen\", function() { return startScreen; });\n/* harmony import */ var _leaderboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./leaderboard */ \"./src/leaderboard.js\");\n\r\n\r\nlet SNAKE_SPEED = 200;\r\nconst SPEED_INCREASE = 40;\r\nlet changeSpeedFlag = 0;\r\nconst FIELD_SIZE = 20;\r\n\r\n\r\nconst chooseLevel = () => {\r\n    [...Array(5).keys()].forEach(i => {\r\n        if (document.getElementById(i).checked === true) {\r\n            SNAKE_SPEED = SNAKE_SPEED - SPEED_INCREASE * i;\r\n        }\r\n    })\r\n};\r\n\r\n\r\nconst renderFinalScreen = () => {\r\n    document.getElementById(\"game\").style.display = \"none\";\r\n    const form = document.getElementById(\"form\");\r\n    form.innerHTML = \"<div class='end-game'><span class='end-game__instructions'>Please, enter your name</span> \" +\r\n        \"<form id='form' class = 'end-game__form'>\" +\r\n        \"<input class='end-game__text-field' id='text-field' type='text'>\" +\r\n        \"<input type='submit' class='submit-button' value='Enter'></form></div>\";\r\n};\r\n\r\nconst saveResult = (score) => {\r\n    const name = document.getElementById(\"text-field\").value;\r\n    localStorage.setItem(name, score);\r\n};\r\n\r\nconst Cell = () => {\r\n    let cell = document.createElement(\"div\");\r\n    cell.className = \"cell\";\r\n    return cell;\r\n};\r\n\r\nconst Row = (length) => {\r\n    let row = document.createElement(\"div\");\r\n    row.className = \"row\";\r\n    new Array(length).fill(0).map(() => Cell())\r\n        .forEach((child) => row.appendChild(child));\r\n    return row;\r\n};\r\n\r\nconst Field = (size) => {\r\n\r\n    let field = document.createElement(\"div\");\r\n    field.className = \"game__field\";\r\n    field.spawnSnake = spawnSnake;\r\n    new Array(size).fill(0).map(() => Row(size))\r\n        .forEach((child) => field.appendChild(child));\r\n\r\n    for (let i = 0; i < FIELD_SIZE; i++) {\r\n        for (let j = 0; j < FIELD_SIZE; j++) {\r\n            let cell = field.children[i].children[j];\r\n            if (i === 0) {\r\n                cell.up = null;\r\n            } else {\r\n                cell.up = field.children[i - 1].children[j];\r\n            }\r\n            if (j === 0) {\r\n                cell.left = null;\r\n            } else {\r\n                cell.left = field.children[i].children[j - 1];\r\n            }\r\n            if (j === FIELD_SIZE - 1) {\r\n                cell.right = null;\r\n            } else {\r\n                cell.right = field.children[i].children[j + 1];\r\n            }\r\n            if (i === FIELD_SIZE - 1) {\r\n                cell.down = null;\r\n            } else {\r\n                cell.down = field.children[i + 1].children[j];\r\n            }\r\n        }\r\n    }\r\n    return field;\r\n};\r\n\r\nconst spawnFood = (field) => {\r\n    let food = field.children[Math.floor(Math.random() * FIELD_SIZE)].children[Math.floor(Math.random() * FIELD_SIZE)];\r\n    food.className === \"cell snake_cell\" ? spawnFood() : () => {\r\n    };\r\n    food.eat = true;\r\n    food.className = \"cell food_cell\";\r\n};\r\n\r\nconst spawnSnake = (field) => {\r\n    [...Array(3).keys()].forEach(i => field.children[0].children[i].className = \"cell snake_cell\");\r\n    let snake = field.children[0].children[2];\r\n    snake.tail = field.children[0].children[1];\r\n    snake.tail.tail = field.children[0].children[0];\r\n    snake.direction = \"down\";\r\n    return snake;\r\n};\r\n\r\nconst changeDirection = (event, snake) => {\r\n    console.log(event);\r\n    console.log(snake);\r\n    // snake = snake[0];\r\n    if (event.code === \"ArrowUp\") {\r\n        if (snake[0].direction === \"left\" || snake[0].direction === \"right\") {\r\n            snake[0].direction = \"up\";\r\n        }\r\n    }\r\n    if (event.code === \"ArrowDown\") {\r\n        if (snake[0].direction === \"left\" || snake[0].direction === \"right\") {\r\n            snake[0].direction = \"down\";\r\n        }\r\n    }\r\n    if (event.code === \"ArrowLeft\") {\r\n        if (snake[0].direction === \"up\" || snake[0].direction === \"down\") {\r\n            snake[0].direction = \"left\";\r\n        }\r\n    }\r\n    if (event.code === \"ArrowRight\") {\r\n        if (snake[0].direction === \"up\" || snake[0].direction === \"down\") {\r\n            snake[0].direction = \"right\";\r\n        }\r\n    }\r\n    console.log(snake[0].direction);\r\n};\r\n\r\n\r\nconst startScreen = (field, snake) => {\r\n    Object(_leaderboard__WEBPACK_IMPORTED_MODULE_0__[\"displayScores\"])();\r\n    document.getElementById(\"game\").style.display = \"none\";\r\n    let startButton = document.getElementById(\"start-screen__button\");\r\n    startButton.addEventListener(\"click\", () => startGame(field, snake));\r\n};\r\n\r\n\r\nconst Game = (field, score, snake) => {\r\n    console.log(\"f=game: \", snake[0].direction);\r\n    console.log(\"f=game: \", snake);\r\n    let nextCell = snake[0][snake[0].direction];\r\n    console.log(\"next\", nextCell);\r\n\r\n    if (nextCell && (nextCell.className !== \"cell snake_cell\")) {\r\n        nextCell.direction = snake[0].direction;\r\n        nextCell.tail = snake[0];\r\n        if (nextCell.eat) {\r\n            spawnFood(field);\r\n            score.textContent++;\r\n        }\r\n        let currentCell = snake[0].tail;\r\n        let previousCell;\r\n        while (currentCell.tail) {\r\n            previousCell = currentCell;\r\n            currentCell = currentCell.tail;\r\n        }\r\n        if (!currentCell.eat) {\r\n            delete previousCell.tail;\r\n        } else {\r\n            currentCell.eat = false;\r\n\r\n        }\r\n        currentCell.className = \"cell\";\r\n\r\n        snake[0] = nextCell;\r\n        snake[0].className = \"cell snake_cell\";\r\n        if ((score.textContent - 1) % 10 === 0) {\r\n            changeSpeedFlag = 1;\r\n        }\r\n\r\n        if (score.textContent % 10 === 0 && changeSpeedFlag && SNAKE_SPEED !== SPEED_INCREASE) {\r\n            SNAKE_SPEED = SNAKE_SPEED - SPEED_INCREASE;\r\n            setTimeout(Game, SNAKE_SPEED, field, score, snake);\r\n            changeSpeedFlag = 0;\r\n        } else {\r\n            setTimeout(Game, SNAKE_SPEED, field, score, snake)\r\n        }\r\n    } else {\r\n        renderFinalScreen();\r\n        let form = document.getElementById(\"form\");\r\n        form.addEventListener(\"submit\", () => {\r\n            saveResult(score.textContent);\r\n        });\r\n\r\n    }\r\n\r\n};\r\n\r\n\r\nconst startGame = (field,  snake) => {\r\n    chooseLevel();\r\n\r\n    document.getElementById(\"game\").style.display = \"block\";\r\n    document.getElementById(\"start-screen\").style.display = \"none\";\r\n\r\n    let div = document.getElementById(\"game__field\");\r\n    div.appendChild(field);\r\n\r\n    let score = document.getElementById(\"score\");\r\n    score.textContent = 0;\r\n\r\n    spawnFood(field);\r\n    setTimeout(Game, SNAKE_SPEED, field, score, snake);\r\n\r\n};\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/snake.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! D:\\Web\\snake1\\src\\index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });