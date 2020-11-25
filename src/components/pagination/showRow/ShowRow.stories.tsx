import React from 'react';
import { storiesOf } from '@storybook/react';
import ShowRow from './ShowRow';

import { LIST_MAX_ROWS } from '../../../constants/index';
const WrapperShowRow = () => {
  const [currentSize, setCurrentSize] = React.useState(25);
  return <ShowRow listMaxRows={LIST_MAX_ROWS} currentSize={currentSize} setCurrentSize={setCurrentSize} />;
};
storiesOf('ShowRow', module).add('with default Pagination', () => <WrapperShowRow />);
