export interface Evento {
    id: string;
    titulo: string;
    descricao?: string;
    dataInicio: Date;
    dataFim: Date;
    localizacao?: string;
    isFullDay: boolean;
    cor?: string;
    repetir?: RegrasRepeticao;
    lembretes?: Lembrete[];
    convidados?: Convidado[];
    visibilidade: Visibilidade;
    status: StatusEvento;
    criadoPor: string;
    criadoEm: Date;
    modificadoEm: Date;
    timeZone: string;
}

export enum Visibilidade {
    PUBLICO = 'publico',
    PRIVADO = 'privado',
    PADRAO = 'padrao',
}

export enum StatusEvento {
    CONFIRMADO = 'confirmado',
    TENTATIVO = 'tentativo',
    CANCELADO = 'cancelado',
}

export interface RegrasRepeticao {
    frequencia: FrequenciaRepeticao;
    intervalo: number;
    diasSemana?: number[]; // 0-6 representando Domingo a Sábado
    diaDoMes?: number;
    terminaEm?: Date;
    terminaApos?: number; // número de ocorrências
    excecoes?: Date[]; // datas em que o evento não ocorre
}

export enum FrequenciaRepeticao {
    DIARIO = 'diario',
    SEMANAL = 'semanal',
    MENSAL = 'mensal',
    ANUAL = 'anual',
    PERSONALIZADO = 'personalizado',
}

export interface Lembrete {
    id: string;
    antecedencia: number; // em minutos
    tipo: TipoLembrete;
}

export enum TipoLembrete {
    EMAIL = 'email',
    NOTIFICACAO = 'notificacao',
    SMS = 'sms',
}

export interface Convidado {
    email: string;
    status: StatusConvidado;
    permissao: PermissaoConvidado;
}

export enum StatusConvidado {
    SIM = 'sim',
    NAO = 'nao',
    TALVEZ = 'talvez',
    PENDENTE = 'pendente',
}

export enum PermissaoConvidado {
    VISUALIZAR = 'visualizar',
    EDITAR = 'editar',
    CONVIDAR = 'convidar',
}
