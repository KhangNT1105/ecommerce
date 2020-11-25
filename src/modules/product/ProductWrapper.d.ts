interface ProductSummaryProps {
  price?: number;
  priceDiscount?: number;
  model?: string;
  origin?: string;
  name?: string;
  label?: string;
  quantity?: number;
  image?: string;
  setQuantity: (value: number) => void;
}
interface ProductLocationParams {
  id: string;
}
export { ProductSummaryProps, ProductLocationParams };
