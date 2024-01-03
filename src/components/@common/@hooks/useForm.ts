import { useState } from 'react';

import { OnChangeConfig } from '../@types/useForm';

const initErrorMessages = <T extends Record<keyof T, string>>(initValues: T) => {
  const initKeys = Object.keys(initValues) as (keyof T)[];

  return initKeys.reduce(
    (acc, key) => {
      acc[key] = '';
      return acc;
    },
    new Object() as Record<keyof T, string>,
  );
};

const useForm = <T extends Record<keyof T, string>>(initValue: T) => {
  const [formValue, setFormValue] = useState<T>(initValue);
  const [errorValue, setErrorValue] = useState<Record<keyof T, string>>(initErrorMessages(initValue));

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, config?: OnChangeConfig) => {
    const { name, value } = e.target;

    if (value.length - 1 === config?.maxLength) {
      return;
    }

    setFormValue((prevValues: T) => ({
      ...prevValues,
      [name]: value,
    }));

    if (config?.isRequired && value.length === 0) {
      setErrorValue((prev) => ({ ...prev, [name]: '필수 입력 값입니다.' }));
      return;
    }

    if (config && config.onValidate) {
      config.onValidate().forEach((validate) => {
        if (validate.name === name && validate.regexp.test(value)) {
          setErrorValue((prev) => ({ ...prev, [name]: validate.errorMessage }));
        }
      });

      if (config.onValidate().find((validate) => validate.name === name && validate.regexp.test(value))) return;
    }
    setErrorValue((prev) => ({ ...prev, [name]: '' }));
  };

  return {
    formValue,
    errorValue,
    onChange,
  };
};

export default useForm;
