import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { ITabsType } from './TabsTypes';
import './Tabs.scss';

const Tabs: React.FC<ITabsType> = (props) => {
  const { t } = useTranslation();
  const { active, items, styleHeader, className } = props;
  const [activeTab, setActiveTab] = useState(active);

  const onClick = (val: any) => {
    setActiveTab(val);
    if (props.setActiveItem) {
      props.setActiveItem && props.setActiveItem(val);
    }
  };

  const renderTabHeader = () => {
    return items.map((value) => {
      const { name, textKey, hasError } = value;

      let classNameNav = '';
      if (activeTab === name) {
        classNameNav = 'active';
      }

      if (hasError) {
        classNameNav += ' error';
      }

      if (items.length > 0) {
        return (
          <NavItem key={`title-${name}`} style={styleHeader}>
            <NavLink className={classNameNav} onClick={() => onClick(name)}>
              {typeof textKey === 'string' ? t(textKey) : textKey}
            </NavLink>
          </NavItem>
        );
      }
      return null;
    });
  };

  const renderContent = () => {
    return (
      <TabContent activeTab={activeTab}>
        {items.map((item) => {
          return (
            <TabPane key={`panel-${item.name}`} tabId={item.name}>
              {item.component}
            </TabPane>
          );
        })}
      </TabContent>
    );
  };

  return (
    <>
      <Nav className={`${className}`}>{renderTabHeader()}</Nav>
      {renderContent()}
    </>
  );
};

Tabs.defaultProps = {
  className: '',
  active: '',
  items: []
};

export default Tabs;
