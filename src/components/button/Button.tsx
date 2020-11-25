import React from 'react';
import { Button as CustomButton } from 'reactstrap';
import './Button.scss';

import { COLOR, SIZE, CLASS_NAME } from 'constants/enum';

interface ButtonProps {
  id?: string;
  name?: string;
  children: React.ReactNode;
  color?: string;
  title?: string;
  size?: string;
  className?: string;
  outline?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: React.MouseEventHandler<any>;
}

const Button: React.FC<ButtonProps> = ({
  id,
  name,
  color,
  outline,
  size,
  children,
  disabled,
  type,
  onClick,
  className = ''
}) => {
  return (
    <CustomButton
      id={id}
      name={name}
      className={`${className} ${disabled ? CLASS_NAME.DISABLED : ''}`}
      type={type}
      color={color || COLOR.INFO}
      size={size || SIZE.SMALL}
      disabled={disabled}
      onClick={onClick}
      outline={outline || false}
    >
      {children}
    </CustomButton>
  );
};

Button.defaultProps = {
  type: 'button'
};

export default Button;
