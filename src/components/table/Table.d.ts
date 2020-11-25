export interface TitleWithClassName {
  className: string;
  cellRender: string | React.ReactNode;
}

export type TitleListType = string | React.ReactNode | TitleWithClassName;

export interface TableProps {
  titleList: TitleListType[];
  pathList: string[];
  data: object[];
  dataKey?: string;
  className?: string;
  children?: React.ReactNode;
  readonly?: boolean;
}

export interface TableHeaderProps {
  titleList: TitleListType[];
}
