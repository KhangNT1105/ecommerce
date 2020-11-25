export type CityLabel = {
  en: string;
  ar: string;
};

export interface CityProps {
  label: CityLabel;
  code: string;
}

export interface CityLookupProps {
  onChooseCity?: (city: CityProps) => void;
  cities?: CityProps[];
  language?: string;
  message?: string;
}

export interface CityLookupDropdownProps {
  value?: string;
  cities?: CityProps[];
  onChooseCity?: (label: string) => void;
  language?: string;
  readonly?: boolean;
}
