interface ConfigurationData {
  type: string;
  code: string;
  label: ConfigurationText;
}

interface ConfigurationText {
  en: string;
  ar: string;
}

interface MicroGenre {
  code: string;
  id: string;
  label: {
    [key: string]: string;
  };
}

export interface SubGenre {
  code: string;
  id: string;
  label: {
    [key: string]: string;
  };
  children?: MicroGenre[];
  [key: string]: string;
}
export interface Genre {
  code: string;
  id: string;
  children?: SubGenre[];
  label: {
    [key: string]: string;
  };
  [key: string]: string;
}

interface ConfigurationState {
  endingType: ConfigurationData[];
  setLocation: ConfigurationData[];
  plot: ConfigurationData[];
  era: ConfigurationData[];
  relation: ConfigurationData[];
  theme: ConfigurationData[];
  mood: ConfigurationData[];
  productionCountry: ConfigurationData[];
  censorshipClass: ConfigurationData[];
  dialect: ConfigurationData[];
  originalLanguage: ConfigurationData[];
  countries: ConfigurationData[];
  genres: Genre[];
}

export { ConfigurationState, ConfigurationText, ConfigurationData };
