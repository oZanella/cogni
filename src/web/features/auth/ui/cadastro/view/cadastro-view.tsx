'use client';

import Link from 'next/link';

import { Button } from '@/web/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/web/components/ui/card';
import { FloatingLabelInput } from '@/web/components/ui/floating-label-input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/web/components/ui/form';
import { useCadastro } from '@/web/features/auth/ui/cadastro/hooks/use-cadastro.hook';

export function CadastroView() {
  const { form, onSubmit, isPending } = useCadastro();

  return (
    <Card className="w-full max-w-sm border-none shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">Criar conta</CardTitle>
        <CardDescription>Analise seu progresso com um profissional</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput label="Nome" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput label="E-mail" type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput label="Senha" type="password" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmarSenha"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput
                      label="Confirmar senha"
                      type="password"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="mt-2 h-11 disabled:opacity-100" disabled={isPending}>
              {isPending ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem conta?{' '}
          <Link href="/entrar" className="text-primary underline underline-offset-4">
            Entrar
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
