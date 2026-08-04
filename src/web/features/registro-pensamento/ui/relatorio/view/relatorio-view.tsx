'use client';

import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/web/components/ui/button';
import { Calendar } from '@/web/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/web/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/web/components/ui/popover';
import { useRelatorio } from '@/web/features/registro-pensamento/ui/relatorio/hooks/use-relatorio.hook';
import { cn } from '@/web/lib/utils';

export function RelatorioView() {
  const { form, gerarRelatorio, isPending } = useRelatorio();
  const [dataInicioAberta, setDataInicioAberta] = useState(false);
  const [dataFimAberta, setDataFimAberta] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 pt-6 pb-6 md:max-w-2xl">
      <div>
        <h1 className="text-2xl font-medium text-foreground">Relatório</h1>
        <p className="text-sm text-muted-foreground">
          Escolha um período para exportar seus pensamentos registrados em PDF.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={gerarRelatorio} className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <FormField
              control={form.control}
              name="dataInicio"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 md:flex-1">
                  <Popover open={dataInicioAberta} onOpenChange={setDataInicioAberta}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            'h-11 w-full cursor-pointer justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="size-4" />
                          {field.value
                            ? format(parse(field.value, 'yyyy-MM-dd', new Date()), "d 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })
                            : 'Data início'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={field.value ? parse(field.value, 'yyyy-MM-dd', new Date()) : undefined}
                        onSelect={(data) => {
                          field.onChange(data ? format(data, 'yyyy-MM-dd') : '');
                          setDataInicioAberta(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataFim"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 md:flex-1">
                  <Popover open={dataFimAberta} onOpenChange={setDataFimAberta}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            'h-11 w-full cursor-pointer justify-start text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="size-4" />
                          {field.value
                            ? format(parse(field.value, 'yyyy-MM-dd', new Date()), "d 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })
                            : 'Data fim'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={field.value ? parse(field.value, 'yyyy-MM-dd', new Date()) : undefined}
                        onSelect={(data) => {
                          field.onChange(data ? format(data, 'yyyy-MM-dd') : '');
                          setDataFimAberta(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" size="lg" className="mt-2 h-11 cursor-pointer" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Gerar relatório'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
