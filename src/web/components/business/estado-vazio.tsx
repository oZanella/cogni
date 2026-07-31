export function EstadoVazio({ mensagem }: { mensagem: string }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center gap-4 rounded-2xl border border-dashed border-border p-6 text-center">
      <div className="flex min-h-0 flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brain-animation.svg" alt="" className="aspect-square h-32 w-auto shrink sm:h-44 md:h-52" />
      </div>
      <p className="max-w-xs shrink-0 text-sm text-muted-foreground">{mensagem}</p>
    </div>
  );
}
