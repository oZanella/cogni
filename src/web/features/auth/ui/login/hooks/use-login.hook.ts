'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { loginSchema, type LoginSchema } from '@/api/features/auth/schemas/auth.schemas';
import { CHAVE_LOGIN_TIMESTAMP } from '@/web/hooks/use-transformacao-borboleta/use-transformacao-borboleta.hook';

export function useLogin() {
  const router = useRouter();
  const [redirecionando, setRedirecionando] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', senha: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const inicio = Date.now();

      const resultado = await signIn('credentials', {
        email: data.email,
        senha: data.senha,
        redirect: false,
      });
      if (resultado?.error) throw new Error('E-mail ou senha inválidos');

      // segura a resposta por um tempo mínimo pra dar tempo da animação da lagarta aparecer
      const restante = 1500 - (Date.now() - inicio);
      if (restante > 0) await new Promise((resolve) => setTimeout(resolve, restante));
    },
    onSuccess: () => {
      setRedirecionando(true);
      localStorage.setItem(CHAVE_LOGIN_TIMESTAMP, String(Date.now()));
      router.push('/inicio');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || 'Não foi possível entrar');
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, onSubmit, isPending: mutation.isPending || redirecionando };
}
