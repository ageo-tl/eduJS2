const cyrillicFilter = ({target: field}) => {
  if (field.value.match(/[^А-Яа-яЁе ]/)) {
    field.value = field.value.replace(/[^А-Яа-яЁе ]/, "");
  }
};

export default cyrillicFilter;
