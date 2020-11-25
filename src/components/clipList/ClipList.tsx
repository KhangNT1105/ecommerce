import React from 'react';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import './ClipList.scss';
import Table from '../table/Table';
import { SIZE } from 'constants/enum';
import { CellType, ClipListProps, pathList, titleList } from './ClipList.d';

const Cell: React.FC<CellType> = ({ value, onSelectCell, rowValue }) => (
  <div className={'text-success'} onClick={() => onSelectCell({ value, rowValue })}>
    {value}
  </div>
);

const defaultProps = {
  titleList,
  pathList,
  renderModal: <div />
};

const ClipList: React.FC<ClipListProps> = ({
  data,
  titleList = defaultProps.titleList,
  pathList = defaultProps.pathList,
  onOpenPopup,
  onClosePopup,
  onSelectCell,
  onRedirect,
  onSelectDropdown,
  renderModal = defaultProps.renderModal
}) => {
  const { t } = useTranslation();

  const renderDropdown = (filterItems: string[], itemId: string) => {
    return (
      <UncontrolledButtonDropdown>
        <DropdownToggle caret={true} size={SIZE.LARGE}>
          {t('CLIP_LIST_DEFAULT_DROPDOWN_ITEM')}
        </DropdownToggle>
        <DropdownMenu>
          {filterItems.map((item) => (
            <DropdownItem key={`${item}-${itemId}`} onClick={() => onSelectDropdown(`${item}-${itemId}`)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    );
  };

  const updateForFieldData = (data: object[]) =>
    data.map((item: any) => {
      return {
        ...item,
        title: <Cell value={item.title} rowValue={item} onSelectCell={onSelectCell} />,
        show: <Cell value={item.show} rowValue={item} onSelectCell={onSelectCell} />,
        status: <Cell value={item.status} rowValue={item} onSelectCell={onSelectCell} />,
        creator: <Cell value={item.creator} rowValue={item} onSelectCell={onSelectCell} />,
        action: <Cell value={renderDropdown(item.action, item._id)} rowValue={item} onSelectCell={onSelectCell} />
      };
    });

  const translateTitleList = (titleList: string[]) => {
    return titleList.map((keyTitle: string) => t(keyTitle));
  };

  const updatedData = updateForFieldData(data);
  const translatedTitleList = translateTitleList(titleList);

  return (
    <>
      <Table
        data={updatedData}
        titleList={translatedTitleList}
        pathList={pathList}
        dataKey="_id"
        className="clip-list"
      />
      {renderModal}
    </>
  );
};

export default ClipList;
