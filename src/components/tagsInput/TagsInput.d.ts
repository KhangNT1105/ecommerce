import { TagElementOther } from 'components/lookupField/LookupFieldType.d';

export interface TagsInputProps {
  tags?: object[] | string[] | any;
  suggestions?: object[] | string[] | any;
  isLoading?: boolean;
  customLoader?: React.ReactNode;
  handleInputChange?: (query: string) => void;
  getSelectedTags?: (tags: (TagElement | TagElementOther)[]) => void;
  shouldClearTags?: boolean;
  clearTags?: (flag: boolean) => void;
  readonly?: boolean;
  shouldAddNew?: boolean;
}

export interface TagElement {
  id: string | number;
  email: string;
}

export interface TagProps {
  tags: TagElement[];
  removeTag: (index: number) => void;
}
export interface TagOtherProps {
  tags: TagElementOther[];
  removeTag: (index: number) => void;
}

export interface InputProps {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  handleFocus: () => void;
  readonly?: boolean;
  value: string;
  isLoading: boolean;
  customLoader: React.ReactNode;
  inputRef: React.Ref;
}

export interface SuggestionProps {
  handleMouseOut: () => void;
  focusedSuggestion: number;
  suggestions: TagElement[];
  onClickSuggestion: (element: TagElement) => void;
  message?: string;
}

export interface SuggestionOtherProps {
  focusedSuggestion: number;
  message?: string;
  suggestions: TagElement[];
  onClickSuggestion: (element: TagElementOther) => void;
  handleMouseOut: () => void;
  renderElement?: (param: TagElementOther) => JSX.Element | null;
}

export interface Params {
  [field: string]: string | string[] | undefined;
}

export interface TagsInputState {
  isSearching: boolean;
  data: any;
  params: Params | undefined;
}

export interface WrapperProps {
  readonly?: boolean;
  endpoint: string;
  getSelectedTags?: (params: object[]) => void;
  shouldClearTags?: boolean;
  clearTags?: (flag: boolean) => void;
}

export interface IExpectedData {
  data: {
    status: number;
    data: {
      users: TagElement[];
    };
  };
}
