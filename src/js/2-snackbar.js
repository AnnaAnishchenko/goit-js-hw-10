// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Знаходимо елементи
const formEl = document.querySelector('.form');
const inputDelay = document.querySelector('[name="delay"]');
const inputFulfilled = document.querySelector('[value="fulfilled"]');
const inputRejected = document.querySelector('[value="rejected"]');
const submitBtn = document.querySelector('[type="submit"]');

console.log(formEl);
console.log(inputDelay);
console.log(inputFulfilled);
console.log(inputRejected);
console.log(submitBtn);

// Створюємо функцію
const onSubmit = event => {
  // Зупиняємо стандартну поведінку форми
  event.preventDefault();

  // переводимо отриманий рядок в значення
  const delay = Number(inputDelay.value);

  //перевіряємо чи вибрано кнопку
  const isFulfilled = inputFulfilled.checked;

  // створюємо проміс
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        console.log(`✅ Fulfilled promise in ${delay}ms`);
        resolve(delay);
      } else {
        console.log(`❌ Rejected promise in ${delay}ms`);
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
};

// додаємо слухача
formEl.addEventListener('submit', onSubmit);
