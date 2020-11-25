export interface IColorPickerProps {
  value?: string;
  name: string;
  readonly?: boolean;
  onSelect: (name: string, color?: string) => void;
}
