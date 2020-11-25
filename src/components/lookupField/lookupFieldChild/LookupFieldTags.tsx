import React, { useState, useEffect, useRef, FormEvent, useCallback } from 'react';
import { Col, FormFeedback } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import InputTag from 'components/tagsInput/inputTag/InputTag';
import LookupFieldSuggestions from 'components/lookupField/lookupFieldChild/LookupFieldSuggestions';
import LookupFieldTag from 'components/lookupField/lookupFieldChild/LookupFieldTag';
import { TagElementOther, TagsInputPropsOther, WrapperPropsOther } from 'components/lookupField/LookupFieldType.d';
import { TagsInputProps } from 'components/tagsInput/TagsInput.d';

import { KEYS } from 'constants/keyCode.type';

import 'components/tagsInput/TagsInput.scss';
import 'components/lookupField/lookupFieldChild/LookupFieldTags.scss';

const LookupFieldTags: React.FC<TagsInputProps & TagsInputPropsOther & WrapperPropsOther> = ({
  customLoader,
  errorText,
  fieldName,
  isLoading = false,
  readonly,
  selectedTags = [],
  shouldClearTags,
  single,
  suggestions,
  touch,
  clearTags,
  setSelectedTags = () => {},
  handleInputChange = (value) => {},
  shouldAddNew,
  renderElement,
  isShowSuggestion
}) => {
  const [tagsState, setTagsState] = useState<TagElementOther[]>(selectedTags);
  const [focusedSuggestion, setFocusedSuggestion] = useState<number>(0);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const lookupFieldRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (shouldClearTags) {
      setTagsState([]);
    }
  }, [shouldClearTags]);

  useEffect(() => {
    setTagsState(selectedTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  const onOutSideClick = useCallback((event) => {
    if (lookupFieldRef && lookupFieldRef!.current && !lookupFieldRef!.current.contains(event.target)) {
      setInputValue('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', onOutSideClick);
    return () => {
      document.removeEventListener('click', onOutSideClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const filterSuggestionFunction = () => {
      return suggestions
        ? suggestions.filter(
            (suggestion: TagElementOther) => !tagsState.find((tag) => suggestion && tag && suggestion.id === tag.id)
          )
        : suggestions;
    };

    setFilteredSuggestion(filterSuggestionFunction());
  }, [suggestions, tagsState]);

  const removeTag = (index: number) => {
    const newTags: TagElementOther[] = [...tagsState];
    newTags.splice(index, 1);
    setTagsState(newTags);
    setSelectedTags(newTags);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const key = e.keyCode;

    let newTags: TagElementOther[] = [...tagsState];
    setInputValue(val);
    setErrorMessage('');

    if (key === KEYS.ENTER && val) {
      // for quotes/tips/awards
      if (shouldAddNew) {
        const tag = { id: `${new Date().getTime()}`, text: val };

        if (!checkDuplicateTag(tag)) {
          newTags.push(tag);
        }
      }

      const newFocus = focusedSuggestion < 0 ? 0 : focusedSuggestion;
      if (filteredSuggestion?.length && checkDuplicateTag(filteredSuggestion[newFocus])) {
        return;
      }

      if (filteredSuggestion?.length) {
        newTags = [...tagsState, filteredSuggestion[newFocus]];
      }
      // if single, not allow to add tags
      if (single && tagsState.length === 1) {
        newTags = [...tagsState];
      }

      setTagsState(newTags);
      setSelectedTags(newTags);
      // clearTags && clearTags(false);
      setInputValue('');
      setFocusedSuggestion(0);
    }
    if (key === KEYS.DOWN_ARROW) {
      const newFocus = focusedSuggestion + 1;
      setFocusedSuggestion(newFocus > filteredSuggestion?.length - 1 ? 0 : newFocus);
    }
    if (key === KEYS.UP_ARROW) {
      const newFocus = focusedSuggestion - 1;
      setFocusedSuggestion(focusedSuggestion < 1 ? filteredSuggestion?.length - 1 : newFocus);
    }
    // when press backspace key into blank lookup field, it removes all tags
    // if (key === KEYS.BACKSPACE && !val && isFocus) {
    //   removeTag(tagsState.length - 1);
    // }
    if (key === KEYS.ESCAPE) {
      setInputValue('');
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    handleInputChange(value);
    setInputValue(value);
  };

  const onClickSuggestion = (suggestion: TagElementOther) => {
    if (checkDuplicateTag(suggestion)) {
      setErrorMessage(t('EXISTING_VALUE_ERROR', { value: suggestion ? [fieldName] : '' }));
      return;
    }
    let newTags: TagElementOther[] = [...tagsState, suggestion];
    // if single, not allow to add tags
    if (single && tagsState.length === 1) {
      newTags = [...tagsState];
    }
    setTagsState(newTags);
    setSelectedTags(newTags);
    // clearTags && clearTags(false);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleMouseOut = () => {
    setFocusedSuggestion(-1);
  };

  const checkDuplicateTag = (newTag: TagElementOther) => {
    return tagsState.find((tag) => tag[fieldName] === newTag[fieldName]);
  };

  const inputEventHandlers = {
    handleChange,
    handleKeyDown: onKeyDown,
    handleBlur,
    handleFocus
  };

  return (
    <div className="input-tag-container" ref={lookupFieldRef}>
      <div className="input-tag">
        <ul className="input-tag-list">
          <InputTag
            {...inputEventHandlers}
            value={inputValue}
            isLoading={isLoading}
            customLoader={customLoader}
            inputRef={inputRef}
            readonly={readonly}
          />
        </ul>
      </div>
      <Col xs={12} className="px-0 text-error">
        {!touch && errorText && <FormFeedback className="text-danger">{errorText}</FormFeedback>}
      </Col>
      <LookupFieldTag
        fieldName={fieldName}
        readonly={readonly}
        single={single}
        tags={tagsState}
        removeTag={removeTag}
        renderElement={renderElement}
        isShowSuggestion={isShowSuggestion}
      />
      <Col xs={12} className="px-0 text-error">
        {isFocus && errorMessage && <FormFeedback className="text-danger">{errorMessage}</FormFeedback>}
      </Col>
      {inputValue.length >= 2 && !errorMessage && (
        <LookupFieldSuggestions
          fieldName={fieldName}
          focusedSuggestion={focusedSuggestion}
          suggestions={filteredSuggestion}
          message={t('NO_RESULT')}
          handleMouseOut={handleMouseOut}
          onClickSuggestion={onClickSuggestion}
          renderElement={renderElement}
        />
      )}
    </div>
  );
};

export default LookupFieldTags;
