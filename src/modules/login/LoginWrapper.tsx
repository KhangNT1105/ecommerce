import React, { useEffect, useState } from 'react';
import './LoginWrapper.scss';
import loginImage from 'assets/images/login/login.svg';
import signUpImage from 'assets/images/login/signup.svg';
import { useTranslation } from 'react-i18next';
import LoginForm from './loginForm/LoginForm';
import useAuthentication from 'stores/AuthenticationStore/authentication';
import { LoginFormValues, SignUpFormValues, ILocationLogin } from './loginTypes';
import { Link, useLocation } from 'react-router-dom';
import SignUpForm from './signUpForm/SignUpForm';
import CustomHeader from 'components/customHeader/CustomHeader';
const LoginWrapper: React.FC = () => {
  const { t } = useTranslation();
  const { state: stateLocation }: ILocationLogin = useLocation();
  const [state, actions] = useAuthentication();
  const handleLogin = async (values: LoginFormValues) => {
    await actions.login(values);
  };
  const handleSignUp = async (values: SignUpFormValues) => {
    await actions.signUp(values);
  };
  const [isLoginForm, setIsLoginForm] = useState(stateLocation?.isLogin);

  useEffect(() => {
    if (stateLocation?.isLogin != null) {
      setIsLoginForm(stateLocation.isLogin);
    }
  }, [stateLocation]);
  const handleClickRegisterForm = () => {
    setIsLoginForm(false);
  };
  const handleClickLoginForm = () => {
    setIsLoginForm(true);
  };
  const loginClassName = isLoginForm ? 'loginWrapper' : 'loginWrapper signUpForm';
  return (
    <div className={loginClassName}>
      <CustomHeader />
      <div className="loginWrapper__img">
        <img className="img-fluid" src={loginImage} alt="login icon" />
      </div>
      <div className="loginWrapper__form">
        <div className="loginWrapper__form-title">
          <h1>{t('DANG_NHAP')}</h1>
        </div>
        <div className="loginWrapper__form-content">
          <LoginForm message={state.message} login={handleLogin} />
          <div className="mx-0 redirect-to justify-content-center">
            <div className="forgot-password">
              <Link to="/" className="text__animation">
                <span className="text-normal">{t('QUEN_MAT_KHAU')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="loginWrapper__introduction ">
        <h5>{t('CHUA_CO_TAI_KHOAN')}</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, unde!</p>
        <button onClick={handleClickRegisterForm}>{t('DANG_KY').toUpperCase()}</button>
      </div>
      <div className="signUpWrapper__img">
        <img className="img-fluid" src={signUpImage} alt="signUp icon" />
      </div>
      <div className="signUpWrapper__form">
        <div className="signUpWrapper__form-title">
          <h1>{t('DANG_KY')}</h1>
        </div>
        <div className="signUpWrapper__form-content">
          <SignUpForm message={state.message} signUp={handleSignUp} />
          <div className="mx-0 redirect-to justify-content-center">
            <div className="forgot-password">
              <Link to="/" className="text__animation">
                <span className="text-normal">{t('QUEN_MAT_KHAU')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="signUpWrapper__introduction ">
        <h5>{t('DA_CO_TAI_KHOAN')}</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, unde!</p>
        <button onClick={handleClickLoginForm}>{t('DANG_NHAP').toUpperCase()}</button>
      </div>
    </div>
  );
};
export default LoginWrapper;
