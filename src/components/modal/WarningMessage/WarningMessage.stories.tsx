import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../../button/Button';
import WarningMessage from './WarningMessage';
import { useTranslation } from 'react-i18next';

// Button with action for confirmation
const WithActionButton = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const goBack = () => {
    toggle();
  };

  return (
    <div className="m-3">
      <Button onClick={toggle}>Back to list</Button>
      <WarningMessage
        isOpen={isOpen}
        message={t('LOST_DATA')}
        textCancel={t('CANCEL')}
        textOk={t('OK')}
        title="Warning"
        onOkHandler={goBack}
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
storiesOf('Modal - Warning', module)
  .add('Auto show info message', () => <WarningMessage isOpen={true} title="Warning" message={message} />)
  .add('Use to confirm action', () => <WithActionButton />);
