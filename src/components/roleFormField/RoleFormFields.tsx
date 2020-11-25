import React, { ReactElement } from 'react';

import { reGeneratePermissionFields } from '../../utils/permissions';

import { RoleFormFieldsProps } from './RoleFormFields.d';
import { BUTTONS_VISIBILITY } from '../../constants/enum';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import { FormPermissionsType } from 'components/roleFormField/RoleFormFields.d';

export const hasAuthorizedActions = (
  formPermissions: FormPermissionsType[],
  userPermissions: string[],
  listDropdown: string[]
) => {
  const permissionFields = reGeneratePermissionFields(formPermissions, userPermissions);
  const authorizedItems = listDropdown.filter((dropDownItem: string) => {
    return permissionFields[`btn${dropDownItem}`] === BUTTONS_VISIBILITY.SHOW;
  });
  return authorizedItems.length > 0;
};

const RoleFormFields: React.FC<RoleFormFieldsProps> = ({
  key,
  className,
  formPermissions,
  userPermissions,
  children
}) => {
  const [state] = useAuthentication();
  const permissionFields = reGeneratePermissionFields(formPermissions, userPermissions || state.user.permissions);
  return (
    <div key={key} className={className}>
      {children &&
        children instanceof Array &&
        children.map((comp: ReactElement | null) => {
          if (comp && comp.props) {
            const field = comp.props.name;
            if (permissionFields[field] === BUTTONS_VISIBILITY.SHOW) {
              return comp;
            }
          }
          return null;
        })}
    </div>
  );
};

export default RoleFormFields;
