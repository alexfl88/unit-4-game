let wins, losses, score, goal;

let numOfCrystals = 4;
let goalRange = [50, 100]; 
let crystalValueRange = [1, 10]; 
let [mMin, mMax] = crystalValueRange;
let [gMin, gMax] = goalRange;

const randomNum = (min, max) => Math.floor(min + Math.random() * (max - min));

const createCrystals = () => { 
    let crystalValues = [];
    let html = "";

    while (crystalValues.length < numOfCrystals) { 
        let randomValue = randomNum(mMin, numOfCrystals + mMax);
        if (crystalValues.indexOf(randomValue) === -1) crystalValues.push(randomValue);
    }

    for (let i = 0; i < numOfCrystals; i++) { 
        let value = crystalValues[i];
        let width = randomNum(120, 150);
        let height = randomNum(170, 200);
        let imgSrc = "assets/images/crystals.png";

        html += `<img src="${imgSrc}" class="crystal" value="${value}">`
    }

    $("#div-of-crystals").html(html);
    initializeClickHandlers()
};

const displayScoreBoard = (s = score, g = goal, w = wins, l = losses) => {
    [score, goal, wins, losses] = [s, g, w, l]; 
    let scorecard = `GOAL: ${g} | SCORE: ${s} | WINS : ${w} | LOSSES : ${l}`;
    $("#scorecard").html(scorecard);
};

const initializeClickHandlers = () => {

    $("#reset").click(function () {
        $("#message").empty();
        displayScoreBoard(0, randomNum(gMin, gMax), wins, losses);
        createCrystals(numOfCrystals);
    });

    $(".crystal").click(function () {
        let secretCrystalValue = parseInt($(this)[0].attributes[2].value);
        score = score + secretCrystalValue;

        if (score > goal) {
            $("#div-of-crystals").empty();
            $("#message").append("<h1>You Lose! Try Again? Click Reset!</h1>");
            losses++;
        }

        if (score === goal) {
            $("#div-of-crystals").empty();
            $("#message").append("<h1>Congratulations! You Won! Click Reset to play again!</h1>");
            wins++;
        }

        displayScoreBoard();
    });
};

displayScoreBoard(0, randomNum(gMin, gMax), 0, 0);
createCrystals(numOfCrystals);