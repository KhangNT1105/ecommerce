import React from 'react';

interface Item {
  content: string | React.ReactNode;
  onChosen?: () => void;
}

export interface FormDropdownProps {
  placeholder: string;
  currentValue?: string;
  itemList?: Item[];
  readonly?: boolean;
  disabled?: boolean;
}
