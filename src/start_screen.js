let SNAKE_SPEED = 200;
const SPEED_INCREASE = 40;

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

const chooseLevel = () => {
    [...Array(5).keys()].forEach(i => {
        if (document.getElementById(i).checked === true) {
            SNAKE_SPEED = SNAKE_SPEED - SPEED_INCREASE * i;
        }
    })
};

const sortLocalStorage = () => Object.keys(localStorage)
    .map((k) => [k, localStorage.getItem(k)])
    .sort((i, j) => j[1] - i[1])
;

