import { useState, useEffect } from 'react';
import API from './index';
import { useStoreAPI } from './storeAPI';
import { Params, useApiFunction } from './useAPI.d';
import { GET_METHOD } from 'api/api.constants';
import { get } from 'lodash';
/*
  custom hook for performing GET request
*/
const useAPI: useApiFunction = ({
  url,
  initialValue = [],
  params = {},
  method = GET_METHOD,
  payload = '',
  loadInitialState = false
}) => {
  const [data, setData] = useState(initialValue);
  const [currentInitialState, setCurrentInitialState] = useState(loadInitialState);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [currentMethod, setCurrentMethod] = useState(method);
  const [currentParams, setCurrentParams] = useState<Params | undefined>(params);
  const [currentPayLoad, setCurrentPayLoad] = useState(payload);
  const [loading, setLoading] = useState(true);
  const [state, actions] = useStoreAPI();

  useEffect(() => {
    const fetchData = async function () {
      try {
        actions.setFetching(true);
        actions.setError(false);
        actions.setResetErrorMessage();
        setLoading(true);
        const response = await API({
          url: currentUrl,
          params: currentParams,
          method: currentMethod,
          headers: {},
          data: currentPayLoad
        });
        setData(response);
        actions.setData(response);
      } catch (error) {
        let userMessage = '';
        if (get(error, 'response.data.status', 0) === 404) {
          userMessage = get(error, 'response.data.error', '');
        } else {
          userMessage = get(error, 'response.data.userMessage', '');
        }
        actions.setError(true);
        actions.setFaults(userMessage);
        throw error;
      } finally {
        actions.setFetching(false);
        actions.setLoaded(true);
        setLoading(false);
      }
    };
    if (currentInitialState) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, currentParams, currentUrl, currentMethod]);
  return {
    loading,
    data,
    state,
    actions,
    setCurrentUrl,
    setCurrentParams,
    setCurrentInitialState,
    setCurrentMethod,
    setCurrentPayLoad
  };
};

export default useAPI;
