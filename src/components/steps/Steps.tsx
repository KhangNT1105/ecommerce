import React from 'react';
import classNames from 'classnames';

import { StepsProps, StepsItemProps } from './StepsType';
import './Steps.scss';

export const Step = (props: StepsItemProps) => {
  const { title, isActive, isFinished, isWaiting, onChange, index = 0 } = props;
  return (
    <div
      className={classNames('steps-item', {
        active: isActive,
        finish: isFinished,
        wait: isWaiting,
        pointer: onChange
      })}
      onClick={() => {
        if (onChange) return onChange(index);
      }}
    >
      <div className="steps-item-container">
        <div className="steps-item-icon">
          <span className="steps-icon">
            {isActive && index + 1}
            {isFinished && '✓'}
          </span>
        </div>
        <div className="steps-item-content">
          <div className="steps-item-title">{title}</div>
        </div>
      </div>
    </div>
  );
};

const Steps = (props: StepsProps) => {
  const { current = 0, children, onChange } = props;
  return (
    <div className="steps">
      {children.map((item, index) =>
        React.cloneElement(item, {
          isActive: current === index || false,
          isFinished: current > index || false,
          isWaiting: current < index || false,
          onChange: current !== index && onChange,
          index
        })
      )}
    </div>
  );
};

export default Steps;
