import React, { useState, useEffect, useRef } from 'react';
import { Col, FormFeedback } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import Tag from './tag/Tag';
import InputTag from './inputTag/InputTag';
import Suggestions from './suggestions/Suggestions';

import './TagsInput.scss';
import { TagsInputProps, TagElement } from './TagsInput.d';
import { KEYS } from '../../constants/keyCode.type';
import { validateEmail } from 'utils/validation';

const TagsInput: React.FC<TagsInputProps> = ({
  readonly,
  suggestions,
  isLoading = false,
  customLoader,
  handleInputChange,
  getSelectedTags,
  shouldClearTags,
  clearTags
}) => {
  const [tagsState, setTagsState] = useState<TagElement[]>([]);
  const [focusedSuggestion, setFocusedSuggestion] = useState(0);
  const [filteredSuggestion, setFilteredSuggestion] = useState([]);
  const [isFocus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { t } = useTranslation();

  useEffect(() => {
    if (shouldClearTags) {
      setTagsState([]);
    }
  }, [shouldClearTags]);

  useEffect(() => {
    const filterSuggestionFunction = () => {
      return suggestions
        ? suggestions.filter((suggestion: TagElement | any) => !tagsState.find((tag) => suggestion.id === tag.id))
        : suggestions;
    };

    setFilteredSuggestion(filterSuggestionFunction());
  }, [suggestions, tagsState]);

  const removeTag = (index: number) => {
    const newTags: TagElement[] = [...tagsState];
    newTags.splice(index, 1);
    setTagsState(newTags);
    getSelectedTags && getSelectedTags(newTags);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    const key = e.keyCode;

    let newTags: TagElement[];
    setInputValue(val);
    setErrorMessage('');

    if (key === KEYS.ENTER && val) {
      if (!filteredSuggestion?.length) {
        if (validateEmail(val)) {
          const mappingTag = {
            id: val,
            email: val,
            addedDate: ''
          };
          if (checkDuplicateTag(mappingTag)) {
            setErrorMessage(t('EXISTING_VALUE_ERROR', { value: mappingTag.email }));
            return;
          }

          newTags = [...tagsState, mappingTag];
        } else {
          setErrorMessage(t('FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID'));
          return;
        }
      } else {
        const newFocus = focusedSuggestion < 0 ? 0 : focusedSuggestion;
        if (checkDuplicateTag(filteredSuggestion[newFocus])) return;
        newTags = [...tagsState, filteredSuggestion[newFocus]];
      }
      setTagsState(newTags);
      getSelectedTags && getSelectedTags(newTags);
      clearTags && clearTags(false);
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
    if (key === KEYS.BACKSPACE && !val && isFocus) {
      removeTag(tagsState.length - 1);
    }
    if (key === KEYS.ESCAPE) {
      setInputValue('');
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    handleInputChange && handleInputChange(value);
    setInputValue(value);
  };

  const onClickSuggestion = (suggestion: TagElement) => {
    if (checkDuplicateTag(suggestion)) {
      setErrorMessage(t('EXISTING_VALUE_ERROR', { value: suggestion.email }));
      return;
    }
    const newTags: TagElement[] = [...tagsState, suggestion];
    setTagsState(newTags);
    getSelectedTags && getSelectedTags(newTags);
    clearTags && clearTags(false);
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

  const checkDuplicateTag = (newTag: TagElement) => {
    return tagsState.find((tag) => tag.email === newTag.email);
  };

  const inputEventHandlers = {
    handleChange,
    handleKeyDown,
    handleBlur,
    handleFocus
  };

  return (
    <div className="input-tag-container">
      <div className="input-tag">
        <ul className="input-tag-list">
          <Tag tags={tagsState} removeTag={removeTag} />
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
        {isFocus && errorMessage && <FormFeedback className="text-danger">{errorMessage}</FormFeedback>}
      </Col>
      {inputValue.length >= 2 && !errorMessage && (
        <Suggestions
          handleMouseOut={handleMouseOut}
          focusedSuggestion={focusedSuggestion}
          suggestions={filteredSuggestion}
          onClickSuggestion={onClickSuggestion}
          message={t('NO_RESULT')}
        />
      )}
    </div>
  );
};

export default TagsInput;
