import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { AxiosMock } from 'api/axios.mock';
import useAPI from './useAPI';

jest.mock('axios');
jest.mock('localforage');
const mockedAxios = axios as AxiosMock;
interface IExpectedData {
  data: {
    status: number;
    data: {
      results: any;
    };
  };
}
let mockData: IExpectedData;

describe('UseAPI', () => {
  beforeAll(() => {
    mockData = {
      data: {
        status: 200,
        data: {
          results: [
            {
              email: 'jurgen.moser@example.com',
              phone: '0215-2466657',
              gender: 'male'
            }
          ]
        }
      }
    };
  });

  beforeEach(() => {
    mockedAxios.mockClear();
  });

  test('useAPI performs GET request', async () => {
    const initialValue: any = [];
    mockedAxios.mockResolvedValue(mockData);

    const url = 'http://mock';

    const { result, waitForNextUpdate } = renderHook(() => useAPI({ url, initialValue, loadInitialState: true }));
    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockData.data);
    expect(result.current.loading).toBeFalsy();
  });

  // test("useAPI performs GET request", async () => {
  //   const initialValue = [];
  //   mockedAxios.mockRejectedValue(new Error('Oops. Something wrong happened'))

  //   const url = "http://mock";

  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     useAPI(url, initialValue)
  //   );
  //   expect(result.current.data).toEqual([]);
  //   expect(result.current.loading).toBeTruthy();

  //   await waitForNextUpdate();
  //   expect(result.current.loading).toBeFalsy();
  //   expect(result.current.data).toEqual([]);
  // });
});
