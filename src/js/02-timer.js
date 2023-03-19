import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  dayValue: document.querySelector('span[data-days]'),
  hourValue: document.querySelector('span[data-hours]'),
  minuteValue: document.querySelector('span[data-minutes]'),
  secondValue: document.querySelector('span[data-seconds]'),
};

let dateValue = null;
let timerId = null;

const timer = {
  isActive: false,

  start(value) {
    if (this.isActive) {
      return;
    }
    const startTime = value;
    this.isActive = true;

    timerId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = convertMs(deltaTime);
      handleTimerSetValue(time);
      handleStopTimer(deltaTime);
    }, 1000);
  },
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    onCheckingDate(selectedDates);
  },
};

refs.startBtn.addEventListener('click', onStartBtnClick);

flatpickr(refs.dateInput, options);
onDisableBtn();

function handleTimerSetValue({ days, hours, minutes, seconds }) {
  refs.dayValue.textContent = addZeroOnStart(days);
  refs.hourValue.textContent = addZeroOnStart(hours);
  refs.minuteValue.textContent = addZeroOnStart(minutes);
  refs.secondValue.textContent = addZeroOnStart(seconds);
}

function handleStopTimer(time) {
  if (time < 1000) {
    timer.isActive = false;
    clearInterval(timerId);
  }
}

function onCheckingDate(value) {
  if (value.getTime() < Date.now()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    timer.isActive = false;
    clearInterval(timerId);
    handleTimerSetValue({
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    });
    onDisableBtn();
    return;
  }
  timer.isActive = false;
  clearInterval(timerId);
  handleTimerSetValue({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  refs.startBtn.removeAttribute('disabled');
  return (dateValue = value.getTime());
}
function onStartBtnClick() {
  timer.start(dateValue);
  refs.startBtn.disabled = true;
}

function onDisableBtn() {
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZeroOnStart(value) {
  return String(value).padStart(2, '0');
}
