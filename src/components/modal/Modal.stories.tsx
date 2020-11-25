import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { storiesOf } from '@storybook/react';

import { FnSubmitFormType } from '../../constants/types';
import Button from '../button/Button';
import Modal from './Modal';

// Declarations
type Props = {
  onSubmit: FnSubmitFormType;
  buttonSubmit?: boolean;
};
const FormDemo: React.FC<Props> = (props) => {
  const { onSubmit } = props;
  const buttonSubmit = true && props.buttonSubmit;
  return (
    <Form onSubmit={onSubmit}>
      <FormGroup row={true}>
        <Label for="input-1" sm={4}>
          Email
        </Label>
        <Col sm={8}>
          <Input type="email" name="txtEMail" id="input-email" placeholder="Enter Email..." />
        </Col>
      </FormGroup>
      <FormGroup row={true}>
        <Label for="inputPassword-1" sm={4}>
          Password
        </Label>
        <Col sm={8}>
          <Input type="password" name="password" id="input-password" placeholder="Password..." />
        </Col>
      </FormGroup>
      {buttonSubmit && (
        <FormGroup row={true}>
          <Col sm={4} />
          <Col sm={8} className="text-left">
            <Button type="submit">Login</Button>
          </Col>
        </FormGroup>
      )}
    </Form>
  );
};
type DemoProps = {
  noForm?: boolean;
  size?: string;
  footer?: boolean;
  textOk?: string;
  textCancel?: string;
};
const Demo = (props: DemoProps) => {
  const { size, footer, textOk, textCancel, noForm } = props;

  const textButton = size === 'sm' ? 'Small Modal' : size === 'lg' ? 'Large Modal' : 'Normal Modal';
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const onSubmitHandler: FnSubmitFormType = (event) => {
    event.preventDefault();
    // do submit

    // submit done
    toggle();
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="m-3">
      <Button onClick={toggle}>{textButton}</Button>
      <Modal
        className={`modal-custom-${size}`}
        isOpen={isOpen}
        closeButton={true}
        header={`Form Login - ${textButton}`}
        footer={footer}
        textOk={textOk}
        textCancel={textCancel}
        onCancelHandler={toggle}
        onOkHandler={toggle}
        size={size}
      >
        {!noForm ? <FormDemo onSubmit={onSubmitHandler} buttonSubmit={!footer} /> : <div>Something UI</div>}
      </Modal>
    </div>
  );
};

// Stories
storiesOf('Modal', module)
  .add('Small modal', () => <Demo size="sm" noForm={true} />)
  .add('Normal modal', () => <Demo />)
  .add('Large modal', () => <Demo size="lg" />)
  .add('Modal with footer', () => <Demo footer={true} textOk="Save" textCancel="Cancel" />);
