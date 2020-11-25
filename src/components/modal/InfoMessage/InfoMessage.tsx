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
const InfoMessage: React.FC<Props> = (props) => {
  const { title, message, isOpen, onOkHandler, onCancelHandler } = props;
  return (
    <Modal
      isOpen={isOpen}
      className="modal-outline-info"
      onOkHandler={onOkHandler}
      onCancelHandler={onCancelHandler}
      footer={true}
      header={title}
      type="info"
    >
      <p className="modal-text">{message}</p>
    </Modal>
  );
};

export default InfoMessage;
