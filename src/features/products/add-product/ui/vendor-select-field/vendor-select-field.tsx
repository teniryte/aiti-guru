import { useMemo } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useVendorOptionsStore } from '../../model/vendor-options.store';
import styles from './vendor-select-field.module.scss';
import clsx from 'clsx';

type VendorOption = {
  label: string;
  value: string;
};

type VendorSelectFieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

const selectClassNames = {
  ...Object.fromEntries(Object.entries(styles).map(([key, value]) => [key, () => value])),
  option: (state: { isSelected: boolean; isFocused: boolean }) =>
    clsx(
      styles.option,
      state.isSelected && styles.optionSelected,
      state.isFocused && styles.optionFocused,
    ),
};

export function VendorSelectField({
  value,
  onChange,
  error,
  disabled,
  placeholder = 'Выберите или введите вендора',
  className,
}: VendorSelectFieldProps) {
  const localOptions = useVendorOptionsStore((state) => state.options);
  const addOption = useVendorOptionsStore((state) => state.addOption);

  const options = useMemo<VendorOption[]>(() => {
    const unique = [...new Set([...localOptions])];

    return unique
      .sort((a, b) => a.localeCompare(b))
      .map((item) => ({
        label: item,
        value: item,
      }));
  }, [localOptions]);

  const selectedOption =
    options.find((option) => option.value === value) ??
    (value
      ? {
          label: value,
          value,
        }
      : null);

  return (
    <div
      className={`${styles.wrapper} ${error ? styles.wrapperError : ''} ${className ?? ''}`}
      data-disabled={disabled ? '' : undefined}
    >
      <CreatableSelect<VendorOption, false>
        unstyled
        classNamePrefix="vendorSelect"
        classNames={selectClassNames}
        isClearable
        isDisabled={disabled}
        options={options}
        value={selectedOption}
        placeholder={placeholder}
        onChange={(option) => {
          onChange(option?.value ?? '');
        }}
        onCreateOption={(inputValue) => {
          const nextValue = inputValue.trim();
          if (!nextValue) return;

          addOption(nextValue);
          onChange(nextValue);
        }}
        formatCreateLabel={(inputValue) => `Создать "${inputValue}"`}
        noOptionsMessage={() => 'Ничего не найдено'}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'vendor-select-error' : undefined}
      />
      {error && (
        <span id="vendor-select-error" className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
