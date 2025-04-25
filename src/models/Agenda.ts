import { Visibilidade } from './Evento';
import { Cores } from './Cores';

export interface Agenda {
    id: string;
    nome: string;
    cor: Cores;
    descricao?: string;
    visibilidade: Visibilidade;
    proprietario: string;
    compartilhadoCom?: Array<{
        email: string;
        permissao: PermissaoCategoria;
    }>;
    criadoEm: Date;
    modificadoEm: Date;
    icone?: string;
    ordem?: number;
    selected?: boolean;
}

export enum PermissaoCategoria {
    LEITURA = 'leitura',
    EDICAO = 'edicao',
    PROPRIETARIO = 'proprietario',
}
