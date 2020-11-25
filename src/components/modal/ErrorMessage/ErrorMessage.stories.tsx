import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../../button/Button';
import ErrorMessage from './ErrorMessage';

// Button with action for confirmation
const WithActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="m-3">
      <Button onClick={toggle}>Save</Button>
      <ErrorMessage isOpen={isOpen} title="Error" message={'Something is wrong!!!'} onCancelHandler={toggle} />
    </div>
  );
};

const message = <label>From date and To date are </label>;

// Stories
storiesOf('Modal - Error', module)
  .add('Auto show error message', () => <ErrorMessage isOpen={true} title="Error" message={message} />)
  .add('Show error when submit form', () => <WithActionButton />);
