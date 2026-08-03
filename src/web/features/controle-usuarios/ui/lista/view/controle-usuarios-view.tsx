'use client';

import { differenceInCalendarDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

import type { UsuarioAdmin } from '@/api/features/controle-usuarios/types/controle-usuarios.types';
import { PapelUsuario } from '@/api/shared/enums/papel-usuario';
import { Badge } from '@/web/components/ui/badge';
import { Button } from '@/web/components/ui/button';
import { Card, CardContent } from '@/web/components/ui/card';
import { Input } from '@/web/components/ui/input';
import { useControleUsuarios } from '@/web/features/controle-usuarios/ui/lista/hooks/use-controle-usuarios.hook';
import { papelUsuarioMap } from '@/web/shared/enum-maps/papel-usuario-map';

function formatarData(data: Date) {
  return format(data, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
}

function StatusAcesso({ usuario }: { usuario: UsuarioAdmin }) {
  if (usuario.papel === PapelUsuario.ADMIN) {
    return <Badge variant="secondary">Administrador · sem limite</Badge>;
  }

  if (!usuario.acessoExpiraEm) {
    return <Badge variant="secondary">Sem limite de acesso</Badge>;
  }

  const diasRestantes = differenceInCalendarDays(usuario.acessoExpiraEm, new Date());

  if (diasRestantes < 0) {
    return <Badge variant="destructive">Acesso expirado em {formatarData(usuario.acessoExpiraEm)}</Badge>;
  }

  return (
    <Badge variant="outline">
      Acesso até {formatarData(usuario.acessoExpiraEm)} · {diasRestantes} {diasRestantes === 1 ? 'dia' : 'dias'}
    </Badge>
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
  const [dias, setDias] = useState('');

  const confirmarDias = () => {
    const valor = Number(dias);
    if (!valor || valor <= 0) return;
    onDefinirDias(valor);
    setDias('');
  };

  return (
    <Card className="border-none bg-card shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-medium text-foreground">{usuario.nome}</p>
            <p className="truncate text-sm text-muted-foreground">{usuario.email}</p>
          </div>
          <Badge variant={usuario.papel === PapelUsuario.ADMIN ? 'default' : 'outline'}>
            {papelUsuarioMap[usuario.papel]}
          </Badge>
        </div>

        <StatusAcesso usuario={usuario} />

        {usuario.papel !== PapelUsuario.ADMIN && (
          <div className="flex flex-wrap items-center gap-2">
            <Input
              type="number"
              min={1}
              placeholder="Dias de acesso"
              value={dias}
              onChange={(event) => setDias(event.target.value)}
              className="w-36"
              disabled={pendente}
            />
            <Button type="button" size="sm" onClick={confirmarDias} disabled={pendente || !dias}>
              Definir
            </Button>
            {usuario.acessoExpiraEm && (
              <Button type="button" size="sm" variant="outline" onClick={onRemoverLimite} disabled={pendente}>
                Remover limite
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ControleUsuariosView() {
  const { usuarios, isLoading, definirDiasAcesso, removerLimiteAcesso, usuarioPendente } = useControleUsuarios();

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 pt-6 pb-6 md:max-w-2xl">
      <div>
        <h1 className="text-2xl font-medium text-foreground">Controle de usuários</h1>
        <p className="text-sm text-muted-foreground">Defina por quantos dias cada usuário terá acesso ao Cogni.</p>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Carregando usuários...</p>}

      <div className="flex flex-col gap-3">
        {usuarios.map((usuario) => (
          <LinhaUsuario
            key={usuario.id}
            usuario={usuario}
            pendente={usuarioPendente === usuario.id}
            onDefinirDias={(dias) => definirDiasAcesso(usuario.id, dias)}
            onRemoverLimite={() => removerLimiteAcesso(usuario.id)}
          />
        ))}
      </div>
    </div>
  );
}
