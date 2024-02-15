import { useEffect, useRef, useState } from 'react';

import { getCheckDuplicateNickname } from '../../../api';

const useCheckDuplicateNickname = (userNickname: string) => {
  const [isUniqueNickname, setIsUniqueNickname] = useState(true);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    if (timerId.current) {
      const timerIdCurrent = timerId.current;
      clearTimeout(timerIdCurrent);
    }

    timerId.current = setTimeout(async () => {
      if (!userNickname) return;

      const response = await getCheckDuplicateNickname(userNickname);

      setIsUniqueNickname(response);
    }, 250);
  }, [userNickname]);

  return isUniqueNickname;
};

export default useCheckDuplicateNickname;
