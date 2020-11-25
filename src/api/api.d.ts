import { Method, CancelTokenSource } from 'axios';
import { AnyObject } from 'constants/types';

export type ErrorObjectType = {
  property: string;
  invalidValue: string;
  message: string;
};

export interface DataProperty {
  url: string;
  params?: AnyObject | string | undefined;
  method?: Method;
  headers?: AnyObject;
  data?: AnyObject | string;
  cancelTokenSource?: CancelTokenSource;
}

export type APIFunction = (params: DataProperty) => any;
