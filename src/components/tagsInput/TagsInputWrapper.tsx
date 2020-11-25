import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'reactstrap';

import { useTagsInputState } from './TagsInput.store';
import { WrapperProps, Params } from './TagsInput.d';
import API from '../../api';

import TagsInput from 'components/tagsInput/TagsInput';

const TagsInputWrapper: React.FC<WrapperProps> = ({
  readonly,
  endpoint,
  getSelectedTags,
  shouldClearTags,
  clearTags
}) => {
  const [state, actions] = useTagsInputState();

  const [data, setData] = useState([]);
  const [currentParams, setCurrentParams] = useState<Params | undefined>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

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
        setData(response.content);
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
  }, [endpoint, currentParams]);

  useEffect(() => {
    if (state.isSearching) {
      setCurrentParams(state.params);
    }
  }, [setCurrentParams, state]);

  const handleInputChange = (query: string) => {
    const newParam: Params = {
      ...state.params,
      text: query,
      sort: 'email,asc'
    };
    actions.setSearching(true, newParam);
  };

  return (
    <TagsInput
      readonly={readonly}
      handleInputChange={handleInputChange}
      suggestions={data}
      getSelectedTags={getSelectedTags}
      shouldClearTags={shouldClearTags}
      clearTags={clearTags}
      isLoading={loading}
      customLoader={<Spinner size="sm" color="secondary" />}
    />
  );
};

export default TagsInputWrapper;
