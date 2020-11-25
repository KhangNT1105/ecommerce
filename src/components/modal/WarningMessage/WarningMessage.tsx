import React from 'react';
import Modal from 'components/modal/Modal';

import { TWarningMessageProps } from 'components/modal/WarningMessage/WarningMessageType';

// Component
const WarningMessage: React.FC<TWarningMessageProps> = (props) => {
  const { isOpen, message, title, textOk, textCancel, onOkHandler, onCancelHandler } = props;
  return (
    <Modal
      className="modal-outline-warning"
      footer={true}
      isOpen={isOpen}
      textCancel={textCancel}
      textOk={textOk}
      onOkHandler={onOkHandler}
      onCancelHandler={onCancelHandler}
      header={title}
      type="warning"
    >
      <p className="modal-text">{message}</p>
    </Modal>
  );
};

export default WarningMessage;
