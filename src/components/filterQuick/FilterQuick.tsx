import React from 'react';
import Styles from './FilterQuick.module.scss';

interface FilterItem {
  field: string;
  value: string;
  chosen?: boolean;
  title?: string;
}

interface FilterQuickProps {
  filterList: FilterItem[];
  onChooseFilter?: (field: string, value: string) => void;
  className?: string;
}

const FilterQuick: React.FC<FilterQuickProps> = ({ filterList, onChooseFilter, className }) => {
  const handleOnClick = (field: string, value: string) => () => {
    onChooseFilter && onChooseFilter(field, value);
  };

  return (
    <div className={`${Styles['filter-quick']} ${className}`}>
      <div className="filter-quick-title">Quick Filters</div>
      {filterList.map(({ field, value, chosen, title }, index) => (
        <div className={chosen ? 'filter-quick-chosen' : ''} key={index} onClick={handleOnClick(field, value)}>
          {title || value}
        </div>
      ))}
    </div>
  );
};

export default FilterQuick;
