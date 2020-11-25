import { notify } from 'components/toast/Toast';
import i18n from 'i18n/i18n';
import { CartValues, CartState, PlaceOrderValues } from './cartStore.d';
import { StoreActionApi, createStore, createHook, createContainer } from 'react-sweet-state';
import { ProductValue } from 'stores/ProductStore/productStore.d';
type Actions = typeof actions;
type StoreApi = StoreActionApi<CartState>;
export const CART_STORE = 'StoreCart';

export const actions = {
  addProduct: (product: ProductValue) => ({ getState, setState }: StoreApi) => {
    const cartValues: CartValues = {
      product,
      quantity: 1
    };
    const updatedListCart = [...getState().listCart, cartValues];
    setState({
      ...getState(),
      listCart: updatedListCart
    });
    notify.success(i18n.t('THEM_VAO_GIO_HANG_THANH_CONG'));
  },
  quantityIncrement: (index: number, quantity: number) => ({ getState, setState }: StoreApi) => {
    const updatedListCart = [...getState().listCart];
    updatedListCart[index].quantity = quantity;
    setState({
      ...getState(),
      listCart: updatedListCart
    });
  },
  placeOrder: (values: PlaceOrderValues) => ({ getState, setState }: StoreApi) => {
    try {
      notify.success('nice');
    } catch (error) {}
  }
};
export const initialState: CartState = {
  message: '',
  listCart: [],
  initiated: false,
  isLoading: false,
  success: false
};
const Store = createStore<CartState, Actions>({
  initialState,
  actions,
  name: CART_STORE
});
export const storeKey = `${Store.key.join('__')}@__global__`;
type StoreContainerProps = {
  initialState: CartState;
};
const useCart = createHook(Store);
export const AuthenticationContainer = createContainer<CartState, Actions, StoreContainerProps>(Store, {
  onInit: () => ({ setState }: StoreApi, { initialState }) => {
    setState({ ...initialState });
  }
});
export default useCart;
