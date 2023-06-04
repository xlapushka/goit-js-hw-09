import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.getElementsByName('.form delay'),
  step: document.getElementsByName('.form step'),
  number: document.getElementsByName('.form number'),
  btn: document.querySelector('.form button'),
};

console.log(refs.delay.value, refs.step.value);

refs.btn.addEventListener('submit', callCreatePromise());

function callCreatePromise(event) { 
  console.log(event);
  event.preventDefault();
  console.log(refs.delay.value, refs.step.value);
}


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
