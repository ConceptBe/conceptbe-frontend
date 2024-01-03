import { ChangeEvent, useState } from 'react';

interface RadioItem {
  text: string;
  value: string;
  checked: boolean;
}

const useRadio = <T extends Record<string, RadioItem[]>>(initialValue: T) => {
  const [radios, setRadios] = useState<T>(initialValue);

  const onChangeRadio = (e: ChangeEvent<HTMLInputElement>, radioKey: keyof T) => {
    const { name } = e.target;

    setRadios((prev) => ({
      ...prev,
      [radioKey]: prev[radioKey].map((radio) => ({
        ...radio,
        checked: radio.value === name,
      })),
    }));
  };

  return {
    radios,
    onChangeRadio,
  };
};

export default useRadio;
