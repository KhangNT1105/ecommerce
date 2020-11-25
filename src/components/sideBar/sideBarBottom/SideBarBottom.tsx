import React from 'react';
import { SideBarSection } from '../sideBarSection/SideBarSection';
import { SideBarBottomProps } from '../SideBar.d';

const SideBarBottom: React.FC<SideBarBottomProps> = ({ text }) => {
  return (
    <SideBarSection>
      <p className="text-muted small">{text}</p>
    </SideBarSection>
  );
};

export default SideBarBottom;
