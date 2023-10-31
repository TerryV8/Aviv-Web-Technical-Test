import React from 'react';

import styles from './input-field.module.scss'; // Assume you have created a separate SCSS file for this component
import InputFieldNumber from './InputFieldNumber';

interface InputFieldProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  type?: 'text' | 'number';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  measure_unit?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  value,
  error,
  type = 'text',
  onChange,
  placeholder,
  measure_unit,
}) => {
  if (type === 'number') {
    return (
      <>
        <InputFieldNumber
          name={name}
          value={value}
          onChange={onChange}
          label={label}
          measure_unit={measure_unit}
        />
        {error !== null && error !== undefined && error.trim() !== '' && (
          <div className={styles['input-field__error']}>⚠ {error}</div>
        )}
      </>
    );
  }

  // By default, when it is a text input
  return (
    <>
      <div className={styles['input-field__input-group']}>
        <label htmlFor={name} className={styles['input-field__input-label']}>
          {label}:
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={styles['input-field__input-text']}
          placeholder={placeholder}
        />
      </div>
      {error !== null && error !== undefined && error !== '' && (
        <div className={styles['input-field__error']}>⚠ {error}</div>
      )}
    </>
  );
};

export default InputField;
