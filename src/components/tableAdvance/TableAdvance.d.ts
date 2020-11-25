type TableListType = string | React.ReactNode;

export interface TableAdvanceProps {
  titleList: TableListType[];
  pathList: string[];
  data: object[];
  dataKey?: string;
  expansionKey: string;
  className?: string;
}

export interface ExpendableHeader {
  isExpanding: boolean;
  onClick?: () => void;
}
