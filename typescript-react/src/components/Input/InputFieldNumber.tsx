import React, { useEffect, useState } from 'react';
import styles from './input-field.module.scss'; // Assume you have created a separate SCSS file for this component

interface InputFieldNumberProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  name: string;
  label: string;
  measure_unit?: string;
}

const InputFieldNumber: React.FC<InputFieldNumberProps> = ({
  onChange,
  value,
  name,
  label,
  measure_unit,
}) => {
  const [displayPriceValue, setDisplayPriceValue] = useState<string>(
    value.toString(),
  );

  useEffect(() => {
    if (label === 'Price') setDisplayPriceValue(formatPriceEuro(Number(value)));
  }, [value, label]);

  const numericValue = typeof value === 'string' ? parseInt(value, 10) : value;

  const increment = (): void => {
    if (!isNaN(numericValue)) {
      const newValue = numericValue + 1;

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      onChange({
        target: { name, value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const decrement = (): void => {
    if (!isNaN(numericValue) && numericValue > 0) {
      const newValue = numericValue - 1;

      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      onChange({
        target: { name, value: newValue.toString() },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  // Add space every 3 digits in the price number to make it more readable in the displayed plage
  const formatPriceEuro = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleInputPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const cleanedValue = e.target.value.replace(/ /g, '');
    if (!isNaN(Number(cleanedValue))) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      onChange({
        target: { name, value: cleanedValue },
      } as React.ChangeEvent<HTMLInputElement>);
      setDisplayPriceValue(formatPriceEuro(Number(cleanedValue)));
    }
  };

  return (
    <div className={styles['input-field__input-number-group']}>
      <label htmlFor={name} className={styles['input-field__input-label']}>
        {label}:
      </label>
      <div className={styles['input-field__input-number-counter-group']}>
        <button
          type="button"
          onClick={decrement}
          className={styles['input-field__input-number-button-minus']}
        >
          -
        </button>

        <input
          type={label === 'Price' ? 'text' : 'number'}
          name={name}
          id={name}
          value={
            label === 'Price' && !isNaN(numericValue)
              ? displayPriceValue
              : value.toString()
          }
          onChange={label === 'Price' ? handleInputPriceChange : onChange}
          className={
            label !== 'Price'
              ? styles['input-field__input-number-text']
              : styles['input-field__input-number-text-exception-price']
          }
        />
        <div className={styles['input-field__input-measure-unit']}>
          {measure_unit}
        </div>
        <button
          type="button"
          onClick={increment}
          className={styles['input-field__input-number-button-plus']}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default InputFieldNumber;
