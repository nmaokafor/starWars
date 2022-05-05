import Spinner from '../../Spinner/Spinner';
import styles from './CustomButton.module.scss';

type Props = {
  children: string;
  onClick: any;
  disabled?: boolean;
  text?: boolean;
  loading?: boolean;
};
const Button = (props: Props) => {
  const { children, onClick, disabled, text, loading } = props;

  return (
    <button
      className={`${styles.button}
        ${text ? styles.text : ''}
        ${disabled ? styles.disabled : ''} 
        text-button`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
