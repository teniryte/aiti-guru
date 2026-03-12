import React, { forwardRef, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../../assets/icon';
import styles from './input.module.scss';

type InputSize = 'normal' | 'big';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  icon?: React.ReactNode;
  isClearable?: boolean;
  size?: InputSize;
  onClear?: () => void;
  isError?: boolean;
  error?: string;
}

type InputActionButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const InputActionButton = ({
  children,
  className,
  type = 'button',
  ...rest
}: InputActionButtonProps) => {
  return (
    <button type={type} className={clsx(styles.inputActionBtn, className)} {...rest}>
      {children}
    </button>
  );
};

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>) {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(value);
        return;
      }

      (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

function isValueEmpty(value: React.InputHTMLAttributes<HTMLInputElement>['value']) {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  return String(value).length === 0;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    type = 'text',
    icon,
    isClearable = false,
    size = 'normal',
    className,
    value,
    defaultValue,
    onChange,
    onClear,
    disabled,
    isError = false,
    error,
    ...rest
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const combinedRef = useMemo(() => mergeRefs(inputRef, ref), [ref]);

  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] =
    useState<React.InputHTMLAttributes<HTMLInputElement>['value']>(defaultValue ?? '');

  const isControlled = value !== undefined;
  const isPassword = type === 'password';

  const currentValue = isControlled ? value ?? '' : internalValue;
  const hasValue = !isValueEmpty(currentValue);

  const canClear = isClearable && hasValue && !disabled;
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const wrapperSizeClass = size === 'big' ? styles.inputWrapperBig : styles.inputWrapperNormal;

  const fieldSizeClass = size === 'big' ? styles.inputFieldBig : styles.inputFieldNormal;
  const hasError = isError || Boolean(error);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(event.target.value);
    }

    onChange?.(event);
  };

  const handleClear = () => {
    const node = inputRef.current;
    if (!node || disabled) return;

    if (!isControlled) {
      setInternalValue('');
    }

    const nativeValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value',
    )?.set;

    nativeValueSetter?.call(node, '');
    node.dispatchEvent(new Event('input', { bubbles: true }));
    node.focus();

    onClear?.();
  };

  const handleTogglePasswordVisibility = () => {
    if (disabled) return;
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.inputRoot}>
      <div
        className={clsx(styles.inputWrapper, wrapperSizeClass, className, {
          [styles.inputWrapperError]: hasError,
        })}
      >
        {icon && <span className={styles.inputIcon}>{icon}</span>}

        <input
          {...rest}
          ref={combinedRef}
          type={resolvedType}
          disabled={disabled}
          className={clsx(styles.inputField, fieldSizeClass)}
          value={currentValue}
          onChange={handleChange}
          aria-invalid={hasError}
        />

        {canClear && (
          <InputActionButton onClick={handleClear} aria-label="Clear input" disabled={disabled}>
            <Icon name="close" width={15} height={16} />
          </InputActionButton>
        )}

        {isPassword && (
          <InputActionButton
            onClick={handleTogglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            disabled={disabled}
          >
            <Icon name={showPassword ? 'eye-on' : 'eye-off'} width={22} height={20} />
          </InputActionButton>
        )}
      </div>

      {error && (
        <span className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});
