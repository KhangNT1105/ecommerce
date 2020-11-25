import React from 'react';
import { Denomination } from 'Props.d';
import { assign, clone, map, reduce, isObjectLike } from 'lodash';
import { validateRequired, validateEmail } from 'utils/validation';
import { ACTIVATE, ENTITY_STATUS_FROM_SERVER, DEACTIVATE, DELETE, APPROVE, REJECT } from '../constants';
import { Genre, SubGenre } from 'stores/ConfigurationStore/configurationType.d';

export const checkRenderDoubleValue = (value1?: string | number, value2?: string | number, value3?: any | '') => {
  let minus = '';
  if (value1 && value2) {
    minus = ' - ';
  }
  return (
    <>
      {value1} {value3 && <b>{value3}</b>}
      {minus}
      {value2}
    </>
  );
};

export type SelectOptionProps = {
  id: string;
  value: string;
  label: string;
};

type DataProps = {
  [key: string]: any;
};

export type SelectOptionKeyMappingProps = {
  key: string;
  value: string;
  label: string;
};

export const renderSelectOptions = (data: DataProps[], keyMapping?: SelectOptionKeyMappingProps) => {
  return (
    <>
      <option value="">Select</option>
      {data.map((item) => {
        if (keyMapping && Object.entries(keyMapping).length > 0) {
          return (
            <option key={item[keyMapping.key]} value={item[keyMapping.value]}>
              {item[keyMapping.label]}
            </option>
          );
        }
        return (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </>
  );
};

export const checkRenderArray = (items: string[]) => {
  return <span>{items.join(', ')}</span>;
};

export const getListPrices = (denominations: Denomination[]) => {
  const listPrices = denominations.map((item) => item.price);
  return listPrices.sort((a, b) => a - b);
};
export const getPrices = (productDetail: any) => {
  if (productDetail.valueType === 'RANGE') {
    return checkRenderDoubleValue(productDetail.minPrice, productDetail.maxPrice);
  }
  if (productDetail.valueType === 'SLAB') {
    const values = getListPrices(productDetail.denominations);
    return values.join(', ');
  }
};

export interface IPagingModelOption {
  pageIndex: number;
  pageSize: number;
}

export interface IPagingModelResult<T> {
  items: T[];
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  size: number;
  page: number;
  totalItems: number;
  totalPages: number;
}

export function getPaginationResponse<T>(
  pagingModel: IPagingModelOption,
  result: T[],
  totalItems: number
): IPagingModelResult<T> {
  const totalPages = Math.floor((totalItems + pagingModel.pageSize - 1) / pagingModel.pageSize);
  const pagingModelResult: IPagingModelResult<T> = {
    items: result,
    totalItems,
    totalPages,
    hasPrevPage: pagingModel.pageIndex > 0,
    hasNextPage: pagingModel.pageIndex < totalPages - 1,
    prevPage: pagingModel.pageIndex > 0 ? pagingModel.pageIndex - 1 : null,
    nextPage: pagingModel.pageIndex < totalPages - 1 ? pagingModel.pageIndex + 1 : null,
    size: pagingModel.pageSize,
    page: pagingModel.pageIndex
  };
  return pagingModelResult;
}

export function replaceSpecialCharacters(str: string, character: string) {
  return str.replace(/(?:\.(?![^.]+$)|[^\w.])+/g, character);
}

export const classConcat = (classes: string[]): string => {
  if (classes.length) {
    return classes.filter((className) => !!className).join(' ');
  }
  return '';
};

export const recursiveGetFieldName = (obj: object, entityField: string, fieldNameCombine?: string): any => {
  let listFieldConfig: any;
  listFieldConfig = reduce(
    obj,
    (result, value, key) => {
      let cloneResult = clone(result);
      let localFieldName: any = clone(fieldNameCombine);
      if (key === entityField) {
        map(value, (item: any, k) => {
          const getFieldName = `${localFieldName}.${key}.${k}`;

          // check whether any validation
          if (item.validationRules && item.validationRules.length > 0) {
            item.validationRules.map((itemValidate: any, index: number) => {
              if (itemValidate.rule === 'isRequired') {
                item.validationRules[index].validator = validateRequired;
              }
              if (itemValidate.rule === 'isEmail') {
                item.validationRules[index].validator = validateEmail;
              }

              return itemValidate;
            });
          }

          // insert key, value into list field
          return (cloneResult = {
            ...cloneResult,
            [getFieldName]: item
          });
        }); // reset field name

        localFieldName = '';
      } else if (isObjectLike(value)) {
        if (!localFieldName) {
          localFieldName = key;
        } else {
          localFieldName += `.${key}`;
        } // recall recursive fn if not be found the expected entityField

        return assign(cloneResult, recursiveGetFieldName(value, entityField, localFieldName));
      }

      listFieldConfig = {
        ...listFieldConfig,
        ...cloneResult
      };

      return listFieldConfig;
    },
    {}
  );

  return listFieldConfig;
};

export type ObjectFieldType = {
  [field: string]: string | object | string[] | object[] | any;
};

export const trimAllValueWithObjectField = (objField: ObjectFieldType) => {
  if ((!Array.isArray(objField) && typeof objField !== 'object') || objField === null) {
    return objField;
  }
  return Object.keys(objField).reduce(
    (acc: ObjectFieldType, key) => {
      acc[key] =
        typeof objField[key] === 'string'
          ? (objField[key] as string).trim()
          : trimAllValueWithObjectField(objField[key]);
      return acc;
    },
    Array.isArray(objField) ? [] : {}
  );
};

const listShowBtnActivate = [
  ENTITY_STATUS_FROM_SERVER.INACTIVATE,
  ENTITY_STATUS_FROM_SERVER.DRAFT,
  ENTITY_STATUS_FROM_SERVER.UPDATED,
  ENTITY_STATUS_FROM_SERVER.ACTIVATE
];

const listShowBtnSMActivate = [
  ENTITY_STATUS_FROM_SERVER.INACTIVATE,
  ENTITY_STATUS_FROM_SERVER.DRAFT,
  ENTITY_STATUS_FROM_SERVER.UPDATED
];

const listShowBtnSMDelete = [ENTITY_STATUS_FROM_SERVER.DRAFT, ENTITY_STATUS_FROM_SERVER.INACTIVATE];

const listShowBtnDeactivate = [ENTITY_STATUS_FROM_SERVER.ACTIVATE, ENTITY_STATUS_FROM_SERVER.UPDATED];

const listShowBtnDelete = [ENTITY_STATUS_FROM_SERVER.INACTIVATE, ENTITY_STATUS_FROM_SERVER.DRAFT];

export const checkEntityActionNonApproval = (action: string, entityStatus: string) => {
  switch (action) {
    case ACTIVATE:
      return listShowBtnActivate.includes(entityStatus);
    case DEACTIVATE:
      return listShowBtnDeactivate.includes(entityStatus);
    case DELETE:
      return listShowBtnDelete.includes(entityStatus);
    default:
      return true;
  }
};

export const checkSMEntityActionNonApproval = (action: string, entityStatus: string) => {
  switch (action) {
    case ACTIVATE:
      return listShowBtnSMActivate.includes(entityStatus);
    case DEACTIVATE:
      return listShowBtnDeactivate.includes(entityStatus);
    case DELETE:
      return listShowBtnSMDelete.includes(entityStatus);
    default:
      return true;
  }
};

export const getAllSubGenres = (genres: Genre[]) =>
  genres
    .map(({ children }) => children)
    .reduce((currentValue, subGenres) => {
      if (subGenres) {
        return [...currentValue, ...subGenres];
      }
      return currentValue;
    }, []);

export const getAllMicroGenres = (subGenres: SubGenre[]) =>
  subGenres
    .map(({ children }) => children)
    .reduce((currentValue, microGenre) => {
      if (microGenre) {
        return [...currentValue, ...microGenre];
      }
      return currentValue;
    }, []);

const listShowBtnActivateWithApproval = [...listShowBtnActivate, ENTITY_STATUS_FROM_SERVER.REJECT];
const listShowBtnDeactivateWithApproval = [...listShowBtnDeactivate];
const listShowBtnDeleteWithApproval = [...listShowBtnDelete];
const listShowBtnApproveWithApproval = [ENTITY_STATUS_FROM_SERVER.APPROVAL_PENDING];
const listShowBtnRejectWithApproval = [ENTITY_STATUS_FROM_SERVER.APPROVAL_PENDING];

export const checkEntityActionApproval = (action: string, entityStatus: string) => {
  switch (action) {
    case ACTIVATE:
      return listShowBtnActivateWithApproval.includes(entityStatus);
    case DEACTIVATE:
      return listShowBtnDeactivateWithApproval.includes(entityStatus);
    case DELETE:
      return listShowBtnDeleteWithApproval.includes(entityStatus);
    case APPROVE:
      return listShowBtnApproveWithApproval.includes(entityStatus);
    case REJECT:
      return listShowBtnRejectWithApproval.includes(entityStatus);
    default:
      return true;
  }
};

export function createMarkup() {
  return {
    __html: `<div class="zalo-chat-widget" data-oaid="927003371386666481" data-welcome-message="Rất vui khi được hỗ trợ bạn!" data-autopopup="0" data-width="450" data-height="450"></div>
    `
  };
}
