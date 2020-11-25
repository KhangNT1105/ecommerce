export interface ILocation {
  pathname: string;
  state?: {
    breadCrumbs: BreadCrumbType[];
  };
}
export interface BreadCrumbType {
  label?: string;
  path?: string;
  isVisible?: boolean;
}

export interface IBreadCrumbs {
  title: string;
  to?: string;
  subMenus?: {
    title: string;
    to: string;
  }[];
}

export interface SideBarMenuList {
  menus: {
    title: string;
    to: string | undefined;
    icon: string | undefined;
    subMenus: { title: string; to: string; menuItemName: string }[];
  }[];
}
