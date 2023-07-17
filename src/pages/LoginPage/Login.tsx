import React, { useState, useCallback, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/CustomElements/CustomButton/CustomButton';
import CustomInputFields from '../../components/CustomElements/CustomInputFields';
import { useLogin } from '../../hooks/queries/useLogin';

import styles from './LoginPage.module.scss';

type Result = {
  name: string;
  birth_year: string;
};

type LoginQueryProps = Array<Result>;

const Login = () => {
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [validForm, setValidForm] = useState(false);
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formValues;
  const { data, isLoading, refetch } = useLogin({ username });

  useEffect(() => {
    if (formValues.username && formValues.password) {
      setValidForm(true);
    }
  }, [formValues]);

  const authenticateUser = useCallback(
    (loginDetails: LoginQueryProps) => {
      const findValidLoginDetails = loginDetails.find(
        (details: Result) =>
          details.name.toLowerCase() === formValues.username.toLowerCase() &&
          details.birth_year === formValues.password,
      );

      if (findValidLoginDetails) {
        localStorage.setItem('userName', formValues.username);
        navigate('/view-star-wars-universe');
      } else {
        setLoginErrorMessage(
          'The combination of username and password is wrong',
        );
      }
    },
    [formValues, navigate],
  );

  useEffect(() => {
    if (data?.results?.length) {
      const loginDetails = data?.results;
      authenticateUser(loginDetails);
    }

    if (formSubmitted && data?.results?.length === 0) {
      setLoginErrorMessage('The combination of username and password is wrong');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSubmitted, data]);

  const togglePasswordField = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType('password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginErrorMessage('');
    setFormSubmitted(false);
    setFormValues((formValues) => ({
      ...formValues,
      [name]: value,
    }));

    return;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true);
    refetch();
    return;
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1 className="text-h1 mb-16">Login</h1>

      {loginErrorMessage && (
        <p className={`text-caption mb-8 ${styles.error}`}>
          {loginErrorMessage}
        </p>
      )}
      <CustomInputFields
        fieldType="text"
        name="username"
        value={username}
        handleChange={handleChange}
        placeholder="Luke Skywalker"
        leftIcon={<i className="ri-user-fill ri-lg"></i>}
      />
      <CustomInputFields
        fieldType={passwordType}
        name="password"
        value={password}
        handleChange={handleChange}
        placeholder="********"
        leftIcon={
          passwordType === 'password' ? (
            <i className="ri-lock-line ri-lg"></i>
          ) : (
            <i className="ri-lock-unlock-line ri-lg"></i>
          )
        }
        onClickLeftIcon={togglePasswordField}
      />
      <Button type="submit" loading={isLoading} disabled={!validForm}>
        Submit
      </Button>
    </form>
  );
};

export default Login;
