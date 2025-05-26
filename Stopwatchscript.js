let timerDisplay = document.getElementById("timer");
let startButton = document.getElementById("start");
let pauseButton = document.getElementById("pause");
let resetButton = document.getElementById("reset");
let lapButton = document.getElementById("lap");
let lapList = document.getElementById("lap-list");

let timer = null;
let elapsedTime = 0;
let isPaused = false;
let startTime = 0; // moved this outside to make it global

function formatTime(milliseconds) {
  let totalSeconds = Math.floor(milliseconds / 1000);
  let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  let seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
  if (!timer) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timerDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
  }
}

function pauseTimer() {
  if (!isPaused) {
    clearInterval(timer);
    timer = null;
    isPaused = true;
    pauseButton.textContent = "Resume";
  } else {
    isPaused = false;
    startTimer(); // resume with updated startTime
    pauseButton.textContent = "Pause";
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  elapsedTime = 0;
  isPaused = false;
  pauseButton.textContent = "Pause";
  timerDisplay.textContent = "00:00:00";
  lapList.innerHTML = "";
}

function recordLap() {
  if (timer || isPaused) { // allow lap even during pause
    let lapTime = formatTime(elapsedTime);
    let lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
  }
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);