import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { authQueries } from '@/entities/session/api/auth.queries';
import { saveSessionTokens } from '@/entities/session/lib/token-storage';
import { loginMutation } from '../api/login.mutation';
import { mapLoginError } from './map-login-error';
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

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(loginMutation);
  const loginValue = form.watch('login');
  const passwordValue = form.watch('password');

  useEffect(() => {
    if (form.formState.errors.root?.message) {
      form.clearErrors('root');
    }
  }, [form, loginValue, passwordValue]);

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const result = await mutation.mutateAsync({
        username: values.login,
        password: values.password,
      });
      saveSessionTokens(
        { accessToken: result.accessToken, refreshToken: result.refreshToken },
        values.rememberMe ?? false,
      );
      await queryClient.fetchQuery(authQueries.me());
      navigate({ to: '/products', replace: true });
    } catch (error) {
      form.setError('root', { message: mapLoginError(error) });
    }
  });

  return { form, onSubmit, isPending: mutation.isPending };
}
