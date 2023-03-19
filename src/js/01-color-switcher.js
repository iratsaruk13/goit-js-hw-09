const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
let intervalId = null;

onDisableBtn(stopBtnEl);

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(changeBgColor, 1000);
  onDisableBtn(startBtnEl);
  stopBtnEl.disabled = false;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  onDisableBtn(stopBtnEl);
  startBtnEl.disabled = false;
}

function onDisableBtn(button) {
  button.setAttribute('disabled', 'disabled');
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
