import React from 'react';
import clsx from 'clsx';
import styles from './checkbox.module.scss';

interface CheckboxProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const Checkbox = ({ value, onChange, label, disabled, className }: CheckboxProps) => {
  return (
    <label
      className={clsx(styles.checkbox, disabled && styles.checkboxDisabled, className)}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={!!value}
        disabled={disabled}
        onChange={(event) => {
          if (disabled) return;
          onChange?.(event.target.checked);
        }}
      />
      <span
        className={clsx(styles.box, value && styles.boxChecked)}
        aria-hidden="true"
      >
        {value && (
          <svg
            width="14"
            height="11"
            viewBox="0 0 14 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L5.5 9.5L13 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};
