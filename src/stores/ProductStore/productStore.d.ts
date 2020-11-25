import { Params } from '../../api/useAPI.d';

export interface ProductState {
  message: string;
  listProduct: ProductValue[];
  total?: number;
  params?: Params;
  initiated?: boolean;
  success: boolean;
  isLoading: boolean;
}
export interface ProductValue {
  _id: string | number;
  code?: string;
  name?: string;
  label?: string;
  model?: string;
  origin?: string;
  specification?: string;
  parameter?: string;
  image?: string;
  category?: string;
  price?: number;
  priceDiscount?: number;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  is_deleted?: boolean;
}
