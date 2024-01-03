import { useState } from 'react';

import { Config } from '../@types/useInput';

const initErrorMessages = <T extends Record<keyof T, string>>(initialValue: T) => {
  const initKeys = Object.keys(initialValue) as (keyof T)[];

  return initKeys.reduce(
    (acc, key) => {
      acc[key] = '';
      return acc;
    },
    new Object() as Record<keyof T, string>,
  );
};

const useInput = <T extends Record<keyof T, string>>(initialValue: T) => {
  const [inputValue, setInputValue] = useState<T>(initialValue);
  const [inputErrorValue, setInputErrorValue] = useState<Record<keyof T, string>>(initErrorMessages(initialValue));

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, config?: Config) => {
    const { name, value } = e.target;

    if (value.length - 1 === config?.maxLength) {
      return;
    }

    setInputValue((prevValues: T) => ({
      ...prevValues,
      [name]: value,
    }));

    if (config?.isRequired && value.length === 0) {
      setInputErrorValue((prev) => ({ ...prev, [name]: '필수 입력 값입니다.' }));
      return;
    }

    if (config && config.onValidate) {
      config.onValidate().forEach((validate) => {
        if (validate.name === name && validate.regexp.test(value)) {
          setInputErrorValue((prev) => ({ ...prev, [name]: validate.errorMessage }));
        }
      });

      if (config.onValidate().find((validate) => validate.name === name && validate.regexp.test(value))) return;
    }
    setInputErrorValue((prev) => ({ ...prev, [name]: '' }));
  };

  return {
    inputValue,
    inputErrorValue,
    onChangeInput,
  };
};

export default useInput;
