interface Option {
  id: number;
  name: string;
}

const convertCheckboxQuery = (options: Option[]) => {
  return options.map((option) => ({ ...option, checked: false }));
};

export default convertCheckboxQuery;
