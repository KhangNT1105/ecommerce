import React, { useState, useEffect } from 'react';
import { TableExpandableBodyProps, TableExpandableRowProps } from './TableExpandableBody.d';

const TableExpandableRow: React.FC<TableExpandableRowProps> = ({
  item,
  pathList,
  expansionKey,
  onToggleRow,
  isCloseAll,
  isOpenAll
}) => {
  const [isExpanding, setIsExpending] = useState(false);

  const handleOnClick = () => {
    onToggleRow && onToggleRow(!isExpanding);
    setIsExpending(!isExpanding);
  };

  useEffect(() => {
    if (isCloseAll) {
      setIsExpending(false);
    }
  }, [isCloseAll]);

  useEffect(() => {
    if (isOpenAll) {
      setIsExpending(true);
    }
  }, [isOpenAll]);

  return (
    <React.Fragment>
      <tr onClick={handleOnClick}>
        <td>
          <i className={!isExpanding ? 'icon-arrow-right' : 'icon-down'} />
        </td>
        {pathList.map((path, index) => (
          <td key={index}>{item[path]}</td>
        ))}
      </tr>
      {isExpanding && (
        <tr>
          <td colSpan={pathList.length + 1}>{item[expansionKey]}</td>
        </tr>
      )}
    </React.Fragment>
  );
};

const TableExpandableBody: React.FC<TableExpandableBodyProps> = ({
  data,
  pathList,
  dataKey,
  expansionKey,
  onToggleRow,
  isCloseAll,
  isOpenAll
}) => {
  return (
    <tbody>
      {data.map((item, dataIndex) => (
        <TableExpandableRow
          key={(dataKey && item[dataKey]) || dataIndex}
          item={item}
          pathList={pathList}
          expansionKey={expansionKey}
          onToggleRow={onToggleRow}
          isOpenAll={isOpenAll}
          isCloseAll={isCloseAll}
        />
      ))}
    </tbody>
  );
};

export default TableExpandableBody;
