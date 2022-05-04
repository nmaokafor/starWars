import styles from './CustomButton.module.scss';

const Button = (props: any) => {
  const { children, onClick, disabled } = props;

  return (
    <button
      className={`${styles.button} text-button`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
