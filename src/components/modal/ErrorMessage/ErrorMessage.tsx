import React, { ReactElement } from 'react';
import { FnType } from '../../../constants/types';
import Modal from '../Modal';

// Interfaces & Props
type Props = {
  isOpen: boolean;
  title?: string;
  message: string | React.FC | ReactElement;
  onOkHandler?: FnType;
  onCancelHandler?: FnType;
};

// Component
const ErrorMessage: React.FC<Props> = (props) => {
  const { title, message, isOpen, onOkHandler, onCancelHandler } = props;
  return (
    <Modal
      isOpen={isOpen}
      className="modal-outline-danger"
      onOkHandler={onOkHandler}
      onCancelHandler={onCancelHandler}
      footer={false}
      closeButton={true}
      header={title}
      type="danger"
    >
      <p className="modal-text">{message}</p>
    </Modal>
  );
};

export default ErrorMessage;
