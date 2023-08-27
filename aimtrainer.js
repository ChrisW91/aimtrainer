const startBtn = document.querySelector("#start"),
    screens = document.querySelectorAll(".screen");

startBtn.addEventListener("click", function () {
    screens[0].classList.add("up");
});