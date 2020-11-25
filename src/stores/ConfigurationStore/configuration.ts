import { createStore, createHook, StoreActionApi } from 'react-sweet-state';

import { groupBy } from 'lodash';
import API from 'api';
import ApiConfig from 'config';

import { ConfigurationState, ConfigurationText, ConfigurationData } from './configurationType';

export const CONFIGURATION_STORE = 'ConfigurationStore';
type StoreApi = StoreActionApi<ConfigurationState>;
type Actions = typeof actions;

export const initialState: ConfigurationState = {
  endingType: [],
  setLocation: [],
  plot: [],
  era: [],
  relation: [],
  theme: [],
  mood: [],
  productionCountry: [],
  censorshipClass: [],
  dialect: [],
  originalLanguage: [],
  countries: [],
  genres: []
};

export const actions = {
  fetchConfiguration: () => async ({ setState, getState }: StoreApi) => {
    const { content } = await API({
      url: '/',
      method: 'GET'
    });

    const configuration = groupBy(content, 'type');
    setState({
      ...getState(),
      ...configuration
    });
  },
  fetchCountries: () => async ({ getState, setState }: StoreApi) => {
    const countries = await API({
      url: '/',
      method: 'GET'
    });

    setState({
      ...getState(),
      countries
    });
  },
  fetchGenres: () => async ({ setState, getState }: StoreApi) => {
    const genres = await API({
      url: '/',
      method: 'GET'
    });

    setState({
      ...getState(),
      genres
    });
  }
};

const Store = createStore<ConfigurationState, Actions>({
  initialState,
  actions,
  name: CONFIGURATION_STORE
});

const getCountries = (state: ConfigurationState) => state.countries;

const getLocations = (state: ConfigurationState) => state.setLocation.map(convertToSuggestionItem);

const getMoods = (state: ConfigurationState) => state.mood.map(convertToSuggestionItem);

const getEras = (state: ConfigurationState) => state.era.map(convertToSuggestionItem);

const getPlots = (state: ConfigurationState) => state.plot.map(convertToSuggestionItem);

const getThemes = (state: ConfigurationState) => state.theme.map(convertToSuggestionItem);

const getRelations = (state: ConfigurationState) => state.relation.map(convertToSuggestionItem);

const getDialects = (state: ConfigurationState) => state.dialect.map(convertToSuggestionItem);

const getProductionCountries = (state: ConfigurationState) => state.productionCountry;

const getCensorship = (state: ConfigurationState) => state.censorshipClass.map(convertToSuggestionItem);

const getEndingTypes = (state: ConfigurationState) => state.endingType.map(convertToSuggestionItem);

const convertToSuggestionItem = (configData: ConfigurationData) => {
  return { id: configData.code, value: chooseValue(configData.label) };
};
const chooseValue = (configText: ConfigurationText) => {
  return configText.en ? configText.en : configText.ar;
};

const useConfiguration = createHook(Store);

export const useCountries = createHook(Store, { selector: getCountries });
export const useLocationConfig = createHook(Store, { selector: getLocations });
export const useThemeConfig = createHook(Store, { selector: getThemes });
export const usePlotConfig = createHook(Store, { selector: getPlots });
export const useEraConfig = createHook(Store, { selector: getEras });
export const useRelationConfig = createHook(Store, { selector: getRelations });
export const useMoodConfig = createHook(Store, { selector: getMoods });
export const useDialectConfig = createHook(Store, { selector: getDialects });
export const useProductionCountryConfig = createHook(Store, { selector: getProductionCountries });
export const useCensorShipConfig = createHook(Store, { selector: getCensorship });
export const useEndingTypeConfig = createHook(Store, { selector: getEndingTypes });

export default useConfiguration;
