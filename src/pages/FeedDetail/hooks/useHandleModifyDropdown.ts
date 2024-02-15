import { useCallback, useEffect, useRef, useState } from 'react';

const useHandleModifyDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpenModifyDropdown, setIsOpenModifyDropdown] = useState(false);

  const onClickClose = useCallback(() => {
    setIsOpenModifyDropdown(false);
  }, []);

  const toggleModifyDropdown = () => {
    setIsOpenModifyDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        isOpenModifyDropdown &&
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        onClickClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClickClose, isOpenModifyDropdown]);

  return { dropdownRef, isOpenModifyDropdown, toggleModifyDropdown };
};

export default useHandleModifyDropdown;
