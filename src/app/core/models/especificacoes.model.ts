import { Equipamentos } from './equipamentos.model';

export interface Especificacoes {
  motor: string;
  potencia: string;
  torque: string;
  aceleracao: string;
  suspensao: string;
  velocidade_maxima: string;
  combustivel: string;
  tracao: string;
  aceleracao_0_100: string;
  equipamentos: Equipamentos;
}
