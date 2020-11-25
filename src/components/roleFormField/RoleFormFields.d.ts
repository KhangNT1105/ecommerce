import { ReactElement } from 'react';

export type FieldType = {
  [field: string]: string;
};
export type PermissionFieldsType = {
  [permission: string]: fieldType;
};
export type FormPermissionsType = {
  permissions: string;
  btnCancel?: string;
  btnBack?: string;
  btnSave?: string;
  btnActivate?: string;
  btnDeactivate?: string;
  btnCopy?: string;
  btnDelete?: string;
  btnApprove?: string;
  btnReject?: string;
  btnSchedule?: string;
};
export type RoleFormFieldsProps = {
  key?: string;
  className?: string;
  formPermissions: FormPermissionsType[];
  userPermissions?: string[];
  children: (ReactElement | null)[];
};
