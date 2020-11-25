export interface HeaderProps {
  onClickBurgerBtn?: Function;
  breadCrumbs: { label?: string; path?: string }[];
  notifications: { text: string; status: string }[];
  username: string;
}
