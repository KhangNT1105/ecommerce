import React, { useState, useEffect, useRef } from 'react';
import { Modal as RSModal, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { FnType } from '../../constants/types';
import { classConcat } from '../../utils/common';
import Button from '../button/Button';

// Interfaces & Props
type Props = {
  isOpen: boolean;
  className?: string;
  size?: string;
  type?: string;

  header?: string;
  closeButton?: boolean;

  bodyClassName?: string;

  footer?: boolean;
  textOk?: string;
  textCancel?: string;
  onOkHandler?: FnType;
  onCancelHandler?: FnType;
  toggleOnOk?: boolean;
  toggleOnCancel?: boolean;
};

// Component
const Modal: React.FC<Props> = (props) => {
  // default props
  let { textOk, textCancel, closeButton, header, footer } = props;
  const { size, children, className, bodyClassName, type, toggleOnOk = true, toggleOnCancel = true } = props;
  const { t } = useTranslation();
  textOk = textOk || t('OK');
  textCancel = textCancel || t('CANCEL');
  closeButton = false || closeButton;
  header = typeof header === 'string' ? header : '';
  footer = footer || false;

  const modalRef = useRef(null);

  // methods
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const onOkHandler = () => {
    if (props.onOkHandler) {
      props.onOkHandler();
    }
    if (toggleOnOk) toggle();
  };
  const onCancelHandler = () => {
    if (props.onCancelHandler) {
      props.onCancelHandler();
    }
    if (toggleOnCancel) toggle();
  };

  // states
  const [isOpen, setIsOpen] = useState(props.isOpen);

  // on change isOpen
  useEffect(() => {
    setIsOpen(props.isOpen);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const modal = modalRef.current as any;
      if (modal) {
        modal.close();
      }
    };
  }, [props.isOpen]);

  // renders
  return (
    <RSModal className={className} isOpen={isOpen} size={size || ''} ref={modalRef}>
      <div className="modal-header py-3">
        <h6 className="modal-title">{header}</h6>
        {closeButton && (
          <div className="close">
            <Button color="link" onClick={onCancelHandler}>
              <i className={classConcat(['fa fa-fw fa-2x', `fa-close`])} />
            </Button>
          </div>
        )}
      </div>
      <ModalBody className={bodyClassName}>{children}</ModalBody>
      {footer && (
        <ModalFooter>
          <Button color="link" className={`text-${type}`} onClick={onCancelHandler}>
            {textCancel}
          </Button>
          <Button color={type} onClick={onOkHandler}>
            {textOk}
          </Button>
        </ModalFooter>
      )}
    </RSModal>
  );
};

export default Modal;
