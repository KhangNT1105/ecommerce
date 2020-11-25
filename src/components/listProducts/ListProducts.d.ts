import { ProductValue } from 'stores/ProductStore/productStore.d';

export interface ListProductsProps {
  items: ProductValue[];
  title: string;
  handleAddToCart: (product: ProductValue) => void;
}
