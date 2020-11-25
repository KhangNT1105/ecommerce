import React from 'react';
import renderer from 'react-test-renderer';

import { DURATION, POSITION, TOAST_TYPE } from '../../constants/enum';
import Toast, { getTitle, getIcon, getContentToast } from './Toast';
import i18n from 'i18n/i18n';

describe('Toast is testing...', () => {
  test('Render toast successfully', () => {
    const toast = renderer.create(
      <Toast message={'This is default toast message.'} duration={DURATION.TOAST} position={POSITION.BOTTOM_RIGHT} />
    );

    expect(toast).toMatchSnapshot();
  });
});

describe('getTile', () => {
  test('it should return title is Attention', () => {
    expect(getTitle()).toEqual(i18n.t('ATTENTION!'));
  });
  test('it should return title is Error!', () => {
    expect(getTitle(TOAST_TYPE.ERROR)).toEqual(i18n.t('ERROR!'));
  });
  test('it should return title is Success!', () => {
    expect(getTitle(TOAST_TYPE.SUCCESS)).toEqual(i18n.t('SUCCESS!'));
  });
});

describe('getIcon', () => {
  test('it should return fa-question', () => {
    expect(getIcon()).toEqual('fa-question');
  });
  test('it should return fa-close', () => {
    expect(getIcon(TOAST_TYPE.ERROR)).toEqual('fa-close');
  });
  test('it should return fa-check', () => {
    expect(getIcon(TOAST_TYPE.SUCCESS)).toEqual('fa-check');
  });
});

describe('getContentToast', () => {
  const closeToast = jest.fn();
  test('test snapShot', () => {
    const content = renderer.create(getContentToast('success', 'success')({ closeToast }));

    expect(content).toMatchSnapshot();
  });
});
