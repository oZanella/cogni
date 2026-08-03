import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { RegistroPensamento } from '@/api/features/registro-pensamento/types/registro-pensamento.types';
import { emocaoMap } from '@/web/shared/enum-maps/emocao-map';

const styles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', padding: 32, fontSize: 11, color: '#3a3128' },
  titulo: { fontSize: 18, fontWeight: 700, color: '#53825a', marginBottom: 4 },
  subtitulo: { fontSize: 10, color: '#6a6257', marginBottom: 20 },
  registro: { borderBottomWidth: 1, borderBottomColor: '#ddcfbc', paddingVertical: 10 },
  data: { fontSize: 9, color: '#6a6257', marginBottom: 4 },
  situacao: { fontSize: 11, lineHeight: 1.4, marginBottom: 6 },
  emocoesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  badge: {
    backgroundColor: '#ddcfbc',
    color: '#3a3128',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 9,
  },
});

type RelatorioDocumentoProps = {
  registros: RegistroPensamento[];
  dataInicio: string;
  dataFim: string;
};

export function RelatorioDocumento({ registros, dataInicio, dataFim }: RelatorioDocumentoProps) {
  const formatarData = (data: Date) => format(data, "d 'de' MMMM 'de' yyyy, HH:mm", { locale: ptBR });
  const formatarPeriodo = (valor: string) =>
    format(parse(valor, 'yyyy-MM-dd', new Date()), "d 'de' MMMM 'de' yyyy", { locale: ptBR });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.titulo}>Relatório de pensamentos — Cogni</Text>
        <Text style={styles.subtitulo}>
          Período: {formatarPeriodo(dataInicio)} a {formatarPeriodo(dataFim)} · {registros.length}{' '}
          {registros.length === 1 ? 'registro' : 'registros'}
        </Text>

        {registros.map((registro) => (
          <View key={registro.id} style={styles.registro} wrap={false}>
            <Text style={styles.data}>{formatarData(registro.createdAt)}</Text>
            <Text style={styles.situacao}>{registro.situacao || 'Sem descrição'}</Text>
            {registro.emocoes.length > 0 && (
              <View style={styles.emocoesRow}>
                {registro.emocoes.map((item, index) => (
                  <Text key={index} style={styles.badge}>
                    {emocaoMap[item.emocao]} ({item.intensidade}%)
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </Page>
    </Document>
  );
}
