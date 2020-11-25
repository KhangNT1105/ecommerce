export interface DataType {
  [key: string]: any;
}

export interface TableExpandableBodyProps {
  pathList: string[];
  data: DataType[];
  dataKey?: string | undefined;
  expansionKey: string;
  onToggleRow?: (isOpen: boolean) => void;
  isOpenAll?: boolean;
  isCloseAll?: boolean;
}

export interface TableExpandableRowProps {
  pathList: string[];
  item: DataType;
  expansionKey: string;
  onToggleRow?: (isOpen: boolean) => void;
  isOpenAll?: boolean;
  isCloseAll?: boolean;
}
