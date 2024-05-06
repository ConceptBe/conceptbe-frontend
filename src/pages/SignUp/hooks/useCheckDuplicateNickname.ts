import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import { getCheckDuplicateNickname } from '../../../api';
import { NICKNAME_REG_EXP } from '../../../constants';
import { getUserNickname } from '../../Feed/utils/getUserNickname';
import { FieldValue } from '../types';

interface Props {
  nickname: string;
  setFieldErrorValue: Dispatch<SetStateAction<Record<keyof FieldValue, string>>>;
}

const useCheckDuplicateNickname = ({ nickname, setFieldErrorValue }: Props) => {
  const userNickname = getUserNickname();
  const timerId = useRef<number | null>(null);

  console.log(userNickname);

  useEffect(() => {
    if (nickname.length < 2 || NICKNAME_REG_EXP.test(nickname)) {
      return;
    }

    if (timerId.current) {
      const timerIdCurrent = timerId.current;
      clearTimeout(timerIdCurrent);
    }

    timerId.current = setTimeout(async () => {
      if (!nickname) return;

      const isUnique = await getCheckDuplicateNickname(nickname);
      const isSameBeforeNickname = userNickname === nickname;

      if (!isUnique && !isSameBeforeNickname) {
        setFieldErrorValue((prev) => ({
          ...prev,
          nickname: '이미 사용 중인 닉네임입니다.',
        }));
      }
    }, 300);
  }, [userNickname, nickname, setFieldErrorValue]);
};

export default useCheckDuplicateNickname;
