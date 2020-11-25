import React, { useState } from 'react';
import TableHeader from 'components/table/tableHeader/TableHeader';
import TableExpandableBody from 'components/tableExpandableBody/TableExpandableBody';
import { TableAdvanceProps, ExpendableHeader } from './TableAdvance.d';

const ExpandableHeader: React.FC<ExpendableHeader> = ({ isExpanding, onClick }) => {
  return (
    <div onClick={onClick}>
      <i className={!isExpanding ? 'icon-arrow-right' : 'icon-down'} />
    </div>
  );
};

const TableAdvance: React.FC<TableAdvanceProps> = ({ titleList, pathList, data, dataKey, expansionKey, className }) => {
  const [openCounter, setOpenCounter] = useState(0);

  const handleToggleAll = () => {
    if (openCounter > 0) {
      return setOpenCounter(0);
    }

    setOpenCounter(data.length);
  };
  const handleToggleRow = (isOpen: boolean) => {
    if (isOpen) {
      return setOpenCounter(openCounter + 1);
    }
    setOpenCounter(openCounter - 1);
  };

  const expandableTitleList = [
    <ExpandableHeader key="expandableHeader0" isExpanding={openCounter > 0} onClick={handleToggleAll} />,
    ...titleList
  ];

  return (
    <table className={`table ${className || 'table-striped'}`}>
      <TableHeader titleList={expandableTitleList} />
      <TableExpandableBody
        pathList={pathList}
        data={data}
        dataKey={dataKey}
        expansionKey={expansionKey}
        onToggleRow={handleToggleRow}
        isOpenAll={openCounter === data.length}
        isCloseAll={openCounter === 0}
      />
    </table>
  );
};

export default TableAdvance;
