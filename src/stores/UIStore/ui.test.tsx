import { actions, initialState } from './uiStore';

const setState = jest.fn();
const getState = () => ({ ...initialState });
const dispatch = jest.fn();

describe('actions', () => {
  describe('toggleSidebar()', () => {
    it('should update state when Close Sidebar', () => {
      actions.toggleSideBar(true)({
        setState,
        getState,
        dispatch
      });

      expect(setState).toHaveBeenCalledWith({
        sideBar: {
          collapsed: true
        }
      });
    });

    it('should update state when Open Sidebar', () => {
      actions.toggleSideBar(false)({
        setState,
        getState,
        dispatch
      });

      expect(setState).toHaveBeenCalledWith({
        sideBar: {
          collapsed: false
        }
      });
    });
  });
});
