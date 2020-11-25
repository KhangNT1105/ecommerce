import React from 'react';

import { CLASS_NAME } from 'constants/enum';

import { InputProps } from '../TagsInput.d';

const Input: React.FC<InputProps> = ({
  readonly,
  value,
  isLoading,
  customLoader,
  handleChange,
  handleKeyDown,
  handleBlur,
  handleFocus,
  inputRef
}) => (
  <>
    <li className="input-box">
      <input
        type="text"
        className={`${readonly ? CLASS_NAME.READONLY : ''}`}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={value}
        ref={inputRef}
        readOnly={readonly}
      />
      {isLoading && customLoader}
    </li>
  </>
);

export default Input;
