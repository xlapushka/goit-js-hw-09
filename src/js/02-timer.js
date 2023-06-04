import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('.btn'),
  input: document.querySelector('#datetime-picker'),
  countdounDays: document.querySelector('[data-days]'),
  countdounHours: document.querySelector('[data-hours]'),
  countdounMinutes: document.querySelector('[data-minutes]'),
  countdounSeconds: document.querySelector('[data-seconds]'),
  interval: 1000,
};

let timerUpdate;
let delta = 0;

const flatpickr = new flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let choosenDate = selectedDates[0];
    let currentDate = new Date();
    delta = choosenDate.getTime() - currentDate.getTime();

    if (choosenDate.getTime() < currentDate.getTime()) {
      refs.btnStart.setAttribute('disabled', 'disabled');
      refs.countdounDays.textContent = addLeadingZero(0);
      refs.countdounHours.textContent = addLeadingZero(0);
      refs.countdounMinutes.textContent = addLeadingZero(0);
      refs.countdounSeconds.textContent = addLeadingZero(0);
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      makebuttonActive();
    }
  },
});

function makebuttonActive() {
  refs.btnStart.removeAttribute('disabled');

  // ======Тут має бути знімання всіх зайвих слухачів, щоб почав працювати слухач на кнопці коректно=========
  refs.btnStart.addEventListener('click', startCountdown());
};

function startCountdown() {
  let convertToDate = convertMs(delta);

  refs.btnStart.setAttribute('disabled', 'disabled');

  timerUpdate = setInterval(() => {
    if (delta >= 0) {
      convertToDate = convertMs(delta);
      refs.countdounDays.textContent = addLeadingZero(convertToDate.days);
      refs.countdounHours.textContent = addLeadingZero(convertToDate.hours);
      refs.countdounMinutes.textContent = addLeadingZero(convertToDate.minutes);
      refs.countdounSeconds.textContent = addLeadingZero(convertToDate.seconds);
      delta -= 1000;
    }
  }, refs.interval);
};

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
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
};
