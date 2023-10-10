const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

const levelTitle = document.querySelector("#level-title");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const colorButtons = document.querySelectorAll(".btn");
function greenClickHandler() {
  userPattern.push(buttonColors[2]);
  playSound("green");
  changeBackground("green");
  checkUserSequence();
}
function blueClickHandler() {
  userPattern.push(buttonColors[1]);
  playSound("blue");
  changeBackground("blue");
  checkUserSequence();
}
function redClickHandler() {
  userPattern.push(buttonColors[0]);
  playSound("red");
  changeBackground("red");
  checkUserSequence();
}
function yellowClickHandler() {
  userPattern.push(buttonColors[3]);
  playSound("yellow");
  changeBackground("yellow");
  checkUserSequence();
}

document.addEventListener("keypress", function () {
  if (!started) {
    document.body.classList.remove("game-over");

    yellow.addEventListener("click", yellowClickHandler);
    blue.addEventListener("click", blueClickHandler);
    red.addEventListener("click", redClickHandler);
    green.addEventListener("click", greenClickHandler);

    setTimeout(nextSequence, 1000);
    started = true;
  }
});

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColors[randomNumber]);
  changeBackground(gamePattern[gamePattern.length - 1]);
  playSound(gamePattern[gamePattern.length - 1]);
  level++;
  levelTitle.innerHTML = "Level " + level;
}
function checkUserSequence() {
  for (let i = 0; i < userPattern.length; i++) {
    if (gamePattern.length !== userPattern.length) {
      if (gamePattern[i] === userPattern[i]) {
        continue;
      } else {
        document.body.classList.add("game-over");
        setTimeout(() => {
          document.body.classList.remove("game-over");
        }, 500);
        levelTitle.innerHTML = "Game over..Press any key to start again";
        const wrong = "wrong";
        playSound(wrong);
        AllReset();
        break;
      }
    } else {
      if (
        gamePattern[gamePattern.length - 1] ===
        userPattern[userPattern.length - 1]
      ) {
        setTimeout(nextSequence, 1000);
        userPattern = [];
        break;
      } else {
        document.body.classList.add("game-over");
        setTimeout(() => {
          document.body.classList.remove("game-over");
        }, 500);
        const wrong = "wrong";
        playSound(wrong);
        levelTitle.innerHTML = "Game over..Press any key to start again";
        AllReset();
        break;
      }
    }
  }
}

function changeBackground(color) {
  document.querySelector("#" + color).classList.add("pressed");
  setTimeout(() => {
    document.querySelector("#" + color).classList.remove("pressed");
  }, 100);
}

function playSound(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function AllReset() {
  level = 0;
  gamePattern = [];
  userPattern = [];
  started = false;
  yellow.removeEventListener("click", yellowClickHandler);
  blue.removeEventListener("click", blueClickHandler);
  red.removeEventListener("click", redClickHandler);
  green.removeEventListener("click", greenClickHandler);
}
