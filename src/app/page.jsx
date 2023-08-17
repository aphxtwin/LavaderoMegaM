import React from 'react';
import LoginFormLayout from './components/UI/loginForm/loginLayout';

const LoginForm = React.lazy(() => import('./components/UI/loginForm/loginForm'));

export default function Home() {
  return (
    <LoginFormLayout>
        <LoginForm />
    </LoginFormLayout>

  );
}
