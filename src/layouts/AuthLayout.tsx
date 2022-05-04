import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <div className="row fill-height">
        <div className="col-6 fill-height">
          <div className="fill-height d-flex flex-column justify-center mx-auto mw-400 px-24">
            {children}
          </div>
        </div>
        <div className="col-6 auth-image"></div>
      </div>
    </>
  );
};

export default AuthLayout;
