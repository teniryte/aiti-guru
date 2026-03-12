import { Controller } from 'react-hook-form';
import { Logo } from '@/shared/ui/logo';
import { Field } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Icon } from '@/shared/assets/icon';
import { useLoginForm } from '../model/use-login-form';
import styles from './login-form.module.scss';

export function LoginForm() {
  const { form, onSubmit, isPending } = useLoginForm();
  const {
    control,
    register,
    formState: { errors },
  } = form;
  const hasAuthError = Boolean(errors.root?.message);

  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <Logo />

        <div className={styles.header}>
          <h1 className={styles.title}>Добро пожаловать!</h1>
          <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.fields}>
            <Field label="Логин" size="big">
              <Input
                {...register('login')}
                size="big"
                isError={hasAuthError}
                error={errors.login?.message}
                isClearable
                icon={<Icon name="person" width={24} height={24} />}
                placeholder="Введите логин"
                autoComplete="username"
              />
            </Field>

            <Field label="Пароль" size="big">
              <Input
                {...register('password')}
                type="password"
                size="big"
                isError={hasAuthError}
                error={errors.password?.message ?? (hasAuthError ? 'Неверный логин или пароль' : undefined)}
                icon={<Icon name="lock" width={24} height={24} />}
                placeholder="Введите пароль"
                autoComplete="current-password"
              />
            </Field>
          </div>

          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <Checkbox value={field.value} onChange={field.onChange} label="Запомнить данные" />
            )}
          />

          <div className={styles.actions}>
            <Button type="submit" size="big" isBlock isLoading={isPending}>
              Войти
            </Button>

            <div className={styles.orDivider}>
              <span className={styles.orLine} />
              <span className={styles.orText}>или</span>
              <span className={styles.orLine} />
            </div>
          </div>
        </form>

        <p className={styles.signupText}>
          Нет аккаунта?{' '}
          <a href="#" className={styles.signupLink}>
            Создать
          </a>
        </p>
      </div>
    </div>
  );
}
