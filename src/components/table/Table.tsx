import React from 'react';
import TableHeader from './tableHeader/TableHeader';
import TableBody from './tableBody/TableBody';
import { TableProps } from './Table.d';

import './Table.scss';

const Table: React.FC<TableProps> = ({ readonly, titleList, pathList, data, className, dataKey, children }) => {
  return (
    <div className="table-responsive">
      <table className={`table table-striped ${className}`}>
        <TableHeader titleList={titleList} />
        <TableBody readonly={readonly} pathList={pathList} data={data} dataKey={dataKey} children={children!} />
      </table>
    </div>
  );
};

export default Table;
