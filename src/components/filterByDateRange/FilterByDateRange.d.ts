import { DateRangeProps } from '../../utils/dateTime';

export type Props = {
  className?: string;
  dateFormat?: string;
  handlerDateRangeChange: (o: DateRangeProps) => void;
  classNameDateFrom?: string;
  classNameDateTo?: string;
  classNameSelectBox?: string;
};

export type StateType = {
  dateFrom: Date | null;
  dateTo: Date | null;
  maxDateFrom: Date;
  maxDateTo: Date;
  minDateTo: Date | null;
  isDateRangeOpen: boolean;
  showCustomRange: boolean;
  selectedDateRangeText: string;
};

export type DateRangeData = {
  rangeText: string;
  rangeValue: string;
};
