import { ChangeEvent, useState } from 'react';

interface RadioItem {
  text: string;
  value: string;
  checked: boolean;
}

const useRadio = <T extends Record<string, RadioItem[]>>(initialValue: T) => {
  const [radioValue, setRadioValue] = useState<T>(initialValue);

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>, radioKey: keyof T) => {
    const { name } = e.target;

    setRadioValue((prev) => ({
      ...prev,
      [radioKey]: prev[radioKey].map((radio) => ({
        ...radio,
        checked: radio.value === name,
      })),
    }));
  };

  return {
    radioValue,
    onChangeRadio,
  };
};

export default useRadio;