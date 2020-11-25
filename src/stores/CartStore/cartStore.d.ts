import { CheckoutFormValues } from 'modules/checkout/CheckoutWrapper.d';
import { ProductValue } from 'stores/ProductStore/productStore.d';

export interface CartState {
  message: string;
  listCart: CartValues[];
  cart?: CartValues;
  initiated?: boolean;
  success: boolean;
  isLoading: boolean;
}
export interface CartValues {
  product: ProductValue;
  quantity: number;
}
export interface PlaceOrderValues {
  listOrder: CartValues[];
  paymentType: string;
  userInformation: CheckoutFormValues;
}
