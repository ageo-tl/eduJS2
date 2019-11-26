// Расчет прогресса от времени ("дуга")
const quad = (timeFraction) => {
  return Math.pow(timeFraction, 2);
};

// Анимация прокрутки страницы
const generalAnimation = ({ timing, draw, duration }) => {

  const start = performance.now();

  const animate = (time) => {
    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) { timeFraction = 1; }

    // вычисление текущего состояния анимации и ее отрисовка
    draw(timing(timeFraction));

    // рекурсия по условию
    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

export { quad, generalAnimation };
