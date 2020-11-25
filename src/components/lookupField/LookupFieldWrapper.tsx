import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';

import API from 'api';

import LookupFieldTags from 'components/lookupField/lookupFieldChild/LookupFieldTags';
import { Params } from 'components/tagsInput/TagsInput.d';
import {
  WrapperPropsOther,
  ILookupFieldProps,
  TagsInputPropsOther,
  TagElementOther
} from 'components/lookupField/LookupFieldType.d';

const LookupFieldWrapper: React.FC<TagsInputPropsOther & ILookupFieldProps & WrapperPropsOther> = ({
  errorText,
  endpoint,
  fieldName,
  readonly,
  shouldClearTags,
  single,
  selectedTags,
  sort,
  suggestions = [],
  touch,
  setSelectedTags,
  clearTags,
  mappingFn,
  shouldAddNew,
  renderElement,
  isShowSuggestion,
  shouldHaveStatus
}) => {
  const [state, actions] = useState({
    isSearching: false,
    params: shouldHaveStatus ? { status: ['activated', 'updated'] } : {}
  });

  const [data, setData] = useState(suggestions);
  const [currentParams, setCurrentParams] = useState<Params | undefined>({});
  const [loading, setLoading] = useState(false);
  const [isMapping, setIsMapping] = useState(true);

  useEffect(() => {
    // check if mappingFn exist
    if (isMapping && mappingFn) {
      setData(mappingFn(data));
      setIsMapping(false);
    }
  }, [mappingFn, setData, data, isMapping]);

  useEffect(() => {
    if (endpoint) {
      const cancelTokenSource = axios.CancelToken.source();
      // check endpoint existing, call api
      const fetchData = async function () {
        try {
          setLoading(true);
          const response = await API({
            url: endpoint,
            params: currentParams,
            method: 'GET',
            headers: {},
            data: {},
            cancelTokenSource
          });

          let respContent = response.content;
          // check if mappingFn exist
          if (mappingFn) {
            respContent = mappingFn(response);
          }
          return setData(respContent);
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      };

      if (currentParams!.text) {
        fetchData();
      }

      return () => {
        cancelTokenSource && cancelTokenSource.cancel();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    endpoint,
    currentParams
    //  mappingFn // this makes the endpoint re-invokes when other fields input changes
  ]);

  useEffect(() => {
    if (state.isSearching) {
      setCurrentParams(state.params);

      if (!endpoint) {
        let dataFiltered: TagElementOther[] = [];
        if (currentParams!.text) {
          const regex = new RegExp(`${currentParams!.text}`, 'gi');
          dataFiltered = suggestions.filter(
            (suggestion) => !!suggestion[fieldName] && suggestion[fieldName].search(regex) > -1
          );
        }
        setData(dataFiltered);
      }
    }
  }, [setCurrentParams, state, currentParams, endpoint, suggestions, selectedTags, fieldName]);

  useEffect(() => {
    if (suggestions && suggestions.length) {
      setData([...suggestions]);
    }
  }, [suggestions]);

  const handleInputChange = (query: string) => {
    // check input text length must be greater than 1 to call api
    if (query.length > 1) {
      const newParam = {
        ...state.params,
        text: query.trim(),
        sort
      };
      actions({ isSearching: true, params: newParam });
    }
  };

  return (
    <LookupFieldTags
      errorText={errorText}
      fieldName={fieldName}
      isLoading={loading}
      readonly={readonly}
      selectedTags={selectedTags}
      single={single}
      suggestions={data}
      shouldClearTags={shouldClearTags}
      touch={touch}
      customLoader={<Spinner size="sm" color="secondary" />}
      clearTags={clearTags}
      setSelectedTags={setSelectedTags}
      handleInputChange={handleInputChange}
      shouldAddNew={shouldAddNew}
      renderElement={renderElement}
      isShowSuggestion={isShowSuggestion}
    />
  );
};

export default LookupFieldWrapper;
