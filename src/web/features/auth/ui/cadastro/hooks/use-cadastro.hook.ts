'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { cadastrarUsuario } from '@/api/features/auth/actions/cadastrar-usuario.action';
import { cadastroSchema, type CadastroSchema } from '@/api/features/auth/schemas/auth.schemas';

export function useCadastro() {
  const router = useRouter();

  const form = useForm<CadastroSchema>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: '', email: '', senha: '', confirmarSenha: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: CadastroSchema) => {
      await cadastrarUsuario(data);
      const resultado = await signIn('credentials', {
        email: data.email,
        senha: data.senha,
        redirect: false,
      });
      if (resultado?.error) throw new Error('Não foi possível entrar após o cadastro');
    },
    onSuccess: () => {
      router.push('/inicio');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || 'Não foi possível concluir seu cadastro');
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, onSubmit, isPending: mutation.isPending };
}
