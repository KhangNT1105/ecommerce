import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import FilterQuick from './FilterQuick';

interface FilterItem {
  field: string;
  value: string;
  chosen?: boolean;
}

const filterList: FilterItem[] = [
  {
    field: 'status',
    value: 'Active'
  },
  {
    field: 'type',
    value: 'Admin'
  },
  {
    field: 'type',
    value: 'User'
  }
];

const TestFilterQuickWrapper = () => {
  const [list, setList] = useState(filterList);

  const handleClick = (targetField: string, targetValue: string) => {
    const newList = [...list];
    const targetIndex = newList.findIndex(({ field, value }) => targetField === field && targetValue === value);
    if (targetIndex > -1) {
      newList[targetIndex] = {
        ...newList[targetIndex],
        chosen: !newList[targetIndex].chosen
      };
    }
    setList(newList);
  };

  return <FilterQuick filterList={list} onChooseFilter={handleClick} />;
};

storiesOf('FilterQuick', module).add('default', () => <TestFilterQuickWrapper />);
