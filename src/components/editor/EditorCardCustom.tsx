import React from 'react';
import { Card as BsCard } from 'reactstrap';
import { EditorCardCustomProps } from './Editor.d';

const EditorCardCustom: React.FC<EditorCardCustomProps> = ({ children, type, color, className, ...otherProps }) => {
  return (
    <BsCard className="custom-card" {...otherProps}>
      {children}
    </BsCard>
  );
};

export default EditorCardCustom;
