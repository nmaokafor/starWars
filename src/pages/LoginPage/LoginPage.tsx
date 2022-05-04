import AuthLayout from '../../layouts/AuthLayout';
import Login from './Login';

const LoginParent = () => {
  return (
    <>
      <AuthLayout>
        <Login />
      </AuthLayout>
    </>
  );
};

export default LoginParent;
