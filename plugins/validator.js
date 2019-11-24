class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(
      (item) => !item.matches("button, input[type=\"button\"]"));
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();

    this.elementsForm.forEach(
      (elem) => elem.addEventListener("change", this.checkIt.bind(this)) );

    this.form.addEventListener("submit", (event) => {
      this.elementsForm.forEach( (elem) => this.checkIt({target: elem}));
      if (this.error.size) {
        event.preventDefault();
      }
    });
  }

  // Непосредственно валидация
  isValid(elem){
    // Доступные методы валидации
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim().length) {
          return true;
        }
        return false;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      },
    };

    if (this.method) {
      const method = this.method[elem.id];
      if (method) {
        return method.every( (item) => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn("Не были переданы id полей ввода и методы их проверки");
    }

    return true;
  }

  // Организация валидации
  checkIt(event) {
    const { target } = event;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove("success");
    elem.classList.add("error");

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains("validator-error")) {
      return;
    }
    const errorDiv = document.createElement("div");
    errorDiv.textContent = "Ошибка в этом поле";
    errorDiv.classList.add("validator-error");
    elem.insertAdjacentElement("afterend", errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove("error");
    elem.classList.add("success");

    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains("validator-error")) {
      elem.nextElementSibling.remove();
    }
  }

  // Добавим свои стили в DOM
  applyStyle() {
    const style = document.createElement("style");
    style.textContent = `
      input.success {
        border: 2px solid green;
      }
      input.error {
        border: 2px solid red;
      }
      .validator-error {
        font-size: 1.8rem;
        color: red;
        transform: translateY(-2.5rem);
      }
    `;
    document.head.appendChild(style);
  }

  // Установка шаблонов сравнения: используются встроенные,
  // если не были переданы другие из вне
  setPattern() {
    // Телефон
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }
    // Почта
    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }

}
