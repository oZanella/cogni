'use client';

import { useEffect, useState } from 'react';

export const CHAVE_ONBOARDING_VISTO = 'cogni-onboarding-visto';

export const TOTAL_ETAPAS_ONBOARDING = 5;

export function useOnboarding() {
  const [aberto, setAberto] = useState(false);
  const [etapa, setEtapa] = useState(0);

  useEffect(() => {
    const jaViu = localStorage.getItem(CHAVE_ONBOARDING_VISTO);
    if (!jaViu) setAberto(true);
  }, []);

  function finalizar() {
    localStorage.setItem(CHAVE_ONBOARDING_VISTO, '1');
    setAberto(false);
  }

  function avancar() {
    if (etapa >= TOTAL_ETAPAS_ONBOARDING - 1) {
      finalizar();
      return;
    }
    setEtapa((atual) => atual + 1);
  }

  function onOpenChange(valor: boolean) {
    if (!valor) {
      finalizar();
      return;
    }
    setAberto(valor);
  }

  function abrir() {
    setEtapa(0);
    setAberto(true);
  }

  return {
    aberto,
    etapa,
    ehUltimaEtapa: etapa === TOTAL_ETAPAS_ONBOARDING - 1,
    avancar,
    pular: finalizar,
    onOpenChange,
    abrir,
  };
}
