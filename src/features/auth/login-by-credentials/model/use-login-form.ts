import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, type LoginFormValues } from './login-form.schema';

export function useLoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    console.log('Login submit:', values);
  });

  return { form, onSubmit };
}
