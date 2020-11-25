export interface Denomination {
  label: string;
  price: number;
}

export interface IBrand {
  id: string;
  brandName: string;
  brandLogo: string;
}

export type UserData = {
  username: string;
  pool?: object;
  Session?: any;
  client?: object;
  signInUserSession?: {
    idToken: {
      jwtToken: string;
      payload?: object;
    };
    refreshToken: {
      token: string;
    };
    accessToken: {
      jwtToken: string;
      payload?: {};
    };
    clockDrift: Number;
  };
  authenticationFlowType?: string;
  storage?: object;
  keyPrefix?: string;
  userDataKey?: string;
  deviceKey?: any;
  attributes?: {
    email: string;
    sub?: string;
    email_verified?: boolean;
    phone_number_verified?: boolean;
    phone_number?: string;
    avatar?: string;
    roles?: string;
  };
  preferredMFA?: string;
};
