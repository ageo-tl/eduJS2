const cyrillicFilter = ({target: field}) => {
  if (field.value.match(/[^А-Яа-яЁе ]/)) {
    field.value = field.value.replace(/[^А-Яа-яЁе ]/, "");
  }
};

const numericFilter = ({target: field}) => {
  if (field.value.match(/[^\+\d]/)) {
    field.value = field.value.replace(/[^\+\d]/, "");
  }
};

export { cyrillicFilter, numericFilter };
