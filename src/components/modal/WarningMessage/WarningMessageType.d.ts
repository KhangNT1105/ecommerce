import React, { ReactElement } from 'react';
import { FnType } from 'constant/types';

// Interfaces & Props
export type TWarningMessageProps = {
  isOpen: boolean;
  message: string | React.FC | ReactElement;
  textCancel?: string;
  textOk?: string;
  title?: string;
  onOkHandler?: FnType;
  onCancelHandler?: FnType;
};
