import { Outlet } from 'react-router-dom';
import Logout from '../../components/Shared/Logout/Logout';
import '../../App.scss';
import DefaultLayout from '../../layouts/DefaultLayout';

const MainNavigation = () => {
  return (
    <DefaultLayout>
      <Logout />
      <Outlet />
    </DefaultLayout>
  );
};

export default MainNavigation;
