import { ChangeEvent, useCallback, useState } from 'react';

type TValues = {
  [key: string]: string | number | boolean | any;
};

type ReturnType = [TValues, (event: React.ChangeEvent<HTMLInputElement>) => void, () => void];

export const useForm = (initailValue: TValues): ReturnType => {
  const [form, setForm] = useState(initailValue);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  const reset = useCallback(() => setForm(initailValue), [initailValue]);
  return [form, onChange, reset];
};
