import React from 'react';

import { SuggestionProps, TagElement } from '../TagsInput.d';

const Suggestions: React.FC<SuggestionProps> = ({
  handleMouseOut,
  focusedSuggestion,
  suggestions,
  onClickSuggestion,
  message
}) => (
  <div className="dropdown" onMouseOut={handleMouseOut}>
    <ul className="suggestions">
      {suggestions.length ? (
        suggestions?.map((suggestion: TagElement, index: number) => (
          <li
            key={`${suggestion.id}-${index}`}
            onClick={() => onClickSuggestion(suggestion)}
            className={index === focusedSuggestion ? 'focused' : ''}
          >
            {suggestion.email}
          </li>
        ))
      ) : (
        <li key={message}>{message}</li>
      )}
    </ul>
  </div>
);

export default Suggestions;
