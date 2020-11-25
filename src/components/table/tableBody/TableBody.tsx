import React from 'react';
import { useTranslation } from 'react-i18next';

interface DataType {
  [index: string]: any;
}

interface TableBodyProps {
  readonly?: boolean;
  pathList: string[];
  data: DataType[];
  dataKey?: string | undefined;
  children?: React.ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ readonly, pathList, data, children, dataKey }) => {
  const { t } = useTranslation();

  const renderEmptyBody = () => {
    return (
      children || (
        <tr>
          <td colSpan={pathList!.length} className="text-center">
            {t('NO_DATA')}
          </td>
        </tr>
      )
    );
  };
  return (
    <tbody>
      {data.length
        ? data.map((item, dataIndex) => (
            <tr key={(dataKey && item[dataKey]) || dataIndex}>
              {pathList.map((path, index) => (
                <td key={index}>{item[path]}</td>
              ))}
            </tr>
          ))
        : renderEmptyBody()}
    </tbody>
  );
};

export default React.memo(TableBody);
