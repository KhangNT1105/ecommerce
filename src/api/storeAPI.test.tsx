import { actions, initialState } from './storeAPI';

const setState = jest.fn();
const getState = () => ({ ...initialState });
const dispatch = jest.fn();

const data = {
  results: [
    {
      gender: 'male',
      name: {
        title: 'Mr',
        first: 'Tobias',
        last: 'Larsen'
      },
      location: {
        street: {
          number: 7520,
          name: 'Køgevej'
        },
        city: 'Argerskov',
        state: 'Midtjylland',
        country: 'Denmark',
        postcode: 40376,
        coordinates: {
          latitude: '-27.1740',
          longitude: '-92.1593'
        },
        timezone: {
          offset: '-3:00',
          description: 'Brazil, Buenos Aires, Georgetown'
        }
      },
      email: 'tobias.larsen@example.com',
      login: {
        uuid: 'e65c7175-582b-4412-8cf6-391fc56983c6',
        username: 'yellowgorilla307',
        password: 'shui',
        salt: 'tHkTqela',
        md5: '16216fdb6d6b5cf77ebc5665c48fec5d',
        sha1: 'db1c83ab03a6ef53dd0983639d972618f3705784',
        sha256: 'd170a8e00d1352df4379718b75563bbbe8af4914e72d7df51dc073e3c11627bc'
      },
      dob: {
        date: '1976-04-20T17:36:50.229Z',
        age: 44
      },
      registered: {
        date: '2003-07-07T19:08:49.369Z',
        age: 17
      },
      phone: '73455174',
      cell: '29783918',
      id: {
        name: 'CPR',
        value: '200476-1799'
      },
      picture: {
        large: 'https://randomuser.me/api/portraits/men/95.jpg',
        medium: 'https://randomuser.me/api/portraits/med/men/95.jpg',
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/95.jpg'
      },
      nat: 'DK'
    }
  ],
  info: {
    seed: 'd3181c92cfea3720',
    results: 1,
    page: 1,
    version: '1.3'
  }
};

describe('actions', () => {
  describe('actions: initData', () => {
    test('actions: initData ', () => {
      actions.initData(initialState)({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith(initialState);
    });
  });

  describe('actions: setData', () => {
    test('should update data state when setData is called and data is not null', () => {
      actions.setData(data)({ setState, getState, dispatch });
      const prevData: any = getState().data;
      expect(setState).toHaveBeenCalledWith({ ...prevData, data });
    });
    test('should update data state when setData is called and data is null', () => {
      actions.setData()({ setState, getState, dispatch });
      const prevData: any = getState().data;
      expect(setState).toHaveBeenCalledWith({ ...prevData, data });
    });
  });

  describe('actions: setFetching', () => {
    test('should update fetching state when setFetching is called and default payload', () => {
      actions.setFetching()({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({
        fetching: false
      });
    });

    test('should update fetching state when setFetching is called and fetching payload is true', () => {
      actions.setFetching(true)({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({
        fetching: true
      });
    });
  });

  describe('actions: setError', () => {
    test('should update error state when setError is called and default payload', () => {
      actions.setError()({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({
        error: false
      });
    });
    test('should update error state when setError is called and error payload is true ', () => {
      actions.setError(true)({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({
        error: true
      });
    });
  });

  describe('actions: setFaults', () => {
    test('should update faults state when setFaults is called and default payload', () => {
      actions.setFaults()({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({
        faults: '',
        data: null,
        fetching: false,
        initiated: false,
        loaded: true,
        error: false
      });
    });
    test('should update faults state when setFaults is called and faults payload is a error message', () => {
      actions.setFaults('can not find user group')({
        setState,
        getState,
        dispatch
      });
      expect(setState).toHaveBeenCalledWith({
        faults: 'can not find user group'
      });
    });
  });

  describe('actions: setLoaded', () => {
    test('should update loaded state when setLoaded is called and default payload', () => {
      actions.setLoaded()({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({
        loaded: false
      });
    });
    test('should update loaded state when setLoaded is called and loaded payload is true', () => {
      actions.setLoaded(true)({ setState, getState, dispatch });
      expect(setState).toHaveBeenCalledWith({
        loaded: true
      });
    });
  });
});
