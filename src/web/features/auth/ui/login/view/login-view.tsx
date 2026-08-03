'use client';

import Link from 'next/link';

import { Lagarta } from '@/web/components/business/criaturas';
import { Button } from '@/web/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/web/components/ui/card';
import { FloatingLabelInput } from '@/web/components/ui/floating-label-input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/web/components/ui/form';
import { useLogin } from '@/web/features/auth/ui/login/hooks/use-login.hook';

export function LoginView() {
  const { form, onSubmit, isPending } = useLogin();

  return (
    <Card className="w-full max-w-sm border-none shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-medium">Bem-vindo ao Cogni</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="nomeUsuario"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FloatingLabelInput label="Nome de usuário" autoComplete="username" {...field} />
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
                    <FloatingLabelInput label="Senha" type="password" autoComplete="current-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="mt-2 h-11 disabled:opacity-100" disabled={isPending}>
              {isPending ? <Lagarta color="oklch(0.88 0.1 148)" style={{ height: 20, width: 56 }} /> : 'Entrar'}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Ainda não tem conta?{' '}
          <Link href="/cadastro" className="text-primary underline underline-offset-4">
            Cadastre-se
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
