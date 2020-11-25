import React, { useState, useEffect } from 'react';
import { SORT_STATUS } from '../../constants';
import './TableHeaderTitle.scss';
import { SORT, SORT_BY_ASC, SORT_BY_DESC } from '../../constants/index';
interface TableHeaderTitleProps {
  title: string;
  sortField?: string;
  sortable?: boolean;
  params?: any;
  onClick?: (sortField: string, sortStatus: number) => void;
}

const TableHeaderTitle: React.FC<TableHeaderTitleProps> = ({ title, sortField, onClick, sortable, params }) => {
  const [sortStatus, setSortStatus] = useState(0);

  useEffect(() => {
    const key: string = SORT;
    if (params && params[key] && params[key].includes(`${sortField},${SORT_BY_ASC}`)) {
      return setSortStatus(1);
    }
    if (params && params[key] && params[key].includes(`${sortField},${SORT_BY_DESC}`)) {
      return setSortStatus(2);
    }
    setSortStatus(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const getNewStatus = () => {
    const PERIOD = 3;
    const STEP = 1;
    const results = (sortStatus + STEP) % PERIOD === 0 ? 1 : (sortStatus + STEP) % PERIOD;
    return results;
  };

  const handleClick = () => {
    sortable && onClick && onClick(sortField!, SORT_STATUS[getNewStatus()]);
    setSortStatus(getNewStatus());
  };

  const renderSortIcon = (sortStatus: number) => {
    switch (sortStatus) {
      case 0:
        return <i className="fa fa-sort" />;
      case 1:
        return <i className="fa fa-sort-up" />;
      case 2:
        return <i className="fa fa-sort-down" />;
      default:
        return <></>;
    }
  };

  return (
    <div onClick={handleClick} className={sortable ? 'sortable' : ''}>
      {title} {sortable && renderSortIcon(sortStatus)}
    </div>
  );
};

export default TableHeaderTitle;
