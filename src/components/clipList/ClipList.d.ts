import { FnType } from '../../constants/types';

export interface ClipListProps {
  data: object[];
  titleList?: string[];
  pathList?: string[];
  onOpenPopup?: FnType;
  onClosePopup?: FnType;
  onRedirect?: (param: object) => void;
  onSelectDropdown: (param: any) => void;
  onSelectCell: (param: object) => void;
  renderModal?: React.ReactNode;
}

export interface CellType {
  rowValue?: object;
  value: string | React.ReactNode;
  onSelectCell: (value: object) => void;
}

export const titleList = [
  'CLIP_LIST_COLUMN_ID',
  'CLIP_LIST_COLUMN_IMAGE',
  'CLIP_LIST_COLUMN_TITLE',
  'CLIP_LIST_COLUMN_SHOW',
  'CLIP_LIST_COLUMN_SEASON',
  'CLIP_LIST_COLUMN_STATUS',
  'CLIP_LIST_COLUMN_ACTIVATION_DATE',
  'CLIP_LIST_COLUMN_CREATOR',
  'CLIP_LIST_COLUMN_CREATION_DATE',
  'CLIP_LIST_COLUMN_UPDATE_DATE',
  'CLIP_LIST_COLUMN_ACTION'
];

export const pathList = [
  '_id',
  'image',
  'title',
  'show',
  'season',
  'status',
  'activation_date',
  'creator',
  'creation_date',
  'update_date',
  'action'
];
