import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../../button/Button';
import InfoMessage from './InfoMessage';

// Button for show info message
const WithButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="m-3">
      <Button onClick={toggle}>Click here</Button>
      <InfoMessage
        isOpen={isOpen}
        title="Information"
        message={'Do you want to do this?'}
        onOkHandler={toggle}
        onCancelHandler={toggle}
      />
    </div>
  );
};

// Button with action for confirmation
const WithActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const confirmDeleteItem = () => {
    toggle();
  };

  return (
    <div className="m-3">
      <Button onClick={toggle}>Delete</Button>
      <InfoMessage
        isOpen={isOpen}
        title="Information"
        message={'Do you want to do this?'}
        onOkHandler={confirmDeleteItem}
        onCancelHandler={toggle}
      />
    </div>
  );
};

const message = (
  <label>
    This is auto triggered message!!! <br /> Do you want to do this?
  </label>
);

// Stories
storiesOf('Modal - Info', module)
  .add('Auto show info message', () => <InfoMessage isOpen={true} title="Information" message={message} />)
  .add('Use button to show info message', () => <WithButton />)
  .add('Use to confirm action', () => <WithActionButton />);
