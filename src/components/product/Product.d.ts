import { ProductValue } from 'stores/ProductStore/productStore.d';

export interface ProductProps {
  product: ProductValue;
  handleAddToCart: (product: ProductValue) => void;
  // category:CategoryProps;
  // specifications:string;
  // description:string;
}
