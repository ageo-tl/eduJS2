// добавить задачу, если поле не пусто
// если поле пусто, выводить предупреждение
// при добавлении поле инпута очищать

// при клике на задачу переключать ее состояние (зачеркнута или нет)
// см. свойство text-decoration: line-through

window.addEventListener("DOMContentLoaded", () => {
  const todoPlace = document.querySelector("ol"),
        input = document.querySelector("input"),
        addBtn = document.querySelector("button");

  // Добавление новой задачи
  const addTodo = (desc) => {
    const newTodo = document.createElement("li");
    newTodo.classList.add("border", "border-warning", "rounded", "p-2", "m-2")
    newTodo.textContent = desc;
    todoPlace.appendChild(newTodo);
  }

  // Обработка нажатия кнопки
  addBtn.addEventListener("click", () => {
    if (!input.value) {
      alert("Вы не указали наименование задачи!");
    } else {
      addTodo(input.value);
      input.value = "";
    }
  })

  // Обработка клика по задаче
  todoPlace.addEventListener("click", (event) => {
    const { target } = event;
    if (target.matches("li")) {
      if (target.style.textDecoration) {
        target.style.textDecoration = "";
      } else {
        target.style.textDecoration = "line-through";
      }
    }
  })

})
