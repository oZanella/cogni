'use client';

import { useLayoutEffect, useRef, useState } from 'react';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';

export function useRegistrosVisiveis(registros: RegistroPensamento[]) {
  const containerRef = useRef<HTMLDivElement>(null);
  const medidorRef = useRef<HTMLDivElement>(null);
  const [quantidade, setQuantidade] = useState(registros.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const medidor = medidorRef.current;

    if (!container || !medidor || registros.length === 0) {
      setQuantidade(registros.length);
      return;
    }

    const ajustar = () => {
      // o primeiro filho do medidor é o wrapper da RegistroTimeline com todos os itens
      // medimos a altura média (não só do primeiro) porque cada item pode ocupar 1 ou 2
      // linhas (line-clamp-2), então a altura não é perfeitamente uniforme
      const wrapper = medidor.children[0] as HTMLElement | undefined;
      if (!wrapper || wrapper.children.length === 0) return;

      const alturaMedia = wrapper.offsetHeight / wrapper.children.length;
      if (alturaMedia === 0) return;

      const quantidadeQueCabe = Math.max(1, Math.floor(container.clientHeight / alturaMedia));
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
    registrosVisiveis: registros.slice(0, quantidade),
  };
}
