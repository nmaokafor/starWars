import { useNavigate } from 'react-router-dom';
import Button from '../../CustomElements/CustomButton/CustomButton';

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    localStorage.removeItem('userName');
    navigate('/');
  };
  return (
    <div className="pa-16 text-right">
      <Button text onClick={handleClick}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
