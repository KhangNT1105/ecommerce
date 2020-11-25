export interface EditorProps {
  content: string;
  format: string[];
  modules: object;
}

export interface EditorCardCustomProps {
  type?: string;
  color?: string;
  className?: string;
  otherProps?: any;
}
