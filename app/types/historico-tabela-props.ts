export interface HistoricoTabelaProps {
  formatarData: (data: string) => string;
  categorias: Record<number, string>;
  statusPedido: Record<number, string>;
}
