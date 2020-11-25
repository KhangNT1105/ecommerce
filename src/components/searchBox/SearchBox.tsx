import React, { useState, useRef } from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import './SearchBox.scss';
import { CLASS_NAME } from 'constants/enum';

export type InputType = 'text' | undefined;
export type BtnType = 'button' | 'submit' | undefined;
export type TimeOutType = number | null | any;

export interface inputProps {
  name: string;
  placeholder?: string;
  inputType?: InputType;
  autoSubmitAfterTime?: number;
}

export interface buttonProps {
  children: React.ReactNode;
  color?: string;
  btnType?: BtnType;
  onClick?: React.MouseEventHandler<any>;
}

interface SearchBoxProps {
  inputProps: inputProps;
  buttonProps?: buttonProps;
  onSubmit?: (searchTerm: string) => void;
  className?: string;
  readonly?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ readonly, inputProps, buttonProps = {}, onSubmit, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const typingTimeoutRef = useRef<TimeOutType>(null);
  const { name, placeholder, inputType, autoSubmitAfterTime } = inputProps;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearchTerm(value);

    if (!autoSubmitAfterTime) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSubmit && onSubmit(value.trim());
      clearTimeout(typingTimeoutRef.current);
    }, autoSubmitAfterTime);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    onSubmit && onSubmit(searchTerm.trim());
  };

  return (
    <>
      <Row className={`search-box ${className}`}>
        <Col xs={9}>
          <InputGroup className="mr-2" size="sm">
            <Input
              className={`${readonly ? CLASS_NAME.READONLY : ''}`}
              name={name}
              placeholder={placeholder}
              type={inputType}
              onChange={handleChange}
              value={searchTerm}
              readOnly={readonly}
            />
            <InputGroupAddon addonType="prepend">
              <div className="input-group-text" onClick={handleOnSubmit}>
                <i className="fa fa-search fa-fw" />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

export default SearchBox;
