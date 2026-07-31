'use client';

import { useEffect, useState } from 'react';

export const CHAVE_LOGIN_TIMESTAMP = 'cogni-login-timestamp';

const DURACAO_CASULO_MS = 60_000;

type EstagioTransformacao = 'casulo' | 'borboleta' | null;

function calcularEstagio(timestamp: number): EstagioTransformacao {
  const decorrido = Date.now() - timestamp;
  if (decorrido < DURACAO_CASULO_MS) return 'casulo';
  return 'borboleta';
}

export function useTransformacaoBorboleta() {
  const [estagio, setEstagio] = useState<EstagioTransformacao>(null);

  useEffect(() => {
    const timestamp = Number(localStorage.getItem(CHAVE_LOGIN_TIMESTAMP));
    if (!timestamp) return;

    setEstagio(calcularEstagio(timestamp));

    const intervalo = setInterval(() => {
      const novoEstagio = calcularEstagio(timestamp);
      setEstagio(novoEstagio);
      if (novoEstagio === 'borboleta') clearInterval(intervalo);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return estagio;
}
