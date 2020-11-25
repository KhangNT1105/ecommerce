import React from 'react';
import { storiesOf } from '@storybook/react';

import { TOAST_TYPE, DURATION, POSITION } from '../../constants/enum';
import Toast from './Toast';

// Stories
storiesOf('Toastify', module)
  .add('Default type, default position', () => (
    <Toast message={'This is default toast message.'} duration={DURATION.TOAST} />
  ))
  .add('Error type, bottom right position', () => (
    <Toast
      message={'This is error toast message.'}
      type={TOAST_TYPE.ERROR}
      duration={DURATION.TOAST}
      position={POSITION.BOTTOM_RIGHT}
    />
  ))
  .add('Success type, top right position', () => (
    <Toast
      message={'This is success toast message.'}
      type={TOAST_TYPE.SUCCESS}
      duration={DURATION.TOAST}
      position={POSITION.TOP_RIGHT}
    />
  ))
  .add('Use handleClose callback', () => (
    <Toast
      message={'This is success toast message.'}
      type={TOAST_TYPE.SUCCESS}
      duration={DURATION.TOAST}
      position={POSITION.TOP_RIGHT}
      handleClose={() => {
        alert('callback on closed');
      }}
    />
  ));
