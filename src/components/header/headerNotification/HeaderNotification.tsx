import React from 'react';
import { UncontrolledDropdown, DropdownToggle, Badge, ListGroup, ListGroupItem, Media } from 'reactstrap';

import IconWithBadge from '../../iconWithBadge/IconWithBadge';
import { Dropdown, DropdownSection } from '../../dropdown';
import { HeaderNotificationProps } from './HeaderNotification.d';
const notificationIcons = {
  success: (
    <span className="fa-stack fa-lg fa-fw d-flex mr-3">
      <i className="fa fa-circle fa-fw fa-stack-2x text-success" />
      <i className="fa fa-check fa-stack-1x fa-fw text-white" />
    </span>
  ),
  danger: (
    <span className="fa-stack fa-lg fa-fw d-flex mr-3">
      <i className="fa fa-circle fa-fw fa-stack-2x text-danger" />
      <i className="fa fa-close fa-stack-1x fa-fw text-white" />
    </span>
  ),
  warning: (
    <span className="fa-stack fa-lg fa-fw d-flex mr-3">
      <i className="fa fa-circle fa-fw fa-stack-2x text-warning" />
      <i className="fa fa-exclamation fa-stack-1x fa-fw text-white" />
    </span>
  ),
  primary: (
    <span className="fa-stack fa-lg fa-fw d-flex mr-3">
      <i className="fa fa-circle fa-fw fa-stack-2x text-primary" />
      <i className="fa fa-info fa-stack-1x fa-fw text-white" />
    </span>
  )
};

const HeaderNotification: React.FC<HeaderNotificationProps> = ({ notifications }) => {
  return (
    <UncontrolledDropdown nav={true} inNavbar={true}>
      <DropdownToggle nav={true}>
        <IconWithBadge badgeNumber={notifications.length} badgeBackground="primary">
          <i className="fa fa-bell-o fa-fw" />
        </IconWithBadge>
      </DropdownToggle>
      <Dropdown right={true}>
        <DropdownSection className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Notifications</h6>
          <Badge pill={true}>{notifications.length}</Badge>
        </DropdownSection>

        <DropdownSection list={true}>
          <ListGroup>
            {notifications.map((noti, index) => (
              <ListGroupItem action={true} key={`${noti.text}-${index}`}>
                <Media>
                  <Media left={true}>{notificationIcons[noti.status as keyof typeof notificationIcons]}</Media>
                  <Media body={true}>{noti.text}</Media>
                </Media>
              </ListGroupItem>
            ))}
          </ListGroup>
        </DropdownSection>

        <DropdownSection className="text-center">
          See All Notifications
          <i className="fa fa-angle-right fa-fw ml-2" />
        </DropdownSection>
      </Dropdown>
    </UncontrolledDropdown>
  );
};

export default HeaderNotification;
