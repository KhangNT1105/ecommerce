import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import Button from '../button/Button';

import Steps, { Step } from './Steps';
import { COLOR, SIZE } from '../../constants/enum';

const steps = [
  {
    title: 'First',
    content: 'First-content'
  },
  {
    title: 'Second',
    content: 'Second-content'
  },
  {
    title: 'Third',
    content: 'Third-content'
  },
  {
    title: 'Last',
    content: 'Last-content'
  }
];

storiesOf('Steps', module).add('default', () => {
  const [current, setCurrent] = useState(0);

  const nextStep = () => {
    setCurrent(current + 1);
  };

  const prevStep = () => {
    setCurrent(current - 1);
  };

  const onChange = (current: number): void => {
    setCurrent(current);
  };

  return (
    <>
      <Steps current={current} onChange={onChange}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div>{steps[current].content}</div>
      <div>
        {current < steps.length - 1 && (
          <Button onClick={nextStep} color={COLOR.PRIMARY} size={SIZE.SMALL}>
            Next
          </Button>
        )}
        {current > 0 && (
          <Button className="ml-2" onClick={prevStep} color={COLOR.PRIMARY} size={SIZE.SMALL}>
            Back
          </Button>
        )}
      </div>
    </>
  );
});
