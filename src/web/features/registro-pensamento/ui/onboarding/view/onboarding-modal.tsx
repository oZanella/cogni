'use client';

import { FileText, History, PenLine } from 'lucide-react';

import { Casulo } from '@/web/components/business/criaturas';
import { Button } from '@/web/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/web/components/ui/dialog';
import { cn } from '@/web/lib/utils';

const ETAPAS = [
  {
    titulo: 'Bem-vindo(a) ao Cogni',
    descricao:
      'Este é o seu espaço para registrar o que você sentiu em momentos eventuais: situações, emoções e a intensidade de cada emoção. Um jeito simples de organizar tudo e compartilhar com quem acompanha seu processo, sem diário de papel ou planilhas.',
    ilustracao: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/brain-animation.svg" alt="" className="size-10" />
    ),
  },
  {
    titulo: 'Registrando um pensamento',
    descricao:
      'Toque em "Novo Pensamento" na tela inicial. Você escolhe se quer descrever a situação com suas palavras ou pular direto para as emoções, depois seleciona como se sentiu e ajusta a intensidade de cada emoção. Ao final, toque em "Concluir registro" para salvar.',
    ilustracao: <PenLine className="size-10 text-primary" strokeWidth={1.5} />,
  },
  {
    titulo: 'Sua transformação',
    descricao:
      'Ao entrar no Cogni, um casulo aparece no canto superior direito e, após um minuto, se transforma em uma borboleta. Essa mudança representa o seu processo contínuo de evolução e autocuidado. O ícone também é funcional: ao clicar nele, você visualiza as informações do seu login e pode sair do site.',
    ilustracao: (
      <div className="flex items-center gap-1">
        <Casulo style={{ height: 24, width: 19 }} />
        <span className="text-xs text-muted-foreground">→</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/butterfly-animation.svg" alt="" height={22} width={22} />
      </div>
    ),
  },
  {
    titulo: 'Seu histórico',
    descricao:
      'A seção "Histórico" reúne todos os seus registros divididos por dia, facilitando o acompanhamento da sua jornada. Sempre que quiser revisitar um momento específico, é só tocar na anotação para visualizar os detalhes. Você tem total liberdade para editar o que escreveu, ajustar a intensidade de uma emoção e salvar as novas alterações na hora.',
    ilustracao: <History className="size-10 text-primary" strokeWidth={1.5} />,
  },
  {
    titulo: 'Relatório para compartilhar',
    descricao:
      'Na tela "Relatório", escolha um período e gere um PDF com todos os seus registros, deixando tudo pronto para compartilhar com o profissional que lhe acompanha.',
    ilustracao: <FileText className="size-10 text-primary" strokeWidth={1.5} />,
  },
];

type OnboardingModalProps = {
  aberto: boolean;
  etapa: number;
  ehUltimaEtapa: boolean;
  avancar: () => void;
  pular: () => void;
  onOpenChange: (valor: boolean) => void;
};

export function OnboardingModal({ aberto, etapa, ehUltimaEtapa, avancar, pular, onOpenChange }: OnboardingModalProps) {
  const conteudo = ETAPAS[etapa];

  return (
    <Dialog open={aberto} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(22rem,calc(100%-2rem))] sm:max-w-none md:p-6">
        <div className="flex shrink-0 items-center justify-center py-2">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary">
            {conteudo.ilustracao}
          </div>
        </div>

        <DialogHeader className="min-h-44 justify-center">
          <DialogTitle className="text-center md:text-lg">{conteudo.titulo}</DialogTitle>
          <DialogDescription className="text-center md:text-base">{conteudo.descricao}</DialogDescription>
        </DialogHeader>

        <div className="flex shrink-0 items-center justify-center gap-1.5">
          {ETAPAS.map((item, indice) => (
            <span
              key={item.titulo}
              className={cn('size-1.5 shrink-0 rounded-full bg-border', indice === etapa && 'bg-primary')}
            />
          ))}
        </div>

        <DialogFooter className="shrink-0 items-center sm:justify-between md:-mx-6 md:-mb-6 md:p-6">
          <Button type="button" variant="ghost" onClick={pular}>
            Pular apresentação
          </Button>
          <Button type="button" className="w-28" onClick={avancar}>
            {ehUltimaEtapa ? 'Começar' : 'Próximo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
