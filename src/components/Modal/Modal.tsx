import styled from '@emotion/styled';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  return (
    <ModalContainer>
      {isOpen && <Overlay onClick={onClose} />}
      <ModalWrapper>{children}</ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100%;
  width: 100%;
  transition: opacity 225ms ease;
  inset: 0;
  opacity: 1;
  z-index: 1;
`;

const ModalWrapper = styled.div`
  height: auto; /* default value */
  padding: 20px 21px;
  border-radius: 4px;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,
    rgba(0, 0, 0, 0.14) 0px 24px 38px 3px,
    rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
  background-color: #fff; /* default dark theme value */
  color: inherit;
  z-index: 99;
`;

const Overlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgba(0, 0, 0, 0.54);
  inset: 0;
`;
