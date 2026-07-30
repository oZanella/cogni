'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { loginSchema, type LoginSchema } from '@/api/features/auth/schemas/auth.schemas';

export function useLogin() {
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', senha: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const resultado = await signIn('credentials', {
        email: data.email,
        senha: data.senha,
        redirect: false,
      });
      if (resultado?.error) throw new Error('E-mail ou senha inválidos');
    },
    onSuccess: () => {
      router.push('/inicio');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || 'Não foi possível entrar');
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, onSubmit, isPending: mutation.isPending };
}
