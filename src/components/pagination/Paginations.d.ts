export interface showRowProps {
  listMaxRows: number[];
  currentSize: number;
  setCurrentSize: Function;
  handlePagination?: (...params: any) => void;
}
export interface showResultProps {
  page;
  size: number;
  isShowResults?: boolean;
}
export interface paginationsProps {
  handlePagination?: (currentPage: number, size: number) => void;
  totals: number;
  isShowGoTo?: boolean;
  isUpdatedData?: Boolean;
}
