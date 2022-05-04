import { Outlet } from 'react-router-dom';
import Logout from '../../components/Shared/Logout/Logout';
import '../../App.scss';

const MainNavigation = () => {
  return (
    <div>
      <Logout />
      <Outlet />
    </div>
  );
};

export default MainNavigation;
