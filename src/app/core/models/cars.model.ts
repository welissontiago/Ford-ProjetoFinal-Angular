import { Categoria } from './categoria.model';
import { Combustivel } from './combustivel.model';
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
  especificacoes: Especificacoes;
  equipamentos: {};
  imagem_principal: string;
  galeria: string[];
}
