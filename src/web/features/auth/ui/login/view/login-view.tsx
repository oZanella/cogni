'use client';

import Link from 'next/link';

import { Button } from '@/web/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/web/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/web/components/ui/form';
import { Input } from '@/web/components/ui/input';
import { useLogin } from '@/web/features/auth/ui/login/hooks/use-login.hook';

export function LoginView() {
  const { form, onSubmit, isPending } = useLogin();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6 py-12">
      <Card className="w-full max-w-sm border-none shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-medium">Bem-vindo de volta</CardTitle>
          <CardDescription>Entre para continuar seus registros</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" placeholder="voce@exemplo.com" {...field} />
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg" className="mt-2 h-11" disabled={isPending}>
                {isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{' '}
            <Link href="/cadastro" className="text-primary underline underline-offset-4">
              Criar conta
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
