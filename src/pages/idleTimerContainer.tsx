import React, { useEffect } from 'react';
import IdleTimer from 'react-idle-timer';
import { useHistory } from 'react-router-dom';

import useAuthentication from '../stores/AuthenticationStore/authentication';
import RoutesString from './routesString';

let idleTimer: IdleTimer | null = null;
const IdleTimerContainer = () => {
  const history = useHistory();
  const [state, actions] = useAuthentication();

  useEffect(() => {
    if (state.loggedIn) {
      actions.getUserPermissions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async () => {
    if (idleTimer) {
      idleTimer.reset();
    }
  };

  const handleIdle = async () => {
    const pathname = history.location.pathname;
    await actions.logout();
    history.push(RoutesString.Login, { from: pathname });
  };

  if (!state.loggedIn) return null;

  return (
    <IdleTimer
      ref={(ref) => {
        idleTimer = ref;
      }}
      element={document}
      onActive={handleAction}
      onIdle={handleIdle}
      onAction={handleAction}
      debounce={5000} // actions.refreshToken will be fired every 5 seconds
      timeout={state.timeout}
    />
  );
};

export default IdleTimerContainer;
