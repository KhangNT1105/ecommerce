import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { KEY_NAMES } from 'constants/keyCode.type';
import { DEFAULT_MAX_LENGTH_INPUT } from 'constants/index';

import 'components/filterTag/FilterTag.module.scss';
import LookupField from 'components/lookupField/LookupField';
import { TagElementOther } from 'components/lookupField/LookupFieldType.d';
import { useTagsInputState } from 'components/tagsInput/TagsInput.store';

interface SuggestionWithTitle {
  title: string;
  value: string;
}

interface FilterTagProps {
  className?: string;
  hasInput?: boolean;
  suggestionList?: (string | SuggestionWithTitle)[];
  tagName: string;
  values?: string[];
  addValue?: (field: string, value: string) => void;
  removeValue?: (field: string, value: string) => void;
  removeField?: (field: string) => void;
}
interface FilterTagPropsOther {
  endpoint?: string;
  fieldName?: string;
}

const FilterTag: React.FC<FilterTagProps & FilterTagPropsOther> = ({
  className,
  endpoint,
  fieldName,
  hasInput = true,
  suggestionList,
  tagName,
  values,
  addValue = () => {},
  removeValue,
  removeField
}) => {
  const { t } = useTranslation();

  const [, actions] = useTagsInputState();

  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedLookupFields, setSelectedLookupFields] = useState<TagElementOther[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagElementOther[]>([]);

  const tagRef = useRef<HTMLDivElement | null>(null);

  const toggleInput = (isShow: boolean) => () => {
    // toggle input
    setShowInput(isShow);
  };

  const onAddValue = (value: string) => () => {
    addValue && addValue(tagName, value);
    setShowInput(false);
  };

  const onRemoveValue = (value: string) => () => {
    if (selectedLookupFields) {
      const remainingItems = selectedLookupFields.filter((item) => item.id !== value);
      setSelectedLookupFields(remainingItems);
      setSelectedTags(remainingItems);
    }

    removeValue && removeValue(tagName, value);
  };

  const onOutSideClick = useCallback((event) => {
    if (tagRef && tagRef!.current && !tagRef!.current.contains(event.target)) {
      setShowInput(false);
    }
  }, []);

  const onRemoveField = () => {
    removeField && removeField(tagName);
  };

  const handleOnchange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSelectItem = (items: TagElementOther[]) => {
    if (items.length > 0 && fieldName) {
      // set selected tags to state
      setSelectedTags(items);
      setSelectedLookupFields(items);
      // set value for
      addValue(tagName, items[items.length - 1]?.id);
    }

    // reset input text
    actions.setSearching(false, { text: '' });

    // toggle input
    setShowInput(false);
  };

  const renderSuggestionList = () =>
    suggestionList &&
    suggestionList
      .filter(
        (suggestion) =>
          !values?.find((value) => value === suggestion || value === (suggestion as SuggestionWithTitle).value)
      )
      .map((suggestion, index) => {
        const value = (suggestion as SuggestionWithTitle).value || (suggestion as string);
        return (
          <div key={index} onClick={onAddValue(value)}>
            {(suggestion as SuggestionWithTitle).title || (suggestion as string)}
          </div>
        );
      });

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KEY_NAMES.ENTER && searchValue) {
      onAddValue(searchValue)();
      setSearchValue('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', onOutSideClick);
    return () => document.removeEventListener('click', onOutSideClick);
  }, [onOutSideClick]);

  const renderLookupField = () => {
    // check to render Lookup field component
    if (showInput && endpoint && fieldName) {
      return (
        <div className={'filter-tag-lookup-field'}>
          <LookupField
            endpoint={endpoint}
            fieldName={fieldName}
            selectedTags={selectedTags}
            shouldClearTags={true}
            selectedLength={selectedTags.length}
            onChange={handleSelectItem}
            isShowSuggestion={false}
            shouldHaveStatus={true}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`filter-tag ${className}`} ref={tagRef}>
      <div className={'filter-tag__button'}>
        <div className="dropdown-button" onClick={toggleInput(!showInput)}>
          {tagName} <div className="icon-down" />
        </div>

        {!endpoint &&
          values?.map((value, index) => {
            const foundValueTitle = suggestionList?.find(
              (suggestion) => (suggestion as SuggestionWithTitle).value === value
            );

            return (
              <div key={index} className="value">
                {foundValueTitle ? (foundValueTitle as SuggestionWithTitle).title : value}{' '}
                <button className="tag-button" onClick={onRemoveValue(value)}>
                  <i className="fa fa-times" />
                </button>
              </div>
            );
          })}

        {selectedLookupFields &&
          selectedLookupFields.map((item: TagElementOther, index) => {
            if (fieldName && item) {
              return (
                <div key={index} className="value">
                  {item[fieldName]}
                  <button className="tag-button" onClick={onRemoveValue(item.id)}>
                    <i className="fa fa-times" />
                  </button>
                </div>
              );
            }

            return item;
          })}
      </div>

      {/* {showInput && !endpoint && hasInput && ( */}
      {showInput && !endpoint && (
        <div className="filter-tag__input">
          {hasInput && (
            <input
              placeholder={t('PLACEHOLDER_FILTER')}
              value={searchValue}
              onChange={handleOnchange}
              onKeyDown={handleOnKeyDown}
              maxLength={DEFAULT_MAX_LENGTH_INPUT}
            />
          )}
          <div>{renderSuggestionList()}</div>
        </div>
      )}

      {endpoint && renderLookupField()}

      <div className={'close-icon'} onClick={onRemoveField}>
        <i className="fa fa-fw fa-times " />
      </div>
    </div>
  );
};

export default FilterTag;
