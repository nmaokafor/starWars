import { useNavigate } from 'react-router-dom';
import Button from '../../CustomElements/CustomButton/CustomButton';

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    localStorage.removeItem('isUserAuthenticated');
    navigate('/');
  };
  return (
    <div>
      <Button onClick={handleClick}>Logout</Button>
    </div>
  );
};

export default Logout;
