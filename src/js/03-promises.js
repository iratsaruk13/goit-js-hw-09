import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmitClick);

function onFormSubmitClick(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.target;
  const delayEl = Number(delay.value);
  const stepEl = Number(step.value);
  const amountEl = Number(amount.value);
  onMakingPromises(delayEl, stepEl, amountEl);
  evt.currentTarget.reset();
}

function onMakingPromises(delay, step, amount) {
  for (let value = 1; value <= amount; value++) {
    createPromise(value, delay)
      .then(({ value, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${value} in ${delay}ms`);
      })
      .catch(({ value, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${value} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
