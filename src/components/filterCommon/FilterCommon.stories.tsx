import { storiesOf } from '@storybook/react';

import React, { useState } from 'react';
import FilterCommon from './FilterCommon';

const sampleFilterSuggestion = [
  {
    tagName: 'Id',
    suggestionList: ['1', '2', '3']
  },
  {
    tagName: 'Name',
    suggestionList: ['Nate', 'Yagami', 'Raito']
  },
  {
    tagName: 'Creator',
    suggestionList: ['Nate2', 'Yagami2', 'Raito2']
  }
];

const emptyArray: any[] = [];

const FilterCommonTestWrapper = () => {
  const filterList = ['Id', 'Name', 'Creator'];

  const [filterValueList, setFilterValueList] = useState(emptyArray);

  const addFilterField = (field: string) => {
    const filterSuggestion = sampleFilterSuggestion.find((filterElm) => filterElm.tagName === field);
    if (filterSuggestion && !filterValueList.find((filterElm) => filterElm.tagName === field)) {
      setFilterValueList([
        ...filterValueList,
        {
          ...filterSuggestion,
          values: []
        }
      ]);
    }
  };

  const addValue = (field: string, value: string) => {
    const newValueList = [...filterValueList];
    const targetValueListIndex = newValueList.findIndex((valueElm) => valueElm.tagName === field);
    if (
      targetValueListIndex > -1 &&
      !newValueList[targetValueListIndex].values.find((listValue: string) => listValue === value)
    ) {
      const newTargetValueList = {
        ...newValueList[targetValueListIndex],
        values: [...newValueList[targetValueListIndex].values, value]
      };
      newValueList[targetValueListIndex] = newTargetValueList;
      setFilterValueList(newValueList);
    }
  };

  const removeValue = (field: string, value: string) => {
    const newValueList = [...filterValueList];
    const targetValueListIndex = newValueList.findIndex((valueElm) => valueElm.tagName === field);
    if (targetValueListIndex > -1) {
      const newTargetValueList = {
        ...newValueList[targetValueListIndex],
        values: newValueList[targetValueListIndex].values.filter((listValue: string) => listValue !== value)
      };
      newValueList[targetValueListIndex] = newTargetValueList;
      setFilterValueList(newValueList);
    }
  };

  return (
    <FilterCommon
      filterList={filterList}
      filterValueList={filterValueList}
      onFieldChoose={addFilterField}
      addValue={addValue}
      removeValue={removeValue}
    />
  );
};

storiesOf('FilterCommon', module).add('default', () => <FilterCommonTestWrapper />);
