import React from 'react';
import { CSVLink } from 'react-csv';
import reactStringReplace from 'react-string-replace';

interface IErrorLink {
  errorMessage: string;
  replaceWord: string;
  fileName: string;
  headers: any[];
  data: any[];
}

export default (errorMessage: string, replaceWord: string, fileName: string, data: any[]) => {
  return reactStringReplace(errorMessage, replaceWord, (match, index) => {
    return (
      <span key={`${match}-${index}`}>
        <CSVLink filename={`${fileName}.csv`} data={data}>
          {` ${fileName}.csv `}
        </CSVLink>
      </span>
    );
  });
};
