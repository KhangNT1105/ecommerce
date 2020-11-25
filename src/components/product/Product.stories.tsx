import React from 'react';
import { storiesOf } from '@storybook/react';
import Product from './Product';

const product = {
  image:
    'http://tracdiamiennam.com/thumbs_size/product/may-toan-dac/LEICA-TS02-PLUS-5-R500-may-toan-dac-dien-tu_png/200x155_fmin_LEICA-TS02-PLUS-5-R500-may-toan-dac-dien-tu.png',
  _id: '1'
};
const handleAddToCart = () => {};
storiesOf('Product', module).add('default', () => <Product product={product} handleAddToCart={handleAddToCart} />);
