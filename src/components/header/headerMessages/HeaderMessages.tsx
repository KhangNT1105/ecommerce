import React from 'react';
import {
  UncontrolledDropdown,
  DropdownToggle,
  InputGroup,
  Input,
  InputGroupAddon,
  ListGroupItem,
  ListGroup,
  Media
} from 'reactstrap';

import IconWithBadge from '../../iconWithBadge/IconWithBadge';
import { Dropdown, DropdownSection } from '../../dropdown';
import './HeaderMessages.scss';
import { HeaderMessagesProps } from './HeaderMessages.d';

const messagesColors = {
  success: 'text-success',
  danger: 'text-danger',
  warning: 'text-warning'
};

const HeaderMessages: React.FC<HeaderMessagesProps> = ({ messages }) => {
  return (
    <UncontrolledDropdown nav={true} inNavbar={true}>
      <DropdownToggle nav={true}>
        <IconWithBadge badgeNumber={messages.length} badgeBackground="secondary">
          <i className="fa fa-envelope-o fa-fw" />
        </IconWithBadge>
      </DropdownToggle>
      <Dropdown right={true}>
        <DropdownSection className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">Messages</h6>
          <i className="fa fa-pencil" />
        </DropdownSection>
        <DropdownSection>
          <InputGroup>
            <Input placeholder="Search Messages..." className="headerMessages--search__input" />
            <InputGroupAddon className="headerMessages--search__append" addonType="append">
              <div className="headerMessages--search__icon">
                <i className="fa fa-search" />
              </div>
            </InputGroupAddon>
          </InputGroup>
        </DropdownSection>

        <DropdownSection list={true}>
          <ListGroup>
            {messages.map((message, index) => (
              <ListGroupItem key={`${message.time}-${index}`} action={true}>
                <Media>
                  <Media left={true}>
                    <div className="avatar-image avatar-image--loaded mr-4">
                      <div className="avatar avatar--md avatar-image__image">
                        <div className="avatar__content">
                          <img src={message.avatar} alt="" />
                        </div>
                      </div>
                    </div>
                  </Media>
                  <Media body={true}>
                    <span className="d-flex justify-content-start">
                      <i
                        className={`fa fa-circle small ${
                          messagesColors[message.status as keyof typeof messagesColors]
                        } mr-2 d-flex align-items-center`}
                      />
                      <span className="h6 pb-0 mb-0 d-flex align-items-center">{message.username}</span>

                      <span className="ml-1 small">(23)</span>
                      <span className="ml-auto small">{message.time}</span>
                    </span>
                    <p className="mt-2 mb-1">{message.content}</p>
                  </Media>
                </Media>
              </ListGroupItem>
            ))}
          </ListGroup>
        </DropdownSection>

        <DropdownSection className="text-center">
          View All
          <i className="fa fa-angle-right fa-fw ml-2" />
        </DropdownSection>
      </Dropdown>
    </UncontrolledDropdown>
  );
};

export default HeaderMessages;
