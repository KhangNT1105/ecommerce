import { EXPORT_TYPE } from '../../constants/types';

export type RespType = {
  error: boolean;
  msg: string;
};
export type Props = {
  color?: string;
  size?: string;
  outline?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  handleExport?: (resp: RespType) => void;

  apiUrl: string;
  exportType: EXPORT_TYPE;
};
export type StateType = {
  exportNow: boolean;
  exportData: object[];
};
