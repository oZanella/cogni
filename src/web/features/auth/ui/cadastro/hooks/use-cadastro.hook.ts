'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { cadastrarUsuario } from '@/api/features/auth/actions/cadastrar-usuario.action';
import { cadastroSchema, type CadastroSchema } from '@/api/features/auth/schemas/auth.schemas';
import { CHAVE_LOGIN_TIMESTAMP } from '@/web/hooks/use-transformacao-borboleta/use-transformacao-borboleta.hook';

export function useCadastro() {
  const router = useRouter();
  const [redirecionando, setRedirecionando] = useState(false);

  const form = useForm<CadastroSchema>({
    resolver: zodResolver(cadastroSchema),
    defaultValues: { nome: '', nomeUsuario: '', email: '', senha: '', confirmarSenha: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: CadastroSchema) => {
      await cadastrarUsuario(data);
      const resultado = await signIn('credentials', {
        nomeUsuario: data.nomeUsuario,
        senha: data.senha,
        redirect: false,
      });
      if (resultado?.error) throw new Error('Não foi possível entrar após o cadastro');
    },
    onSuccess: () => {
      setRedirecionando(true);
      localStorage.setItem(CHAVE_LOGIN_TIMESTAMP, String(Date.now()));
      router.push('/inicio');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message || 'Não foi possível concluir seu cadastro');
    },
  });

  const onSubmit = form.handleSubmit((data) => mutation.mutate(data));

  return { form, onSubmit, isPending: mutation.isPending || redirecionando };
}
