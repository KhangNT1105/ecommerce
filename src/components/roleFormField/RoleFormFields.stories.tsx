import React from 'react';
import { storiesOf } from '@storybook/react';
import { Container, Row, Col, Label } from 'reactstrap';

import {
  formPermissions,
  userPermissions_1,
  userPermissions_2,
  userPermissions_3,
  userPermissions_4
} from '../../data/RoleFormFields.fixture';
import RoleFormFields from './RoleFormFields';
import Button from '../button/Button';

// Stories
storiesOf('Role Form Field', module)
  .add('User permission: VIEW_GROUP', () => (
    <Container className="mt-4">
      <Row>
        <Col md="12" lg="12">
          <RoleFormFields
            className="float-left"
            formPermissions={formPermissions.userGroupCreate}
            userPermissions={userPermissions_1}
          >
            <Button name="btnBack">Back</Button>
            <Button name="btnCancel">Cancel</Button>
            <Button name="btnSave">Save</Button>
            <Button name="btnCopy" className="mr-3">
              Copy
            </Button>
            <Button name="btnDelete">Delete</Button>
          </RoleFormFields>
        </Col>
        <Col md="12" lg="12" className="mt-4">
          <Label className="text-muted">User permissions: VIEW_GROUP</Label>
        </Col>
      </Row>
    </Container>
  ))
  .add('User permission: VIEW_GROUP, CREATE_USERGROUP', () => (
    <Container className="mt-4">
      <Row>
        <Col md="12" lg="12">
          <RoleFormFields
            className="float-left"
            formPermissions={formPermissions.userGroupCreate}
            userPermissions={userPermissions_2}
          >
            <Button name="btnBack" className="mr-3">
              Back
            </Button>
            <Button name="btnCancel" className="mr-3">
              Cancel
            </Button>
            <Button name="btnSave" className="mr-3">
              Save
            </Button>
            <Button name="btnCopy" className="mr-3">
              Copy
            </Button>
            <Button name="btnDelete" className="mr-3">
              Delete
            </Button>
          </RoleFormFields>
        </Col>
        <Col md="12" lg="12" className="mt-4">
          <Label className="text-muted">
            User permissions:
            <Label className="text-warning ml-3">VIEW_GROUP, CREATE_USERGROUP</Label>
          </Label>
        </Col>
      </Row>
    </Container>
  ))
  .add('User permission: VIEW_GROUP, EDIT_USERGROUP', () => (
    <Container className="mt-4">
      <Row>
        <Col md="12" lg="12">
          <RoleFormFields
            className="float-left"
            formPermissions={formPermissions.userGroupCreate}
            userPermissions={userPermissions_3}
          >
            <Button name="btnBack" className="mr-3">
              Back
            </Button>
            <Button name="btnCancel" className="mr-3">
              Cancel
            </Button>
            <Button name="btnSave" className="mr-3">
              Save
            </Button>
            <Button name="btnCopy" className="mr-3">
              Copy
            </Button>
            <Button name="btnDelete" className="mr-3">
              Delete
            </Button>
          </RoleFormFields>
        </Col>
        <Col md="12" lg="12" className="mt-4">
          <Label className="text-muted">
            User permissions:
            <Label className="text-warning ml-3">VIEW_GROUP, EDIT_USERGROUP</Label>
          </Label>
        </Col>
      </Row>
    </Container>
  ))
  .add('User permission: VIEW_GROUP, DELETE_USERGROUP', () => (
    <Container className="mt-4">
      <Row>
        <Col md="12" lg="12">
          <RoleFormFields
            className="float-left"
            formPermissions={formPermissions.userGroupCreate}
            userPermissions={userPermissions_4}
          >
            <Button name="btnBack" className="mr-3">
              Back
            </Button>
            <Button name="btnCancel" className="mr-3">
              Cancel
            </Button>
            <Button name="btnSave" className="mr-3">
              Save
            </Button>
            <Button name="btnCopy" className="mr-3">
              Copy
            </Button>
            <Button name="btnDelete" className="mr-3">
              Delete
            </Button>
          </RoleFormFields>
        </Col>
        <Col md="12" lg="12" className="mt-4">
          <Label className="text-muted">
            User permissions:
            <Label className="text-warning ml-3">VIEW_GROUP, DELETE_USERGROUP</Label>
          </Label>
        </Col>
      </Row>
    </Container>
  ));
