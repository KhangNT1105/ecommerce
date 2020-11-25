import { ReactElement } from 'react';

export type StepsProps = {
  current?: number;
  children: ReactElement[];
  onChange?: (current: number) => void;
};

export type StepsItemProps = {
  title?: string;
  index?: number;
  isActive?: boolean;
  isFinished?: boolean;
  isWaiting?: boolean;
  onChange?: (current: number) => void;
};
