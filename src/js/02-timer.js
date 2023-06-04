import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('.btn'),
  input: document.querySelector('#datetime-picker'),
  countdownDays: document.querySelector('[data-days]'),
  countdownHours: document.querySelector('[data-hours]'),
  countdownMinutes: document.querySelector('[data-minutes]'),
  countdownSeconds: document.querySelector('[data-seconds]'),
  interval: 1000,
};

let delta = 0;

const flatpickrr = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let choosenDate = selectedDates[0];
    let currentDate = new Date();
    delta = choosenDate.getTime() - currentDate.getTime();

    refs.btnStart.setAttribute('disabled', 'disabled');

    if (choosenDate.getTime() < currentDate.getTime()) {
      refs.countdownDays.textContent = addLeadingZero(0);
      refs.countdownHours.textContent = addLeadingZero(0);
      refs.countdownMinutes.textContent = addLeadingZero(0);
      refs.countdownSeconds.textContent = addLeadingZero(0);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled');
    }
  },
});

refs.btnStart.setAttribute('disabled', 'disabled');
refs.btnStart.addEventListener('click', startCountdown);


function startCountdown() {
  let convertToDate = convertMs(delta);

  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnStart.removeAttribute('disabled');

  setInterval(() => {
    if (delta >= 0) {
      convertToDate = convertMs(delta);
      refs.countdownDays.textContent = addLeadingZero(convertToDate.days);
      refs.countdownHours.textContent = addLeadingZero(convertToDate.hours);
      refs.countdownMinutes.textContent = addLeadingZero(convertToDate.minutes);
      refs.countdownSeconds.textContent = addLeadingZero(convertToDate.seconds);
      delta -= 1000;
    }
  }, refs.interval);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
