import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PropsChildren {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: PropsChildren) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('userName')) {
      navigate('/');
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);
  return (
    <>
      <div className="stars-background">{children}</div>
    </>
  );
};

export default DefaultLayout;
