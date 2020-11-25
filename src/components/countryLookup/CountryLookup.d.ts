export type CountryLabel = {
  en: string;
  ar: string;
};

export interface CountryProps {
  label: CountryLabel;
  code: string;
}
export interface CountryLookupProps {
  onChooseCountry?: (country: CountryProps) => void;
  language?: string;
  message?: string;
}

export interface CountryLookupDropdownProps {
  onChooseCountry?: (code: string) => void;
  countryCode?: string;
  language?: string;
  readonly?: boolean;
}
