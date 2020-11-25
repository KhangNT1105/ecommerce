import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BreadCrumbProps } from './BreadCrumb.d';
import { PAGE_ACTIONS } from 'constants/enum';
import { FaAngleRight } from 'react-icons/fa';
import './Breadcrumb.scss';
const BreadCrumb: React.FC<BreadCrumbProps> = ({ items, arrowFirst, align = 'center' }) => {
  const { t } = useTranslation();
  const actions = [PAGE_ACTIONS.CREATE, PAGE_ACTIONS.EDIT, PAGE_ACTIONS.DELETE];

  const actionFilter = (actionName: string) => {
    return actions.filter((item) => actionName.includes(item));
  };

  return (
    <div className={`customBreadcrumb text-${align}`}>
      {arrowFirst && (
        <span className="navbar-text px-2">
          <FaAngleRight />
        </span>
      )}
      {items.map((item, index) => {
        const titleAction = actionFilter(`${item.label?.toLowerCase()}`);
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <span className="navbar-text">
              {item.path ? (
                <Link to={item.path} className="parent text__animation">
                  {t(`${item.label}`)}
                </Link>
              ) : (
                <span className="child">{titleAction.length > 0 ? titleAction[0] : t(`${item.label}`)}</span>
              )}
            </span>
            {index !== items.length - 1 && (
              <span className="navbar-text px-2 icon">
                <FaAngleRight />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
