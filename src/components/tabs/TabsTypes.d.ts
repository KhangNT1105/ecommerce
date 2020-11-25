interface ITabsType {
  active: string;
  items: ITabsItemType[];
  styleHeader?: object;
  setActiveItem?: Function;
  className?: string;
}

interface ITabsItemType {
  name: string;
  textKey: React.ReactNode | string;
  component: React.ReactNode;
  hasError?: boolean;
}

export { ITabsType, ITabsItemType };
