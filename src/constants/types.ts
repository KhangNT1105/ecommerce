export type MarketType = {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  currencySymbol: string;
  active: boolean;
};

export type ClientType = {
  clientId: string;
  clientName: string;
  active: boolean;
};

export type PaginationType = {
  totalPages: number;
  totalItems: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | undefined;
  size: number | 10;
  page: number | undefined;
};

export type MenuItem = {
  path: string;
  name: string;
  icon: string;
  children: MenuItem[];
};

export type ProductDenominationType = {
  label: string;
  price: number;
};

export interface IProductImage {
  logo: string;
  thumbnail?: string;
  portrait?: string;
  landscape?: string;
}

export interface ICategory {
  id: string;
  name: string;
  parentCategoryId?: string;
  externalCategoryId?: string;
  vendor?: string;
}

export interface IProductItem {
  id: string;
  displayName: string;
  vendor: string;
  productId?: string;
  market?: string;
  productBrand?: string;
  ghostLinkExpiryDays?: number;
  minimumAllowableExpiryDays?: number;
  valueType?: string;
  minPrice?: number;
  maxPrice?: number;
  redemptionType?: string;
  denominations?: string[];
  productDenominations?: ProductDenominationType[];
  ghostLinkInMarket?: number;
  allocated?: number;
  inQueue?: number;
  stockOnHand?: number;
  expiring?: number;
  internalName?: string;
  originalName?: string;
  description?: string;
  externalProductId?: string;
  categoryIds?: string[];
  published?: string;
  outOfStockBehaviour?: string;
  images?: IProductImage;
  brand?: {
    brandLogo?: string;
    brandName?: string;
  };
}

export interface AnyObject {
  [key: string]: any;
}

export interface StringPropertyObject {
  [key: string]: string;
}

export const SortValues = {
  ASC: 'updatedAt.asc',
  DESC: 'updatedAt.desc'
};

export const PortalType = {
  DOMAIN: 'domain',
  SMS: 'sms'
};

export type FnType = (param?: object) => void;
export type FnSubmitFormType = (event: React.FormEvent<HTMLFormElement>) => void;

export type EXPORT_TYPE = 'txt' | 'json' | 'csv' | 'xls' | 'xml';

export type PathParamsWithIDType = {
  id: string;
};
