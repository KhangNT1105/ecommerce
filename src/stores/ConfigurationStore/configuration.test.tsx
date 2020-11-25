import { actions, initialState } from './configuration';
import * as API from 'api';

const setState = jest.fn();
const getState = () => ({ ...initialState });
const dispatch = jest.fn();

describe('actions', () => {
  describe('Fetch configuration', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test('Fetching configuration success', async () => {
      jest.spyOn(API, 'default').mockImplementation(() =>
        Promise.resolve({
          content: [
            {
              type: 'moods',
              code: 'moods_1',
              labels: {
                en: 'en',
                ar: 'ar'
              }
            },
            {
              type: 'moods',
              code: 'moods_2',
              labels: {
                en: 'en',
                ar: 'ar'
              }
            },
            {
              type: 'subGenres',
              code: 'subGenres_1',
              labels: {
                en: 'en',
                ar: 'ar'
              }
            }
          ]
        })
      );

      await actions.fetchConfiguration()({ setState, getState, dispatch });

      expect(setState).toHaveBeenCalledWith({
        ...initialState,
        moods: [
          {
            type: 'moods',
            code: 'moods_1',
            labels: {
              en: 'en',
              ar: 'ar'
            }
          },
          {
            type: 'moods',
            code: 'moods_2',
            labels: {
              en: 'en',
              ar: 'ar'
            }
          }
        ],
        subGenres: [
          {
            type: 'subGenres',
            code: 'subGenres_1',
            labels: {
              en: 'en',
              ar: 'ar'
            }
          }
        ]
      });
    });
  });
});
