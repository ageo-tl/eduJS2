import { generalAnimation, quad } from './animation';

const calcCheckInput = () => {
  const calc = document.querySelector(".calc-block"),
        calcItems = calc.querySelectorAll(".calc-item");

  // Поменяем тип input'а на text, чтобы при удалении символов-нецифр
  // не удалялся остальной ввод
  calcItems.forEach( (item) => {
    if (item.matches(".calc-square, .calc-count, .calc-day")) {
      item.setAttribute("type", "text");
    }
  });

  calc.addEventListener("input", (event) => {
    const { target } = event;
    if (target.matches(".calc-square, .calc-count, .calc-day")) {
      // Удаляем нецифровые символы, если есть
      target.value = target.value.replace(/\D/g, "");
    }
  });
};

const calc = (price=100) => {
  const calcBlock = document.querySelector(".calc-block"),
        calcType = document.querySelector(".calc-type"),
        calcSquare = document.querySelector(".calc-square"),
        calcCount = document.querySelector(".calc-count"),
        calcDay = document.querySelector(".calc-day"),
        totalValue = document.getElementById("total");

  const sumAnimated = (current, target, progress) => {
      totalValue.textContent =
            Math.floor(+current + (target - current) * progress);
  };

  const countSum = () => {
    let total = 0,
        countValue = 1,
        dayValue = 1;

    // Тип помещения и площадь
    const typeValue = calcType.options[calcType.options.selectedIndex].value,
          squareValue = +calcSquare.value;

    // Количество помещений и сроки
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10 ;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }

    // Итого
    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }
    const animateTotal =
                sumAnimated.bind(null, totalValue.textContent, total);
    generalAnimation({timing: quad, draw: animateTotal, duration: 300});
  };

  calcBlock.addEventListener("change", (event) => {
    const { target } = event;
    if (target.matches(".calc-item")) {
      countSum();
    }
  });
};

export { calcCheckInput, calc };
