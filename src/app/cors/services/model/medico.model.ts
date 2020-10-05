import { Especialidade } from './especialidade.model';

export class Medico {
  id: number;
  nome: string;
  CRM: number;
  email: string;
  telefone: string;
  especialidade: Especialidade;
}
