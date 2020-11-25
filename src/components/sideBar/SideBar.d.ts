interface SideBarProps {
  onClose?: Function;
  collapsed?: boolean;
  slim?: boolean;
  animationsDisabled?: boolean;
  isNoPermission?: boolean;
  menus: {
    title: string;
    to?: string;
    icon?: string;
    subMenus?: { title: string; to: string; menuItemName: string }[];
  }[];
}

interface SideBarState {
  entryAnimationFinished: boolean;
}

export interface SideBarTopProps {
  userProfile: { avatar: string; name: string; jobTitle: string };
}

export interface SideBarSectionProps {
  fluid?: boolean;
  cover?: boolean;
  className?: string;
}

export interface SideBarMenuItemLinkProps {
  to?: string;
  title: string;
  classesBase: string;
  onToggle: Function;
  parent?: { title: string; to: string };
  slim?: boolean;
  isParent?: boolean;
}

export interface SideBarBottomProps {
  text: string;
}

export interface ISubMenus {
  title: string;
  to: string;
  menuItemName: string;
  parent?: boolean;
  subMenus?: {
    title: string;
    to?: string;
    icon?: string;
  };
}

export interface SideBarMiddleNavProps {
  menus: {
    title: string;
    to?: string;
    icon?: string;
    subMenus?: ISubMenus[];
  }[];
  slim?: boolean;
}

export interface SideBarMenuItemProps {
  title: string;
  to?: string;
  icon?: string;
  subNode?: boolean;
  parent?: { title: string; to: string };
  slim?: boolean;
  isParent?: boolean;
  name?: string;
}
