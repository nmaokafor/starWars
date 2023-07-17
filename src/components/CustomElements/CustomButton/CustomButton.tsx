import Spinner from '../../Spinner/Spinner';
import styles from './CustomButton.module.scss';

type Props = {
  children: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
  text?: boolean;
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
};
const Button = (props: Props) => {
  const { children, onClick, disabled, text, loading, type } = props;

  return (
    <button
      className={`${styles.button}
        ${text ? styles.text : ''}
        ${disabled ? styles.disabled : ''} 
        text-button`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;
