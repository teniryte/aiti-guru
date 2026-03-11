import * as Slider from '@radix-ui/react-slider';
import clsx from 'clsx';

import styles from './number-slider.module.scss';

type NumberSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Шаг делений на треке (например 1 — метки 0, 1, 2, …). Не задано — деления не показываются. */
  tickStep?: number;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

function normalizeByStep(value: number, step: number): number {
  return Math.round(value / step) * step;
}

function getDecimalPlaces(step: number): number {
  const s = String(step);
  const dot = s.indexOf('.');
  return dot === -1 ? 0 : s.length - dot - 1;
}

function getTickValues(min: number, max: number, tickStep: number): number[] {
  const values: number[] = [];
  for (let v = min; v <= max; v += tickStep) {
    values.push(v);
  }
  return values;
}

export function NumberSlider({
  value,
  onChange,
  min = 0,
  max = 5,
  step = 0.1,
  tickStep,
  disabled = false,
  className,
  ariaLabel = 'Number slider',
}: NumberSliderProps) {
  const clampedValue = Math.max(min, Math.min(max, value));
  const displayValue = clampedValue.toFixed(getDecimalPlaces(step));
  const tickValues = tickStep != null ? getTickValues(min, max, tickStep) : [];

  const handleValueChange = (values: number[]) => {
    const raw = values[0] ?? min;
    onChange(normalizeByStep(Math.max(min, Math.min(max, raw)), step));
  };

  return (
    <div className={clsx(styles.root, className)}>
      <Slider.Root
        className={styles.slider}
        min={min}
        max={max}
        step={step}
        value={[clampedValue]}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <div className={styles.trackWrapper}>
          {tickValues.length > 0 && (
            <div className={styles.ticks} aria-hidden>
              {tickValues.map((tick) => (
                <span
                  key={tick}
                  className={styles.tick}
                  style={{
                    left: `${((tick - min) / (max - min)) * 100}%`,
                  }}
                />
              ))}
            </div>
          )}
          <Slider.Track className={styles.track}>
            <Slider.Range className={styles.range} />
          </Slider.Track>
        </div>
        <Slider.Thumb className={styles.thumb} aria-label={ariaLabel} />
      </Slider.Root>
      <div className={styles.value} aria-hidden>
        {displayValue}
      </div>
    </div>
  );
}
