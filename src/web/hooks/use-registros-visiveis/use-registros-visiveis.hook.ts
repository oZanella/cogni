'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';

export function useRegistrosVisiveis(registros: RegistroPensamento[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const medidorRef = useRef<HTMLDivElement>(null);
  // elemento que também mora dentro do container medido (ex: o botão "Ver histórico") e
  // cujo espaço precisa ser reservado antes de calcular quantos itens cabem
  const reservaRef = useRef<HTMLDivElement>(null);
  const [quantidade, setQuantidade] = useState(registros.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const medidor = medidorRef.current;

    if (!container || !medidor || registros.length === 0) {
      setQuantidade(registros.length);
      return;
    }

    const ajustar = () => {
      // o primeiro filho do medidor é o wrapper da RegistroTimeline; ele também contém os
      // divs espaçadores entre os itens, então pegamos só os links (um por registro, na mesma
      // ordem do mais recente pro mais antigo) para medir a altura real de cada um — cada
      // registro pode ocupar de 1 a 4 linhas (line-clamp-4), então a altura varia bastante
      // item a item e uma média geral do histórico distorceria a conta
      const wrapper = medidor.children[0] as HTMLElement | undefined;
      const itens = wrapper?.querySelectorAll<HTMLElement>(':scope > a');
      if (!wrapper || !itens || itens.length === 0) return;

      const alturaReservada = reservaRef.current?.offsetHeight ?? 0;
      const alturaDisponivel = Math.max(0, container.clientHeight - alturaReservada);

      // mínimo de 3 itens em tela (ou todos, se houver menos de 3 registros no total),
      // mesmo que isso ocupe um pouco mais de espaço do que o disponível
      const minimo = Math.min(3, registros.length);

      let quantidadeQueCabe = 0;
      let alturaAcumulada = 0;
      for (const item of itens) {
        if (alturaAcumulada + item.offsetHeight > alturaDisponivel && quantidadeQueCabe >= minimo) break;
        alturaAcumulada += item.offsetHeight;
        quantidadeQueCabe += 1;
      }

      setQuantidade(Math.min(quantidadeQueCabe, registros.length));
    };

    ajustar();

    const observer = new ResizeObserver(ajustar);
    observer.observe(container);
    return () => observer.disconnect();
  }, [registros]);

  return {
    containerRef,
    medidorRef,
    reservaRef,
    registrosVisiveis: registros.slice(0, quantidade),
  };
}
