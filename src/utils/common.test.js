import { recursiveGetFieldName } from 'utils/common';
import { validateRequired, validateEmail } from './validation';

describe('MetaData tab', () => {
  describe('recursiveGetFieldName', () => {
    it('Should combined recursive keys in string by the input "entity" string to trigger the recursive to stop if any', () => {
      const dataResp = {
        data: {
          introduce: {
            en: {
              entity: {
                show_name: {
                  fieldName: 'show_name',
                  validationRules: [
                    { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD' }
                  ],
                  fieldType: 'input',
                  fieldLabel: 'SHOW_NAME',
                  fieldValue: 'en'
                },
                show_label: {
                  fieldName: 'show_label',
                  validationRules: [
                    { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD' },
                    {
                      rule: 'isEmail',
                      code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID'
                    }
                  ],
                  fieldType: 'input',
                  fieldLabel: 'SHOW_LABEL',
                  fieldValue: ''
                }
              }
            },
            ar: {
              entity: {
                show_name: {
                  fieldName: 'show_name',
                  validationRules: [
                    { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD' }
                  ],
                  fieldType: 'input',
                  fieldLabel: 'SHOW_NAME',
                  fieldValue: 'ar'
                },
                show_label: {
                  fieldName: 'show_label',
                  validationRules: [
                    { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD' },
                    {
                      rule: 'isEmail',
                      code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID'
                    }
                  ],
                  fieldType: 'input',
                  fieldLabel: 'SHOW_LABEL',
                  fieldValue: ''
                }
              }
            }
          }
        }
      };
      const dataRespExpected = {
        'en.entity.show_name': {
          fieldName: 'show_name',
          validationRules: [
            { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD', validator: validateRequired }
          ],
          fieldType: 'input',
          fieldLabel: 'SHOW_NAME',
          fieldValue: 'en'
        },
        'en.entity.show_label': {
          fieldName: 'show_label',
          validationRules: [
            { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD', validator: validateRequired },
            { rule: 'isEmail', code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID', validator: validateEmail }
          ],
          fieldType: 'input',
          fieldLabel: 'SHOW_LABEL',
          fieldValue: ''
        },
        'ar.entity.show_name': {
          fieldName: 'show_name',
          validationRules: [
            { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD', validator: validateRequired }
          ],
          fieldType: 'input',
          fieldLabel: 'SHOW_NAME',
          fieldValue: 'ar'
        },
        'ar.entity.show_label': {
          fieldName: 'show_label',
          validationRules: [
            { rule: 'isRequired', code: 'FORM_ERROR_REQUIRED_FIELD', validator: validateRequired },
            { rule: 'isEmail', code: 'FORM_ERROR_REQUIRED_FIELD_EMAIL_INVALID', validator: validateEmail }
          ],
          fieldType: 'input',
          fieldLabel: 'SHOW_LABEL',
          fieldValue: ''
        },
      }

      const wrapper = recursiveGetFieldName(dataResp.data.introduce, 'entity');
      expect(wrapper).toEqual(dataRespExpected);
    });
  });
});
