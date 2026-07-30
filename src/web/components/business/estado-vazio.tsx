'use client';

import Lottie from 'lottie-react';

import borboletaRoxa from '@/web/assets/lottie/borboleta-roxa.json';

export function EstadoVazio({ mensagem }: { mensagem: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border p-6 text-center">
      <Lottie animationData={borboletaRoxa} loop className="aspect-7/10 w-full max-w-72" />
      <p className="text-sm text-muted-foreground">{mensagem}</p>
    </div>
  );
}
