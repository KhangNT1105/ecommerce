import { handleRefreshToken } from './interceptors';

jest.mock('localforage');
jest.mock('./', () => {
  const data = {
    accessToken: 'eyJhbGciOiJIUzI1NiJ9',
    refreshToken: 'eyJhbGciOiJIUzI1NiJ9',
    menuItems: ['shows', 'catalogs', 'channels', 'playlists']
  };
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => data)
  };
});

describe('handleRefreshToken', () => {
  const mockData = {
    accessToken: 'eyJhbGciOiJIUzI1NiJ9',
    refreshToken: 'eyJhbGciOiJIUzI1NiJ9',
    menuItems: ['shows', 'catalogs', 'channels', 'playlists']
  };
  test('refresh token successful', async () => {
    const res = await handleRefreshToken(mockData.refreshToken, mockData.accessToken);
    expect(res).toEqual(mockData);
  });
});
