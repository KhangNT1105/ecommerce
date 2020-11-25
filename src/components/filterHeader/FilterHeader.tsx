import React from 'react';
import { useTranslation } from 'react-i18next';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import './FilterHeader.scss';

interface IProps {
  filterItems?: string[];
  onChange: (value?: string) => void;
  isFilterAll: boolean;
  filterValue: string | string[];
}

const FilterHeader: React.FC<IProps> = ({ filterItems, onChange, isFilterAll, filterValue }) => {
  const { t } = useTranslation();

  return (
    <div className="filter-header-wrapper">
      <UncontrolledDropdown>
        <DropdownToggle color="link" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className={`filter-wrapper ${isFilterAll ? 'inactive' : 'active'}`}>
            <i className="icon-filter" />
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            className="dropdown-item-first"
            active={filterValue === ''}
            onClick={() => {
              onChange(undefined);
            }}
          >
            {t('ALL')}
          </DropdownItem>
          {filterItems &&
            filterItems.map((item) => (
              <DropdownItem
                key={item}
                className="dropdown-item-first"
                active={filterValue === item}
                onClick={() => {
                  onChange(item);
                }}
              >
                {t(item)}
              </DropdownItem>
            ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};

export default FilterHeader;
