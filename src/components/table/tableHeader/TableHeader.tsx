import React from 'react';
import { TableHeaderProps, TitleListType, TitleWithClassName } from '../Table.d';

const arePropsEqual = (
  prevProps: Readonly<React.PropsWithChildren<TableHeaderProps>>,
  nextProps: Readonly<React.PropsWithChildren<TableHeaderProps>>
): boolean => {
  const { titleList: prevTitleList } = prevProps;
  const { titleList: nextTitleList } = nextProps;

  let areEqual = true;

  prevTitleList.forEach((title, index) => {
    areEqual = areEqual && title === nextTitleList[index];
  });

  return areEqual;
};

const TableHeader: React.FC<TableHeaderProps> = ({ titleList }) => {
  return (
    <thead>
      <tr>
        {titleList.map((titleElm: TitleListType, index: Number) => {
          if ((titleElm as TitleWithClassName).className !== undefined) {
            const { className, cellRender } = titleElm as TitleWithClassName;
            return (
              <th key={index.toString()} className={className}>
                {cellRender}
              </th>
            );
          }
          return <th key={index.toString()}>{titleElm}</th>;
        })}
      </tr>
    </thead>
  );
};

export default React.memo(TableHeader, arePropsEqual);
