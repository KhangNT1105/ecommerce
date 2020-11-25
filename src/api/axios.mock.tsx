import { AxiosStatic } from 'axios';

export interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
  mockClear: Function;
}

export default AxiosMock;
