import { LoginForm } from '@/features/auth/login-by-credentials';
import styles from './login-page.module.scss';

export function LoginPage() {
  return (
    <main className={styles.page}>
      <LoginForm />
    </main>
  );
}
