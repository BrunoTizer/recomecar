export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  tipo: "vitima" | "voluntario";
  senha: string;
  status: string;
  telefone: string;
}
