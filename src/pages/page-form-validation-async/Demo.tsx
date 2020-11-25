import Footer from 'components/footer/Footer';
import React from 'react';
import { withRouter } from 'react-router-dom';
import './Demo.scss';
import DemoForm from './DemoForm';

const Login: React.FC = (props) => {
  return (
    <div className="">
      <div className="login-content">
        <header className="header-login" />
        <div className="mx-auto mt-5 login-content-form">
          <DemoForm message="Demo page" link={props} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withRouter(Login);
