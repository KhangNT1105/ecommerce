import React, { useEffect } from 'react';
import { Row, Col, Card } from 'reactstrap';
import { useTranslation } from 'react-i18next';

import { IArtWorkType, IItemType } from './ArtWorkType';
import { FILE_SIZE_IN_MB, FILE_SIZE_IN_PX } from 'constants/dropzone';

const ArtWork: React.FC<IArtWorkType> = (props) => {
  const { t } = useTranslation();
  const { title, subTitle, getData, items } = props;

  useEffect(() => {
    if (getData) {
      getData && getData();
    }
  }, [getData]);

  const item = (value: IItemType, index: number) => {
    const { title, component, status } = value;
    return (
      <>
        {status && (
          <Col>
            <h6>{t(title)}</h6>
            {component(getData)}
          </Col>
        )}
      </>
    );
  };
  const renderItem = () => {
    return (
      <>
        {items.map((value, index) => (
          <React.Fragment key={`${title}${index}`}>{item(value, index)}</React.Fragment>
        ))}
      </>
    );
  };

  return (
    <Card>
      <h4>{t(title)}</h4>
      <small
        className="small mb-3"
        dangerouslySetInnerHTML={{
          __html: t(subTitle, {
            SIZE_IN_MB: FILE_SIZE_IN_MB,
            SIZE_IN_PX: FILE_SIZE_IN_PX
          })
        }}
      />
      <Row>{renderItem()}</Row>
    </Card>
  );
};

ArtWork.defaultProps = {
  name: '',
  title: '',
  subTitle: '',
  items: []
};

export default ArtWork;
