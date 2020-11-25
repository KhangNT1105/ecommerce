import React, { useState, ReactElement, useEffect } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import './SideBarMenuItem.scss';

import { SideBarMenuItemLinkProps, SideBarMenuItemProps } from '../SideBar.d';

const SideBarMenuItemLink: React.FC<SideBarMenuItemLinkProps> = ({
  to,
  title,
  classesBase,
  onToggle,
  parent,
  slim,
  children,
  isParent
}) => {
  return to && !isParent ? (
    <Link
      className={`${classesBase}__entry__link`}
      to={{
        pathname: to,
        state: {
          breadCrumbs: [
            { label: parent?.title, path: parent?.to },
            { label: title, path: '' }
          ]
        }
      }}
    >
      {children}
    </Link>
  ) : (
    <div
      style={{ cursor: 'pointer' }}
      className={`${classesBase}__entry__link ${slim && 'sidebar-item-parent'}`}
      onClick={() => onToggle()}
    >
      {children}
    </div>
  );
};

const SideBarMenuItem: React.FC<SideBarMenuItemProps> = ({
  title,
  to,
  icon,
  subNode,
  parent,
  slim,
  children,
  isParent
}) => {
  const { pathname } = useLocation();
  const [nodeStatus, setNodeState] = useState<{
    open?: boolean;
    active?: boolean;
  }>({
    open: false,
    active: false
  });

  const classesBase = !children ? 'sidebar-submenu' : 'sidebar-menu';
  const classes = classNames(`${classesBase}__entry`, {
    [`${classesBase}__entry--nested`]: !!children,
    open: !subNode && nodeStatus.open,
    active: nodeStatus.active
  });

  const toggleNode = () => {
    !slim && setNodeState({ ...nodeStatus, open: !nodeStatus.open });
  };

  useEffect(() => {
    !subNode
      ? setNodeState({ ...nodeStatus, open: !nodeStatus.open })
      : setNodeState({ ...nodeStatus, active: pathname === to });
    // eslint-disable-next-line
  }, [pathname, slim]);

  useEffect(() => {
    if (!subNode) {
      const childrenPath = React.Children.map(children, (child) => Object(child)?.props?.to);
      const includeActiveChild = pathname?.includes(childrenPath?.[0]);
      setNodeState({
        ...nodeStatus,
        active: includeActiveChild && !subNode
      });
    }
    // eslint-disable-next-line
  }, [nodeStatus.open, pathname]);

  return (
    <>
      {children !== 0 && (
        <li className={classes}>
          <SideBarMenuItemLink
            to={to}
            title={title}
            onToggle={toggleNode}
            classesBase={classesBase}
            parent={parent}
            slim={slim}
            isParent={isParent}
          >
            <i className={`fa fa-fw ${!subNode ? icon : 'd-none'}`} />
            <span>{title}</span>
          </SideBarMenuItemLink>
          {children && (
            <ul className="sidebar-submenu">
              {React.Children.map(children, (child) =>
                React.cloneElement(child as ReactElement, {
                  subNode: true,
                  parent: { title, to }
                })
              )}
            </ul>
          )}
        </li>
      )}
    </>
  );
};

export { SideBarMenuItem };
