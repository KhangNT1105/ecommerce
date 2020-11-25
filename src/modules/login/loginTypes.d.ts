import { AuthenticationStates } from 'stores/AuthenticationStore/authenticationType';

interface LoginSuccess {
  email: string;
  token: string;
  cookies?: string;
  userInfor: UserInformation;
  sessionId?: string;
}

interface UserInformation {
  username: string;
  email: string;
  birthYear: number;
  birthMonth: number;
  gender: string;
  lastName: string;
  firstName: string;
  permissions: string[];
}

interface LoginStates {
  user_name: string;
  email: string;
  cookie: string;
  message: string;
  permissions: string[];
  loggedIn: boolean;
}

interface LoginFormValues {
  email: string;
  password: string;
  message?: string;
}
interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface OtherProps {
  message?: string;
  login: (values: LoginFormValues) => Promise<void>;
}
interface SignUpFormProps {
  message: string;
}
interface SignUpOtherProps {
  signUp: (values: SignUpFormValues) => Promise<void>;
}

interface LoginFormProps {
  initialEmail?: string;
  message: string;
}

interface LocationStates {
  from?: string;
}
interface ILocationLogin {
  state?: {
    isLogin: boolean;
  };
}
export {
  SignUpFormValues,
  SignUpFormProps,
  SignUpOtherProps,
  LoginSuccess,
  LoginStates,
  UserInformation,
  LoginFormValues,
  OtherProps,
  LoginFormProps,
  LocationStates,
  ILocationLogin
};
