import React from 'react';
import renderer from 'react-test-renderer';
import FilterCommon from './FilterCommon';

jest.mock('../filterBlock/FilterBlock', () => 'FilterBlock').mock('../filterTag/FilterTag', () => 'FilterTag');

describe('component FilterCommon', () => {
  test('renders snapshot correctly', () => {
    const tree = renderer
      .create(
        <FilterCommon
          filterList={['id', 'name', 'this is a very long item']}
          filterValueList={[
            {
              tagName: 'test',
              values: ['test'],
              suggestionList: ['test']
            }
          ]}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
