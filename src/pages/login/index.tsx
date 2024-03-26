import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Form } from 'antd';
// import logoImg from '../../assets/images/logo.png';
import Input from '../../components/inputField/index.tsx';
import PasswordField from '../../components/passwordField/index.tsx';
import Button from '../../components/button/index.tsx';
// import Checkbox from '../../components/checkbox/index.tsx';

import useNotification from '../../hooks/useNotification.ts';
import { loginAction } from '../../redux/actions/authActions.ts';
import { setError } from '../../redux/slices/authSlice.ts';
import { useSelector, AppState } from '../../redux/store.ts';

// import bgVector from '../../assets/images/loginBG.png';

import './loginStyle.scss';

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const error = useSelector((state: AppState) => state.auth.error);
  const { openNotificationWithIcon, contextHolder } = useNotification();

  const handleCloseNotification = (): void => {
    setError(null);
  };

  useEffect(() => {
    if (error) {
      openNotificationWithIcon({
        type: 'error',
        message: error.message,
        description: '',
        onClose: handleCloseNotification,
      });
    }
  }, [error, openNotificationWithIcon]);

  const onSubmit = (data: LoginFormData): void => {
    const { username, password } = data;
    loginAction(username, password, navigate);
  };

  return (
    <div className="w-full h-screen login-main">
      {contextHolder}
      <div className="flex h-full bg-primary-20">
        <div className="w-full flex items-center justify-center">
          <div className="max-w-[1200px] overflow-hidden shadow-[0px_0px_20px_-11px_rgba(255,173,144,1)] flex rounded-2xl border border-primary-30">
            {/* <div className="w-[62%] bg-primary-80 p-12 left-area relative">
              <h3 className="text-white mt-12 text-[35px] text-center font-semibold">Welcome to the website</h3>
              <p className="mt-10 text-white px-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit earum quis pariatur voluptatum illum fugiat
                eaque, dolorem ullam facilis libero officia ipsa, amet praesentium veritatis, commodi rerum similique
                quibusdam sint.
              </p>
              <div className="w-full absolute bottom-0 h-36 z-0 left-0">
                <img className="w-full h-full" src={bgVector} alt="bg" />
              </div>
            </div> */}
            <div className="bg-white py-12 px-10 flex flex-col justify-center">
              {/* <div className="mb-20 flex justify-center">
              <img className="w-[180px]" src={logoImg} alt="logo" />
            </div> */}
              <div className="mb-8">
                <h3 className="text-[24px] mb-2 text-primary font-semibold">Login</h3>
                <p className="text-[15px] text-gray-60">Please enter your credentials to sign in!</p>
              </div>
              <div className="space-y-5">
                <Form onFinish={onSubmit} layout="vertical">
                  <Form.Item
                    label=""
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                  >
                    <Input label="User name" placeholder="User name" name="username" />
                  </Form.Item>
                  <Form.Item
                    label=""
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                  >
                    <PasswordField label="Password" placeholder="Password" name="password" />
                  </Form.Item>
                  {/* <div className="flex items-center justify-between">
                <Checkbox>Remember Me</Checkbox>
                <Button type="link" className="!px-0 !font-medium">
                  Forgot Password?
                </Button>
              </div> */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full !font-semibold !text-sm !py-2 mt-2"
                  >
                    Sign In
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
