export interface BreadCrumbProps {
  items: BreadCrumbType[];
  arrowFirst: boolean;
  align?: string;
}

interface BreadCrumbType {
  label?: string;
  path?: string;
  isVisible?: boolean;
}
