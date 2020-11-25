import { matchPath } from 'react-router';
import { FieldType, PermissionFieldsType, FormPermissionsType } from '../components/roleFormField/RoleFormFields.d';
import { BUTTONS_VISIBILITY, PERMISSION_PREFIX, PAGE_ACCESSIBILITY } from '../constants/enum';
/**
 * Description: check user permissions have spec permissions
 * @param permissions: array of user permissions
 * @param modes: array of PERMISSION_PREFIX
 * Results: boolean
 */
export const hasModes = (permissions: string[], modes: string[]) => {
  const foundMode = permissions.filter((item) => {
    const includes = modes.filter((mode) => {
      return item === mode;
    });
    return includes.length > 0;
  });
  return foundMode.length === modes.length;
};

/**
 * Description: check user permissions only have 1 permission
 * @param permissions: array of user permissions
 * @param mode: PERMISSION_PREFIX
 * Results: boolean
 */
export const hasOnlyMode = (permissions: string[], mode: string) => {
  const viewMode = permissions.filter((item) => {
    return item === mode;
  });
  return permissions.length === 1 && viewMode.length === 1;
};

/**
 * Description: generate new structure data:
 * Params:
 *    @param formPermissions: array of permissions and element name (id)
 *    @param userPermissions: array of permissions of logged in users
 *
 * Results:
 * {
 *  btnSave: 'show',
 *  btnCancel: 'NA',
 *  ...
 * }
 */
export const reGeneratePermissionFields = (formPermissions: FormPermissionsType[], userPermissions: string[]) => {
  const permissionFields: PermissionFieldsType = formPermissions
    .filter(({ permissions }) => {
      return userPermissions.includes(permissions);
    })
    .map((formPermissions: FormPermissionsType) => {
      const { permissions, ...restPermissions } = formPermissions;
      return restPermissions;
    });

  const fieldsWithPermissions = permissionFields.reduce(
    (accumulator: FieldType, currentValue: FieldType, index: number) => {
      const fields = {
        ...accumulator
      };
      Object.keys(currentValue).map((operation: string) => {
        if (currentValue[operation] === BUTTONS_VISIBILITY.SHOW) {
          fields[operation] = currentValue[operation];
        }
        return true;
      });
      return {
        ...fields
      };
    },
    {}
  );
  return fieldsWithPermissions;
};
/**
 * Description: get accessibility of page with specification page
 * Params:
 *    @param formPermissions: array of permissions of page
 *    @param userPermissions: array of permissions of logged in users
 *    @param strPermission: permission
 *
 * Results:
 * pageAccessibility: boolean
 */
export const checkPageAccessibility = (
  formPermissions: FormPermissionsType[],
  userPermissions: string[],
  strPermission: string
) => {
  const pagePermissions = reGeneratePermissionFields(formPermissions, userPermissions);
  return pagePermissions[strPermission] === PAGE_ACCESSIBILITY.SHOW;
};

/**
 * Description: get accessibility of page with specification entity
 * Params:
 *    @param path: current path of site
 *    @param entityName: entity
 *    @param formPermissionsCreate: array of permissions of create page
 *    @param formPermissionsEdit: array of permissions of edit page
 *    @param formPermissionsList: array of permissions of list page
 *    @param pathCreate: route string of create page
 *    @param pathEdit: route string of edit page
 *    @param userPermissions: array of permissions of logged in users
 *
 * Results:
 * pageAccessibility: boolean
 */
export const getPageAccessibility = (
  path: string,
  entityName: string,
  formPermissionsCreate: FormPermissionsType[],
  formPermissionsEdit: FormPermissionsType[],
  formPermissionsList: FormPermissionsType[],
  pathCreate: string,
  pathEdit: string,
  userPermissions: string[]
) => {
  let pageAccessibility = true;
  if (matchPath(path, { path: pathCreate, exact: true })) {
    pageAccessibility = checkPageAccessibility(
      formPermissionsCreate,
      userPermissions,
      `${entityName}_${PERMISSION_PREFIX.CREATE.toLowerCase()}`
    );
  } else if (matchPath(path, { path: pathEdit, exact: true })) {
    pageAccessibility = checkPageAccessibility(
      formPermissionsEdit,
      userPermissions,
      `${entityName}_${PERMISSION_PREFIX.EDIT.toLowerCase()}`
    );
  } else {
    pageAccessibility = checkPageAccessibility(formPermissionsList, userPermissions, `${entityName}`);
  }
  return pageAccessibility;
};

/**
 * Description: check page is accessible by entity
 * Params:
 *    @param page: page name
 *    @param path: current path of site
 *    @param userPermissions: array of permissions of logged in users
 *
 * Results:
 * pageAccessibility: boolean
 */
export const checkPagePermissisons = (page: string, path: string, userPermissions: string[]) => {
  // let pagePermissions: { [permission: string]: string };
  const pageAccessibility = true;

  return pageAccessibility;
};

/**
 * Description: get form permissions of list page by entity
 * Params:
 *    @param entity: entity name
 *
 * Results:
 * formPermissions: FormPermissionsType[]
 */
export const getFormPermissionsPageList = (entity: string) => {};
