import React, { ReactElement, FunctionComponent } from 'react';
import styles from './CustomInputFields.module.scss';

type Props = {
  fieldType: string;
  name: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  leftIcon?: ReactElement;
  onClickLeftIcon?: () => void;
};

const CustomInputFields: FunctionComponent<Props> = ({
  fieldType,
  name,
  value,
  handleChange,
  placeholder,
  leftIcon,
  onClickLeftIcon,
}) => {
  return (
    <div className={styles.textfieldGroup}>
      {leftIcon && (
        <span
          className={`${styles.icon} cursor-pointer px-3`}
          onClick={onClickLeftIcon && onClickLeftIcon}
        >
          {leftIcon}
        </span>
      )}
      <input
        className="mb-16 text-field block"
        type={fieldType}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInputFields;
