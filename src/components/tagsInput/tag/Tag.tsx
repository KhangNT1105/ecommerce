import React from 'react';

import { TagProps, TagElement } from '../TagsInput.d';

const Tag: React.FC<TagProps> = ({ tags, removeTag }) => (
  <>
    {tags?.map((tag: TagElement, i: number) => (
      <li key={`${tag.id}-${i}`}>
        {tag.email}
        <button
          type="button"
          className="tag-button"
          onClick={() => {
            removeTag(i);
          }}
        >
          ×
        </button>
      </li>
    ))}
  </>
);

export default Tag;
