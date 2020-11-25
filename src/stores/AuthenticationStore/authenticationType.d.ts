interface UserInformation {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  token: string;
  permissions: string[];
}

interface AuthenticationStates {
  message: string;
  user: UserInformation;
  loggedIn: boolean;
  failedTimes: number;
  initiated?: boolean;
  authenticate: AuthenticateInformation;
  captchaToken: string | null;
  timeout: number;
}

interface AuthenticateInformation {
  token: string;
  refreshToken: string;
  menuItems: string[];
}

interface TokenData {
  exp: number;
  iat: number;
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  token: string;
  permissions: string[];
}

export { AuthenticationStates, UserInformation, AuthenticateInformation, TokenData };
