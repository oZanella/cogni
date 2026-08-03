'use client';

import { differenceInCalendarDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { UsuarioAdmin } from '@/api/features/controle-usuarios/types/controle-usuarios.types';
import { PapelUsuario } from '@/api/shared/enums/papel-usuario';
import { Badge } from '@/web/components/ui/badge';
import { Button } from '@/web/components/ui/button';
import { Card, CardContent } from '@/web/components/ui/card';
import { Input } from '@/web/components/ui/input';
import { Switch } from '@/web/components/ui/switch';
import { useControleUsuarios } from '@/web/features/controle-usuarios/ui/lista/hooks/use-controle-usuarios.hook';

function formatarData(data: Date) {
  return format(data, "d 'de' MMM 'de' yyyy", { locale: ptBR });
}

function StatusAcesso({ acessoExpiraEm, ilimitado }: { acessoExpiraEm: Date | null; ilimitado: boolean }) {
  if (ilimitado) {
    return <span className="text-xs text-muted-foreground">Sem limite de acesso</span>;
  }

  if (!acessoExpiraEm) {
    return <span className="text-xs text-muted-foreground">Defina os dias</span>;
  }

  const diasRestantes = differenceInCalendarDays(acessoExpiraEm, new Date());

  if (diasRestantes < 0) {
    return <Badge variant="destructive">Expirado em {formatarData(acessoExpiraEm)}</Badge>;
  }

  return (
    <span className="text-xs text-muted-foreground">
      {diasRestantes === 0 ? 'Expira hoje' : `${diasRestantes} ${diasRestantes === 1 ? 'dia' : 'dias'} restantes`}
    </span>
  );
}

function LinhaUsuario({
  usuario,
  pendente,
  onDefinirDias,
  onRemoverLimite,
}: {
  usuario: UsuarioAdmin;
  pendente: boolean;
  onDefinirDias: (dias: number) => void;
  onRemoverLimite: () => void;
}) {
  const ehAdmin = usuario.papel === PapelUsuario.ADMIN;
  const [ilimitado, setIlimitado] = useState(!usuario.acessoExpiraEm);
  const [dias, setDias] = useState('');

  useEffect(() => {
    setIlimitado(!usuario.acessoExpiraEm);
  }, [usuario.acessoExpiraEm]);

  const confirmarDias = () => {
    const valor = Number(dias);
    if (!valor || valor <= 0) return;
    onDefinirDias(valor);
    setDias('');
  };

  const alternarIlimitado = (marcado: boolean) => {
    setIlimitado(marcado);
    if (marcado) onRemoverLimite();
  };

  return (
    <Card className="border-none bg-card shadow-sm">
      <CardContent className="flex flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {usuario.nome} <span className="font-normal text-muted-foreground">@{usuario.nomeUsuario}</span>
            </p>
            <p className="truncate text-xs text-muted-foreground">{usuario.email}</p>
          </div>
          {ehAdmin && (
            <Badge variant="default" className="shrink-0">
              Administrador
            </Badge>
          )}
        </div>

        {!ehAdmin && (
          <div className="flex items-center justify-between gap-2 border-t border-border pt-2">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <Switch size="sm" checked={ilimitado} onCheckedChange={alternarIlimitado} disabled={pendente} />
              Ilimitado
            </label>

            <StatusAcesso acessoExpiraEm={usuario.acessoExpiraEm} ilimitado={ilimitado} />
          </div>
        )}

        {!ehAdmin && !ilimitado && (
          <div className="flex items-center gap-1.5">
            <Input
              type="text"
              inputMode="numeric"
              placeholder="dias"
              value={dias}
              onChange={(event) => setDias(event.target.value.replace(/\D/g, ''))}
              className="h-6 w-12 px-1.5 text-center text-xs"
              disabled={pendente}
            />
            <Button type="button" size="xs" onClick={confirmarDias} disabled={pendente || !dias}>
              Definir
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ControleUsuariosView() {
  const {
    usuariosPaginados,
    isLoading,
    definirDiasAcesso,
    removerLimiteAcesso,
    usuarioPendente,
    busca,
    alterarBusca,
    pagina,
    totalPaginas,
    proximaPagina,
    paginaAnterior,
  } = useControleUsuarios();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 px-6 pt-6 pb-6 md:max-w-xl">
      <div>
        <h1 className="text-xl font-medium text-foreground">Controle de usuários</h1>
        <p className="text-sm text-muted-foreground">Defina por quantos dias cada usuário terá acesso ao Cogni.</p>
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar por nome ou e-mail"
          value={busca}
          onChange={(event) => alterarBusca(event.target.value)}
          className="h-9 pl-8"
        />
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Carregando usuários...</p>}

      {!isLoading && usuariosPaginados.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhum usuário encontrado.</p>
      )}

      <div className="flex flex-col gap-1.5">
        {usuariosPaginados.map((usuario) => (
          <LinhaUsuario
            key={usuario.id}
            usuario={usuario}
            pendente={usuarioPendente === usuario.id}
            onDefinirDias={(dias) => definirDiasAcesso(usuario.id, dias)}
            onRemoverLimite={() => removerLimiteAcesso(usuario.id)}
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-between pt-1">
          <Button type="button" variant="outline" size="sm" onClick={paginaAnterior} disabled={pagina === 1}>
            Anterior
          </Button>
          <span className="text-xs text-muted-foreground">
            Página {pagina} de {totalPaginas}
          </span>
          <Button type="button" variant="outline" size="sm" onClick={proximaPagina} disabled={pagina === totalPaginas}>
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
