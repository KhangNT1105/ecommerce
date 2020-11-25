import React from 'react';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { SideBarSection } from '../sideBarSection/SideBarSection';
import { SideBarTopProps } from '../SideBar.d';

const SideBarTop: React.FC<SideBarTopProps> = ({ userProfile }) => {
  return (
    <>
      <SideBarSection className="pt-0">
        <div className="d-block">
          <div className="avatar-image avatar-image--loaded">
            <div className="avatar avatar--lg avatar-image__image">
              <div className="avatar__content">
                <img src={userProfile.avatar} alt="" />
              </div>
            </div>
          </div>
        </div>

        <UncontrolledButtonDropdown>
          <DropdownToggle
            style={{ textDecoration: 'none' }}
            color="link"
            className="pl-0 pb-0 btn-profile sidebar__link"
          >
            {userProfile.name}
            <i className="fa fa-angle-down ml-2" />
          </DropdownToggle>
          <DropdownMenu persist={true}>
            <DropdownItem header={true}>{userProfile.name}</DropdownItem>
            <DropdownItem divider={true} />
            <DropdownItem>My Profile</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Billings</DropdownItem>
            <DropdownItem divider={true} />
            <DropdownItem>
              <i className="fa fa-fw fa-sign-out mr-2" />
              Sign Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <div className="small sidebar__link--muted">{userProfile.jobTitle}</div>
      </SideBarSection>
    </>
  );
};

export default SideBarTop;
