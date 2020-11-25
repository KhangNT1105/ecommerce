import React, { useEffect } from 'react';
import { useHistory, withRouter, RouteComponentProps } from 'react-router-dom';

import useAuthentication from 'stores/AuthenticationStore/authentication';
import { LocationStates } from 'modules/login/loginTypes';
import RoutesString from 'pages/routesString';
import LoginWrapper from 'modules/login/LoginWrapper';

const Login: React.FC<RouteComponentProps> = (props) => {
  const history = useHistory();
  const [state] = useAuthentication();

  useEffect(() => {
    if (state.loggedIn) {
      const locationState = props.location.state as LocationStates;
      if (locationState?.from) {
        history.push(locationState.from);
        return;
      }
      history.push(RoutesString.Welcome);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loggedIn, history]);
  return <LoginWrapper />;
};

export default withRouter(Login);
