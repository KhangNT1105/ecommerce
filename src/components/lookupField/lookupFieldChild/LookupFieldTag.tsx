import React from 'react';

import { TagOtherProps } from 'components/tagsInput/TagsInput.d';
import { TagElementOther, TagsInputPropsOther, WrapperPropsOther } from 'components/lookupField/LookupFieldType.d';

const LookupFieldTag: React.FC<TagsInputPropsOther & TagOtherProps & WrapperPropsOther> = ({
  readonly,
  fieldName,
  tags,
  removeTag,
  renderElement,
  isShowSuggestion = true
}) => {
  return isShowSuggestion ? (
    <div className="suggestions-container">
      {tags &&
        tags.length > 0 &&
        tags.map(
          (tag: TagElementOther, i: number) =>
            tag && (
              <div key={`${tag.id}-${i}`} className="item">
                {renderElement ? renderElement(tag) : tag[fieldName]}
                {!readonly && <i className="fa fa-times" onClick={() => removeTag(i)} />}
              </div>
            )
        )}
    </div>
  ) : (
    <></>
  );
};

export default LookupFieldTag;
