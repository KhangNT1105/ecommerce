type IArtWorkType = {
  name: string;
  title: string;
  subTitle: string;
  items: IArtWorkItem;
  getData?: Function;
};

type IArtWorkItem = {
  title: string;
  component: Function;
  status: boolean;
}[];

type IItemType = {
  title: string;
  component: Function;
  status: boolean;
};

export { IArtWorkType, IItemType };
