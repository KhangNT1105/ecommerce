import React from 'react';

import { testSnapshots } from 'utils/test';
import { hasModes } from 'utils/permissions';

import Button from '../button/Button';
import RoleFormFields, { hasAuthorizedActions } from './RoleFormFields';
import {
  formPermissions,
  userPermissions_1,
  userPermissions_2,
  userPermissions_3,
  userPermissions_4,
  userPermissions_5,
  userPermissions_6
} from '../../data/RoleFormFields.fixture';
import { PERMISSION_PREFIX } from 'constants/enum';
import { EDIT, DELETE } from '../../constants';

describe('RoleFormFields component', () => {
  const renderButtons = (userPermissions: string[], entity: string) => {
    const hasBackButton = hasModes(userPermissions, [`${PERMISSION_PREFIX.CREATE}_${entity}`]);
    return [
      !hasBackButton ? (
        <Button name="btnBack" key="btnBack">
          Back
        </Button>
      ) : null,
      <Button name="btnCancel" key="btnCancel">
        Cancel
      </Button>,
      <Button name="btnSave" key="btnSave">
        Save
      </Button>,
      <Button name="btnCopy" key="btnCopy" className="mr-3">
        Copy
      </Button>,
      <Button name="btnDelete" key="btnDelete">
        Delete
      </Button>,
      <Button name="btnActivate" key="btnActivate">
        Activate
      </Button>,
      <Button name="btnDeactivate" key="btnDeactivate">
        Deactivate
      </Button>
    ];
  };
  const props_1 = {
    formPermissions: formPermissions.userGroupCreate,
    userPermissions: userPermissions_1,
    children: renderButtons(userPermissions_1, 'USERGROUP')
  };
  const props_2 = {
    formPermissions: formPermissions.userGroupCreate,
    userPermissions: userPermissions_2,
    children: renderButtons(userPermissions_2, 'USERGROUP')
  };
  const props_3 = {
    formPermissions: formPermissions.userGroupEdit,
    userPermissions: userPermissions_3,
    children: renderButtons(userPermissions_3, 'USERGROUP')
  };
  const props_4 = {
    formPermissions: formPermissions.userGroupEdit,
    userPermissions: userPermissions_4,
    children: renderButtons(userPermissions_4, 'USERGROUP')
  };
  const props_5 = {
    formPermissions: formPermissions.castingEdit,
    userPermissions: userPermissions_5,
    children: renderButtons(userPermissions_5, 'CAST')
  };
  const props_6 = {
    formPermissions: formPermissions.castingEdit,
    userPermissions: userPermissions_6,
    children: renderButtons(userPermissions_6, 'CAST')
  };

  testSnapshots(RoleFormFields, [
    {
      props: props_1,
      description: 'test snapshot - form userGroupCreate, user permissions VIEW_USERGROUP'
    },
    {
      props: props_2,
      description: 'test snapshot - form userGroupCreate, user permissions CREATE_USERGROUP'
    },
    {
      props: props_3,
      description: 'test snapshot - form userGroupEdit, user permissions EDIT_USERGROUP'
    },
    {
      props: props_4,
      description: 'test snapshot - form userGroupEdit, user permissions DELETE_USERGROUP'
    },
    {
      props: props_5,
      description: 'test snapshot - form castingEdit, user permissions ACTIVATE_CAST'
    },
    {
      props: props_6,
      description: 'test snapshot - form castingEdit, user permissions DEACTIVATE_CAST'
    }
  ]);
});

describe('hasAuthorizedActions function', () => {
  test('test amount of authorized items == 0', () => {
    const hasAuthorizedItems = hasAuthorizedActions(formPermissions.userGroupList, userPermissions_1, [EDIT, DELETE]);
    expect(hasAuthorizedItems).toEqual(false);
  });
  test('test amount of authorized items > 0', () => {
    const hasAuthorizedItems = hasAuthorizedActions(
      formPermissions.userGroupList,
      ['EDIT_USERGROUP', 'DELETE_USERGROUP'],
      [EDIT, DELETE]
    );
    expect(hasAuthorizedItems).toEqual(true);
  });
});
