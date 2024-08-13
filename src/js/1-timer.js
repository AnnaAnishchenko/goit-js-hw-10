// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// Створюємо змінні // масив обраних дат
let userSelectedDate = null;
let countdownInterval;

// Знаходимо елементи
const startButton = document.querySelector('button[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const datetimePicker = document.getElementById('datetime-picker');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  // Вибір дати
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // масив обраних дат
    userSelectedDate = selectedDates[0];
    if (userSelectedDate && userSelectedDate > new Date()) {
      startButton.disabled = false;
    } else {
      startButton.disabled = true;
      // alert('Please choose a date in the future.');
      // Заміна  window.alert() на  бібліотеку iziToast
      iziToast.show({
        message: 'Please choose a date in the future.',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

// додаємо слухача
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  countdownInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
  const now = new Date().getTime();
  const timeRemaining = userSelectedDate.getTime() - now;

  if (timeRemaining <= 0) {
    clearInterval(countdownInterval);
    // alert("Time's up!");
    iziToast.show({
      message: "Time's up!",
    });
    datetimePicker.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeRemaining);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// функція для підрахунку значень
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

//Функція Форматування часу
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
