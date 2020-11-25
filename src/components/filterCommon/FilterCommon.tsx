import React from 'react';

import Styles from './FilterCommon.module.scss';

import FilterBlock from '../../components/filterBlock/FilterBlock';
import FilterTag from 'components/filterTag/FilterTag';

interface SuggestionWithTitle {
  title: string;
  value: string;
}
interface FilterValue {
  tagName: string;
  values: string[];
  suggestionList?: (string | SuggestionWithTitle)[];
  hasInput?: boolean;
  apiLookupField?: string;
  fieldName?: string;
}

interface FilterCommonProps {
  filterList: string[];
  filterValueList: FilterValue[];
  onFieldChoose?: (params: any) => void;
  addValue?: (field: string, value: string) => void;
  removeValue?: (field: string, value: string) => void;
  removeField?: (field: string) => void;
  className?: string;
}

const FilterCommon: React.FC<FilterCommonProps> = ({
  filterList,
  filterValueList,
  onFieldChoose,
  addValue,
  removeValue,
  removeField,
  className
}) => {
  return (
    <div className={`${Styles['filter-common']} ${className}`}>
      <FilterBlock filterList={filterList} onItemChoose={onFieldChoose} />
      {filterValueList.map(({ apiLookupField, fieldName, tagName, values, suggestionList, hasInput }, index) => {
        return (
          <FilterTag
            className={Styles['filter-tag']}
            endpoint={apiLookupField}
            fieldName={fieldName}
            hasInput={hasInput}
            key={index}
            tagName={tagName}
            suggestionList={suggestionList}
            values={values}
            addValue={addValue}
            removeValue={removeValue}
            removeField={removeField}
          />
        );
      })}
    </div>
  );
};

export default FilterCommon;
