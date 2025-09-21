import { Categoria } from './categoria.model';
import { Combustivel } from './combustivel.model';
import { Equipamentos } from './equipamentos.model';
import { Especificacoes } from './especificacoes.model';

export interface Cars {
  id?: number;
  modelo: string;
  nome: string;
  cores: string[];
  preco: number;
  combustiveis: Combustivel;
  destaque: boolean;
  descricao: string;
  categoria: Categoria;
  ano: number;
  historia: string;
  especificacoes: Especificacoes;
  equipamentos: Equipamentos;
  imagem_principal: string;
  galeria: string[];
}
