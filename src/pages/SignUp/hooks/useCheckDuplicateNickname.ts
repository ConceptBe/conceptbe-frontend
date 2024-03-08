import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { getCheckDuplicateNickname } from '../../../api';
import { FieldValue } from '../types';

interface Props {
  nickname: string;
  setFieldErrorValue: Dispatch<SetStateAction<Record<keyof FieldValue, string>>>;
}

const useCheckDuplicateNickname = ({ nickname, setFieldErrorValue }: Props) => {
  const userInfo = JSON.parse(localStorage.getItem('user') ?? '{}');
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    if (userInfo.nickname === nickname) return;

    if (timerId.current) {
      const timerIdCurrent = timerId.current;
      clearTimeout(timerIdCurrent);
    }

    timerId.current = setTimeout(async () => {
      if (!nickname) return;

      const isUnique = await getCheckDuplicateNickname(nickname);

      if (!isUnique) {
        setFieldErrorValue((prev) => ({
          ...prev,
          nickname: '이미 사용 중인 닉네임입니다.',
        }));
      }
    }, 300);
  }, [userInfo, nickname, setFieldErrorValue]);
};

export default useCheckDuplicateNickname;
