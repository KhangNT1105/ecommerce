import React from 'react';
import { InputGroup, InputGroupAddon, Input } from 'reactstrap';

import { datePickerAddonInput } from './datePickerAddonInput.d';

// forwardRef from this input to input of react date picker
const DatePickerAddonInput = React.forwardRef((props: datePickerAddonInput, ref: any) => {
  const { className, onClick, onChange, value, placeholder } = props;

  return (
    <InputGroup className={className}>
      <InputGroupAddon addonType="prepend">
        <div className="input-group-text">
          <i className="fa fa-calendar-o" onClick={onClick} ref={ref} />
        </div>
      </InputGroupAddon>
      <Input onClick={onClick} onChange={onChange} value={value} ref={ref} placeholder={placeholder} />
    </InputGroup>
  );
});

export default DatePickerAddonInput;
