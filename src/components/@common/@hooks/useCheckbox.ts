import { ChangeEvent, useState } from 'react';

interface CheckboxItem {
  text: string;
  value: string;
  checked: boolean;
}

interface Limit<T> {
  checkboxKey: keyof T;
  maxValue: number;
}

const useCheckbox = <T extends Record<string, CheckboxItem[]>>(initialValue: T) => {
  const [checkboxValue, setCheckboxValue] = useState<T>(initialValue);

  const onChangeCheckBox = (e: ChangeEvent<HTMLInputElement>, checkBoxKey: keyof T, limit?: Limit<T>) => {
    const { value, checked } = e.target;

    setCheckboxValue((prev) => {
      const currentCheckedCount = prev[checkBoxKey].filter((checkbox) => checkbox.checked).length;

      if (limit && checked && currentCheckedCount === limit.maxValue) {
        return prev;
      }

      return {
        ...prev,
        [checkBoxKey]: prev[checkBoxKey].map((checkbox) =>
          checkbox.value === value ? { ...checkbox, checked } : checkbox,
        ),
      };
    });
  };

  return {
    checkboxValue,
    onChangeCheckBox,
  };
};

export default useCheckbox;
