export interface ILookupFieldProps {
  endpoint?: string;
  errorText?: string;
  readonly?: boolean;
  shouldClearTags?: boolean;
  sort?: string;
  suggestions?: TagElementOther[];
  selectedTags?: any; // TagElementOther[];
  touch?: boolean;
  addNewItem?: Function;
  mappingFn?: Function;
  onChange?: Function;
  shouldAddNew?: boolean;
  id?: string;
  selectedLength?: number;
  renderElement?: (param: TagElementOther) => JSX.Element | null;
  isShowSuggestion?: boolean;
  shouldHaveStatus?: boolean;
}

export type TApiResponseObject = {
  language: string;
  text: string;
  type: string;
};

export interface TagElementOther {
  [fieldName: string]: string;
}

export interface WrapperPropsOther {
  endpoint?: string;
  errorText?: string;
  readonly?: boolean;
  selectedTags?: TagElementOther[];
  shouldClearTags?: boolean;
  single: boolean;
  sort?: string;
  suggestions?: TagElementOther[];
  touch?: boolean;
  clearTags?: (flag: boolean) => void;
  setSelectedTags?: (params: object[]) => void;
  shouldAddNew?: boolean;
  renderElement?: (param: TagElementOther) => JSX.Element | null;
  isShowSuggestion?: boolean;
}

export interface TagsInputPropsOther {
  readonly?: boolean;
  fieldName: string;
  single?: boolean;
}
