import React, { useState, ReactNode } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form } from 'reactstrap';
import Button from './button/Button';

interface ModalProps {
  buttonLabel: string;
  title: string;
  className: string;
  children: ReactNode;
  data: Object;
}
const ModalCustom = (props: ModalProps) => {
  const { buttonLabel, className, children, title } = props;
  const [modal, setModal] = useState(false);
  const [backdrop] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Form inline={true} onSubmit={(e) => e.preventDefault()}>
        <Button color="primary" onClick={toggle}>
          {buttonLabel}
        </Button>
      </Form>
      <Modal isOpen={modal} toggle={toggle} className={className} backdrop={backdrop}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalCustom;
