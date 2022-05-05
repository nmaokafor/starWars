import Spinner from '../../Spinner/Spinner';
import styles from './CustomButton.module.scss';

const Button = (props: any) => {
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
