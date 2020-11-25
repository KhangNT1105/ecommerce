import React, { useState, useLayoutEffect } from 'react';

import { ILookupFieldProps, TagsInputPropsOther } from 'components/lookupField/LookupFieldType.d';
import LookupFieldWrapper from 'components/lookupField/LookupFieldWrapper';

const LookupField: React.FC<ILookupFieldProps & TagsInputPropsOther> = (props) => {
  const {
    errorText,
    endpoint,
    fieldName,
    readonly,
    shouldClearTags,
    single = false,
    sort,
    suggestions = [],
    selectedTags = [],
    touch,
    mappingFn,
    onChange = (tags: []) => Function,
    shouldAddNew,
    selectedLength,
    renderElement,
    isShowSuggestion,
    shouldHaveStatus
  } = props;
  const [selectedItems, setSelectedItems] = useState(selectedTags);

  useLayoutEffect(() => {
    setSelectedItems(selectedTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLength]);

  const setSelectedTags = (tags: object[] | any) => {
    setSelectedItems(tags);

    onChange(tags);
  };
  const clearTags = () => {
    setSelectedItems([]);
  };
  return (
    <LookupFieldWrapper
      errorText={errorText}
      endpoint={endpoint}
      fieldName={fieldName}
      readonly={readonly}
      suggestions={suggestions}
      shouldClearTags={shouldClearTags}
      single={single}
      sort={sort}
      selectedTags={selectedItems}
      touch={touch}
      setSelectedTags={setSelectedTags}
      clearTags={clearTags}
      mappingFn={mappingFn}
      shouldAddNew={shouldAddNew}
      renderElement={renderElement}
      isShowSuggestion={isShowSuggestion}
      shouldHaveStatus={shouldHaveStatus}
    />
  );
};

export default LookupField;
