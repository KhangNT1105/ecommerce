import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import SideBarMiddleNav from './sideBarMiddleNav/SideBarMiddleNav';
import { SideBarSection } from './sideBarSection/SideBarSection';
import { useTranslation } from 'react-i18next';
import { SideBarProps, SideBarState } from './SideBar.d';

import './SideBar.scss';

const SideBar: React.FC<SideBarProps> = ({ onClose, collapsed, slim, animationsDisabled, menus, isNoPermission }) => {
  const { t } = useTranslation();

  const [state] = useState<SideBarState>({
    entryAnimationFinished: true
  });

  const { entryAnimationFinished } = state;

  const classes = classNames('sidebar', 'sidebar--animations-enabled', {
    'sidebar--slim custom-sidebar-slim': slim,
    'sidebar--collapsed': collapsed,
    'sidebar--animations-disabled': animationsDisabled,
    'sidebar--animate-entry-complete': entryAnimationFinished
  });

  const handleCloseSideBar = () => {
    onClose && onClose();
  };

  return (
    <div className={classes}>
      <div className="sidebar__close" onClick={handleCloseSideBar}>
        <i className="fa fa-times-circle fa-fw" />
      </div>
      <SideBarSection>
        <div className="sidebar__brand">
          <Link to="/">
            <img src={''} className={`logo-slim ${slim ? '' : 'd-none'}`} alt={t('ACEXIS_LOGO_ALT')} />
            <img src={''} className={`${slim ? 'd-none' : ''}`} alt={t('ACEXIS_LOGO_ALT')} />
            {!slim && (
              <small className="d-block small">
                <strong>{t('CMS_TITLE')}</strong>
              </small>
            )}
          </Link>
        </div>
      </SideBarSection>
      {!isNoPermission && (
        <div className="sidebar__mobile-fluid">
          <SideBarSection fluid={true} cover={true}>
            <SideBarMiddleNav menus={menus} slim={slim} />
          </SideBarSection>
        </div>
      )}
    </div>
  );
};

export default SideBar;
