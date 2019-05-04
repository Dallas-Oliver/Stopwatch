let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let lapMinutes = 0;
let lapSeconds = 0;
let lapMilliseconds = 0;
let m = "00";
let s = "00";
let ms = "00";
let lapM = m;
let lapS = s;
let lapMs = ms;
let timer;
let buttonSwitch = true;

let totalTimerDisplay = document.getElementById("total-timer");
let lapTimerDisplay = document.getElementById("lap-timer");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button");
let lapButton = document.getElementById("lap-button");
let timeStampContainer = document.getElementById("timestamp");

function countTimer() {
  milliseconds++;
  lapMilliseconds++;
  if (milliseconds >= 100) {
    milliseconds = 0;
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
  }

  if (lapMilliseconds >= 100) {
    lapMilliseconds = 0;
    lapSeconds++;
    if (lapSeconds >= 60) {
      lapSeconds = 0;
      lapMinutes++;
    }
  }

  m = minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00";
  s = seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00";
  ms = milliseconds > 9 ? milliseconds : "0" + milliseconds;

  lapM = lapMinutes ? (lapMinutes > 9 ? lapMinutes : "0" + lapMinutes) : "00";
  lapS = lapSeconds ? (lapSeconds > 9 ? lapSeconds : "0" + lapSeconds) : "00";
  lapMs = lapMilliseconds > 9 ? lapMilliseconds : "0" + lapMilliseconds;

  totalTimerDisplay.innerHTML = m + ":" + s + ":" + ms;
  lapTimerDisplay.innerHTML = lapM + ":" + lapS + ":" + lapMs;

  timerDuration();
}

function timerDuration() {
  if (minutes !== 99) {
    timer = setTimeout(countTimer, 10);
  }
}

function stopTimer() {
  clearTimeout(timer);
}

function startTimer() {
  buttonSwitch = !buttonSwitch;

  if (buttonSwitch == false) {
    timerDuration();
    resetLapTimer();
    startButton.innerHTML = "STOP";
    if (milliseconds > 1) {
      takeLap();
    }
  } else {
    stopTimer();
    startButton.innerHTML = "START";
  }
}

function resetLapTimer() {
  lapTimerDisplay.innerHTML = "00" + ":" + "00" + ":" + "00";
  lapMinutes = 0;
  lapSeconds = 0;
  lapMilliseconds = 0;
  lapM = "";
  lapS = "";
  lapMs = "";
}

function resetTimer() {
  buttonSwitch = true;
  startButton.innerHTML = "START";
  clearTimeout(timer);
  resetLapTimer();
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  m = "";
  s = "";
  ms = "";
  totalTimerDisplay.innerHTML = "00" + ":" + "00" + ":" + "00";
}
function takeLap() {
  createNewLap();
  lapMinutes = 0;
  lapSeconds = 0;
  lapMilliseconds = 0;
  lapM = "";
  lapS = "";
  lapMs = "";
  lapTimerDisplay.innerHTML = "00" + ":" + "00" + ":" + "00";
}

function createNewLap() {
  let newLap = document.createElement("div");
  newLap.textContent = m + ":" + s + ":" + ms;
  timeStampContainer.appendChild(newLap);
}

startButton.addEventListener("click", () => startTimer());
resetButton.addEventListener("click", () => resetTimer());
lapButton.addEventListener("click", () => takeLap());
