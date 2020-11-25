import React, { useRef, useEffect, useState } from 'react';

import { SuggestionOtherProps } from 'components/tagsInput/TagsInput.d';
import { TagsInputPropsOther } from 'components/lookupField/LookupFieldType.d';

const LookupFieldSuggestions: React.FC<TagsInputPropsOther & SuggestionOtherProps> = ({
  fieldName,
  focusedSuggestion,
  message,
  suggestions,
  handleMouseOut,
  onClickSuggestion,
  renderElement
}) => {
  const dropdownRefs = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLLIElement>(null);
  const [isDropup, setDropup] = useState(false);
  const [crollStyle, setScrollStyle] = useState({});

  useEffect(() => {
    let maxItemsHeight = 0;
    if (itemRefs.current) {
      const item = itemRefs.current;
      const itemHeight = item.clientHeight;
      maxItemsHeight = itemHeight * 10; // maximum 10 items
      const style = {
        maxHeight: maxItemsHeight,
        overflowY: 'auto',
        marginBottom: 0
      };
      setScrollStyle(style);
    }

    if (dropdownRefs.current) {
      const dropdown = dropdownRefs.current;
      const distanceToBottom = window.innerHeight - dropdown.getBoundingClientRect().top;
      const validHeight = Math.min(dropdown.clientHeight, maxItemsHeight);
      setDropup(distanceToBottom <= validHeight ? true : false);
    }
  }, [suggestions.length]);

  return (
    <div className={`dropdown ${isDropup ? 'dropup' : ''}`} onMouseOut={handleMouseOut} ref={dropdownRefs}>
      <ul className="suggestions" style={crollStyle}>
        {suggestions?.length ? (
          suggestions?.map((suggestion: any, index: number) => (
            <li
              key={`${suggestion.id}-${index}`}
              onClick={() => onClickSuggestion(suggestion)}
              className={index === focusedSuggestion ? 'focused' : ''}
              ref={itemRefs}
            >
              {renderElement ? renderElement(suggestion) : suggestion[fieldName]}
            </li>
          ))
        ) : (
          <li key={message}>{message}</li>
        )}
      </ul>
    </div>
  );
};

export default LookupFieldSuggestions;
