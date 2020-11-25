// Interface for Dropzone Area
interface IDropZone {
  apiURL: string;
  files: File[];
  autoUpload: boolean;
  config: IDropZoneConfig;
  uploadHandle?: (res: DropResType) => void;
  getData?: any;
  pushData?: any;
}
// Interface for Dropzone Area with special config
interface IDropZoneConfig {
  accept: string;
  disabled?: boolean;
  noClick?: boolean;
  noKeyboard?: boolean;
  minSize: number;
  maxSize: number;
}
// Interface for Dropzone Preview
interface IDropZoneFile {
  files: any;
  onFileRemove?: any;
  onFileUpload?: Function | undefined;
  status: boolean;
  datas?: any | undefined;
  drag?: boolean;
}

type DropResType = {
  error: boolean;
  msg: string;
};

export { IDropZone, IDropZoneFile, DropResType };
