import React from 'react';
import { storiesOf } from '@storybook/react';
import Paginations from './Paginations';

const WrapperPaginations = () => {
  const exampleItems = [...Array(300).keys()].map((i) => ({
    id: i + 1,
    name: `Item + ${i + 1}`
  }));
  return <Paginations totals={exampleItems.length} />;
};

storiesOf('Paginations', module).add('with default Pagination', () => <WrapperPaginations />);
