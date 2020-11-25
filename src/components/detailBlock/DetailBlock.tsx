import React from 'react';
import './DetailBlock.scss';
import { DetailProps } from './DetailBlock.d';

const DetailBlock: React.FC<DetailProps> = ({ blockTitle, children }) => {
  return (
    <div className="block">
      <div className="block-header">
        <span className="block-title">{blockTitle}</span>
      </div>
      <div className="block-content">
        <div className="d-table content-item">{children}</div>
      </div>
    </div>
  );
};

export default DetailBlock;
