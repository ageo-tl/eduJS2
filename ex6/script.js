// Вывести текущий день и время  на страницу в таком формате
// // Добрый день (утро, вечер, ночь в зависимости от времени суток)
// // Сегодня: Понедельник
// // Текущее время:12:05:15 PM
// // До нового года осталось 175 дней



function helloDay(hour) {
// Приветствие в зависимости от времени суток
  switch (true) {
    case hour < 6 || hour === 23:
      return "Доброй ночи";
    case hour < 11:
      return "Доброе утро";
    case hour < 17:
      return "Добрый день";
    default:
      return "Добрый вечер";
  }
}

const dayOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

function dayUnitName(num) {
// Наименование единиц измерения дней в зависимости от значения
  const lastChar = parseInt(num.toString().slice(-1));
  const last2Char = parseInt(num.toString().slice(-3, 2));
  if (last2Char > 10 && last2Char < 20) {
    return "дней";
  }
  switch (true) {
    case lastChar === 1:
      return "день";
    case lastChar > 1 && lastChar < 5:
      return "дня";
    default:
      return "дней";
  }
}


const date = new Date();
const firstDateOfNextYear = new Date(date.getFullYear() + 1, 0, 1);
const daysToNY = Math.floor((firstDateOfNextYear - date) / 1000 / 86400);

const p1 = document.createElement("p");
const p2 = p1.cloneNode();
const p3 = p1.cloneNode();
const p4 = p1.cloneNode();

p1.textContent = helloDay(date.getHours());
p2.textContent = "Сегодня: " + dayOfWeek[date.getDay()];
p3.textContent = "Текущее время: " + date.toLocaleTimeString("en");
p4.textContent = `До нового года осталось ${daysToNY} ${dayUnitName(daysToNY)}`;

const container = document.querySelector(".container");
container.appendChild(p1);
container.appendChild(p2);
container.appendChild(p3);
container.appendChild(p4);
