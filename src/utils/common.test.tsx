import {
  checkRenderDoubleValue,
  getPrices,
  classConcat,
  checkEntityActionNonApproval,
  checkSMEntityActionNonApproval,
  checkEntityActionApproval,
  trimAllValueWithObjectField,
  renderSelectOptions,
  getAllSubGenres
} from './common';
import { ACTIVATE, ENTITY_STATUS_FROM_SERVER, ENTITY_STATUS, DEACTIVATE, DELETE, APPROVE, REJECT } from '../constants';

describe('common', () => {
  describe('checkRenderDoubleValue', () => {
    test('render default', () => {
      const result = checkRenderDoubleValue();
      expect(result).toMatchSnapshot();
    });
    test('render with value 1', () => {
      const result = checkRenderDoubleValue('abc');
      expect(result).toMatchSnapshot();
    });
    test('render with value 1 && value 2', () => {
      const result = checkRenderDoubleValue('abc', 'bcd');
      expect(result).toMatchSnapshot();
    });
    test('render with value 1 && value 2 && value 3', () => {
      const result = checkRenderDoubleValue('abc', 'bcd', '1');
      expect(result).toMatchSnapshot();
    });
  });
  describe('getPrices', () => {
    test('should return checkRenderDoubleValue when valueType is RANGE', () => {
      const productDetail = {
        valueType: 'RANGE',
        minPrice: 0,
        maxPrice: 100
      };
      const wrapper = getPrices(productDetail);
      expect(wrapper).toMatchSnapshot();
    });
    test('should return value denominations when valueType is SLAB', () => {
      const productDetail = {
        valueType: 'SLAB',
        denominations: [
          { label: 'apple', price: 500 },
          { label: 'banana', price: 400 }
        ]
      };
      const wrapper = getPrices(productDetail);
      expect(wrapper).toEqual('400, 500');
    });
    test('should return undefined when valueType is not SLAB && RANGE', () => {
      const productDetail = {
        valueType: 'A',
        denominations: [
          { label: 'apple', price: 500 },
          { label: 'banana', price: 400 }
        ]
      };
      const wrapper = getPrices(productDetail);
      expect(wrapper).toEqual(undefined);
    });
  });

  describe('classConcat', () => {
    test('should return empty string when classes is empty array', () => {
      expect(classConcat([])).toEqual('');
    });
  });

  describe('checkEntityActionNonApproval', () => {
    test('should allow activate when action is Activate and status from server is activated', () => {
      const res = checkEntityActionNonApproval(ACTIVATE, ENTITY_STATUS_FROM_SERVER.ACTIVATE);
      expect(res).toEqual(true);
    });
    test('should allow activate when action is Activate and status from server is inactive', () => {
      const res = checkEntityActionNonApproval(ACTIVATE, ENTITY_STATUS_FROM_SERVER.INACTIVATE);
      expect(res).toEqual(true);
    });
    test('should allow activate when action is Activate and status from server is draft', () => {
      const res = checkEntityActionNonApproval(ACTIVATE, ENTITY_STATUS_FROM_SERVER.DRAFT);
      expect(res).toEqual(true);
    });
    test('should allow activate when action is Activate and status from server is updated', () => {
      const res = checkEntityActionNonApproval(ACTIVATE, ENTITY_STATUS_FROM_SERVER.UPDATED);
      expect(res).toEqual(true);
    });
    test('should allow deactivate when action is Deactivate and status from server is activated', () => {
      const res = checkEntityActionNonApproval(DEACTIVATE, ENTITY_STATUS_FROM_SERVER.ACTIVATE);
      expect(res).toEqual(true);
    });
    test('should allow deactivate when action is Deactivate and status from server is updated', () => {
      const res = checkEntityActionNonApproval(DEACTIVATE, ENTITY_STATUS_FROM_SERVER.UPDATED);
      expect(res).toEqual(true);
    });
    test('should allow delete when action is Delete and status from server is inactive', () => {
      const res = checkEntityActionNonApproval(DELETE, ENTITY_STATUS_FROM_SERVER.INACTIVATE);
      expect(res).toEqual(true);
    });
    test('should allow delete when action is Delete and status from server is draft', () => {
      const res = checkEntityActionNonApproval(DELETE, ENTITY_STATUS_FROM_SERVER.DRAFT);
      expect(res).toEqual(true);
    });
    test('should allow approve when action is Approve and status from server is pending approval', () => {
      const res = checkEntityActionApproval(APPROVE, ENTITY_STATUS_FROM_SERVER.APPROVAL_PENDING);
      expect(res).toEqual(true);
    });
    test('should allow reject when action is Reject and status from server is pending approval', () => {
      const res = checkEntityActionApproval(REJECT, ENTITY_STATUS_FROM_SERVER.APPROVAL_PENDING);
      expect(res).toEqual(true);
    });
  });

  describe('checkSMEntityActionNonApproval', () => {
    test('should allow activate when action is Activate and status from server is inactive', () => {
      const res = checkSMEntityActionNonApproval(ACTIVATE, ENTITY_STATUS_FROM_SERVER.INACTIVATE);
      expect(res).toEqual(true);
    });
    test('should allow activate when action is Activate and status from server is draft', () => {
      const res = checkSMEntityActionNonApproval(ACTIVATE, ENTITY_STATUS_FROM_SERVER.DRAFT);
      expect(res).toEqual(true);
    });
    test('should allow activate when action is Activate and status from server is updated', () => {
      const res = checkSMEntityActionNonApproval(ACTIVATE, ENTITY_STATUS_FROM_SERVER.UPDATED);
      expect(res).toEqual(true);
    });
    test('should allow deactivate when action is Deactivate and status from server is activated', () => {
      const res = checkSMEntityActionNonApproval(DEACTIVATE, ENTITY_STATUS_FROM_SERVER.ACTIVATE);
      expect(res).toEqual(true);
    });
    test('should allow deactivate when action is Deactivate and status from server is updated', () => {
      const res = checkSMEntityActionNonApproval(DEACTIVATE, ENTITY_STATUS_FROM_SERVER.UPDATED);
      expect(res).toEqual(true);
    });
    test('should allow delete when action is Delete and status from server is inactive', () => {
      const res = checkSMEntityActionNonApproval(DELETE, ENTITY_STATUS_FROM_SERVER.INACTIVATE);
      expect(res).toEqual(true);
    });
    test('should allow delete when action is Delete and status from server is draft', () => {
      const res = checkSMEntityActionNonApproval(DELETE, ENTITY_STATUS_FROM_SERVER.DRAFT);
      expect(res).toEqual(true);
    });
    test('should allow approve when action is Approve and status from server is pending approval', () => {
      const res = checkSMEntityActionNonApproval(APPROVE, ENTITY_STATUS_FROM_SERVER.APPROVAL_PENDING);
      expect(res).toEqual(true);
    });
    test('should allow reject when action is Reject and status from server is pending approval', () => {
      const res = checkSMEntityActionNonApproval(REJECT, ENTITY_STATUS_FROM_SERVER.APPROVAL_PENDING);
      expect(res).toEqual(true);
    });
  });

  describe('trimAllValueWithObjectField', () => {
    test('should trim with object has string value', () => {
      const objectField = {
        name: '  test ',
        status: '  test    '
      };
      const expectedValue = {
        name: 'test',
        status: 'test'
      };
      expect(trimAllValueWithObjectField(objectField)).toEqual(expectedValue);
    });
    test('should trim with object has one nested object and string value', () => {
      const objectField = {
        name: '  test ',
        status: {
          new: ' new ',
          old: ' new '
        }
      };
      const expectedValue = {
        name: 'test',
        status: {
          new: 'new',
          old: 'new'
        }
      };
      expect(trimAllValueWithObjectField(objectField)).toEqual(expectedValue);
    });
    test('should trim with object has two nested object', () => {
      const objectField = {
        name: {
          firstName: ' test ',
          lastName: ' test '
        },
        status: {
          new: ' new ',
          old: ' old '
        }
      };
      const expectedValue = {
        name: {
          firstName: 'test',
          lastName: 'test'
        },
        status: {
          new: 'new',
          old: 'old'
        }
      };
      expect(trimAllValueWithObjectField(objectField)).toEqual(expectedValue);
    });
    test('should trim with object has two nested object with null or undefined value', () => {
      const objectField = {
        name: {
          firstName: undefined,
          lastName: ' test '
        },
        status: {
          new: null,
          old: ' old '
        }
      };
      const expectedValue = {
        name: {
          firstName: undefined,
          lastName: 'test'
        },
        status: {
          new: null,
          old: 'old'
        }
      };
      expect(trimAllValueWithObjectField(objectField)).toEqual(expectedValue);
    });
  });

  describe('renderSelectOptions', () => {
    test('should render select options correct', () => {
      const data = [
        {
          id: '1',
          value: 'minute',
          label: 'Minute'
        },
        {
          id: '2',
          value: 'hour',
          label: 'Hour'
        },
        {
          id: '3',
          value: 'day',
          label: 'Day'
        }
      ];
      const result = renderSelectOptions(data);
      expect(result.props.children[1].length).toEqual(3);
    });
  });
  describe('getAllSubGenres', () => {
    test('should return all subGenres with genreList', () => {
      expect(
        getAllSubGenres([
          {
            code: 'test1',
            id: 'test-id',
            children: [
              {
                code: 'test-subgenre',
                label: {
                  ar: 'label-ar'
                },
                id: 'subgenre-id'
              }
            ],
            label: {}
          },
          {
            code: 'test1',
            id: 'test-id',
            label: {}
          }
        ] as any)
      ).toEqual([
        {
          code: 'test-subgenre',
          label: {
            ar: 'label-ar'
          },
          id: 'subgenre-id'
        }
      ]);
    });
  });
});
