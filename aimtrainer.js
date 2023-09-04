const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen"),
    timeList = document.querySelector("#time-list"),
    timeEl = document.querySelector("#time"),
    board = document.querySelector("#board"),
    hitsEl = document.querySelector("#hits"),
    accuracyEl = document.querySelector("#accuracy"),
    hitsOver = document.querySelector("#hits-over"),
    accuracyOver = document.querySelector("#accuracy-over"),
    restartBtns = document.querySelectorAll(".restart"),
    stopBtn = document.querySelector(".stop"),
    clickVolume = document.querySelector("#buttonClickSound");

clickVolume.volume = 0.1;


const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function () {
        buttonClickSound.play();

    });
});



let time = 0,
    playing = false,
    hits = 0,
    missed = 0,
    accuracy = 0,
    interval;

startBtn.addEventListener("click", function () {
    screens[0].classList.add("up");
});

timeList.addEventListener("click", function (e) {
    if (e.target.classList.contains("time-btn")) {
        time = parseInt(e.target.getAttribute("data-time"));
        screens[1].classList.add("up");
        startGame();
    }
});

function startGame() {
    // console.log("Game Started");
    playing = true;
    interval = setInterval(decreaseTime, 1000);
    createRandomCircle();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    }
    let current = --time;
    let miliseconds = time * 1000;

    let minutes = Math.floor(miliseconds / (1000 * 60));
    let seconds = Math.floor((miliseconds % (1000 * 60)) / 1000);

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    setTime(`${minutes}:${seconds}`);
}

function setTime(time) {
    timeEl.innerHTML = time;
}

function createRandomCircle() {
    // console.log("Creating circle...")
    if (!playing) {
        return;
    }

    const circle = document.createElement("div");
    const size = getRandomNumber(40, 50);
    const color = "#BC13FE";
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add("circle");
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    // console.log("Size:", size, "X:", x, "Y:", y);
    board.append(circle);
    // console.log("Circle created and appended to the board.");

    circle.addEventListener("animationend", function () {
        circle.remove();
        createRandomCircle();
        missed++;
        calculateAccuracy();
    });
}

board.addEventListener("click", function (e) {
    if (e.target.classList.contains("circle")) {
        hits++;
        e.target.remove();
        createRandomCircle();
    }
    //else {
    //     missed++;
    // }

    hitsEl.innerHTML = hits;
    calculateAccuracy();
});


function finishGame() {
    playing = false;
    clearInterval(interval);
    board.innerHTML = "";
    screens[2].classList.add("up");
    hitsEl.innerHTML = 0;
    timeEl.innerHTML = "00:00";
    accuracyEl.innerHTML = "0%";

    hitsOver.innerHTML = hits;
    accuracyOver.innerHTML = `${accuracy}%`;
}

function calculateAccuracy() {
    accuracy = (hits / (hits + missed)) * 100;
    accuracy = accuracy.toFixed(2);
    accuracyEl.innerHTML = `${accuracy}%`;
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


restartBtns.forEach(function (btn) {
    btn.addEventListener("click", restartGame);
});

stopBtn.addEventListener("click", finishGame);



function restartGame() {
    // console.log("restartGame function called");
    finishGame();
    screens[0].classList.remove("up")
    screens[1].classList.remove("up")
    screens[2].classList.remove("up")
    screens[3].classList.remove("up")
    time = 0;
    hits = 0;
    missed = 0;
    accuracy = 0;
    playing = false;

}


