import Button from '../../components/CustomElements/CustomButton/CustomButton';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/view-star-wars-universe');
  };
  return (
    <div className="stars-background d-flex flex-column justify-center align-center fill-height">
      <h1 className="text-h1 mb-24">404</h1>

      <Button text onClick={handleClick}>
        Take me Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
