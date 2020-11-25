import React, { useState, useCallback, useRef, useEffect } from 'react';
import Styles from './FilterBlock.module.scss';
import { useTranslation } from 'react-i18next';

interface FilterBlockProps {
  filterList: string[];
  onItemChoose?: (item?: string) => void;
  className?: string;
}

const FilterBlock: React.FC<FilterBlockProps> = ({ filterList, className, onItemChoose }) => {
  const [showFilterList, setShowFilterList] = useState(false);
  const { t } = useTranslation();
  const filterBlockRef = useRef<HTMLDivElement | null>(null);

  const toggleFilterList = (isShow: boolean) => () => {
    setShowFilterList(isShow);
  };

  const onChoose = (item: string) => () => {
    onItemChoose && onItemChoose(item);
    setShowFilterList(false);
  };

  const onOutSideClick = useCallback((event) => {
    if (filterBlockRef && filterBlockRef!.current && !filterBlockRef!.current.contains(event.target)) {
      setShowFilterList(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', onOutSideClick);
    return () => document.removeEventListener('click', onOutSideClick);
  }, [onOutSideClick]);

  return (
    <div className={className} ref={filterBlockRef}>
      <div className={Styles['filter-block__button']} onClick={toggleFilterList(!showFilterList)}>
        <div>{t('ADD_FILTER')}</div>
        <div className="icon-add" />
      </div>

      {showFilterList && filterList.length > 0 && (
        <div className={Styles['filter-block__filter-list']}>
          <div>
            {filterList.map((filterElm) => (
              <div key={filterElm} onClick={onChoose(filterElm)}>
                {filterElm}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBlock;
