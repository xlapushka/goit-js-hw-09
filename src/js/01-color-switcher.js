const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
  interval: 1000,
};
let changingColor;

refs.btnStop.setAttribute('disabled', 'disabled');
refs.btnStart.addEventListener('click', changeBackGroundByClick);
refs.btnStop.addEventListener('click', stopChangingBackgroundColor);


function changeBackGroundByClick() {
  color = getRandomHexColor();
  refs.body.setAttribute('style', `background-color: ${color}`);

  startChangingBackgroundColor();
}

function startChangingBackgroundColor() {
  changingColor = setInterval(() => {
    color = getRandomHexColor();
    refs.body.setAttribute('style', `background-color: ${color}`);
  }, refs.interval);

  refs.btnStart.setAttribute('disabled', 'disabled');
  refs.btnStop.removeAttribute('disabled', 'disabled');
}

function stopChangingBackgroundColor() {
  clearInterval(changingColor);
  refs.btnStop.setAttribute('disabled', 'disabled');
  refs.btnStart.removeAttribute('disabled', 'disabled');
  // refs.btnStart.addEventListener('click', changeBackGroundByClick);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
