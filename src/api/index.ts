import { useColors } from '../composables/useCores';

import {
    Visibilidade,
    StatusEvento,
    StatusConvidado,
    PermissaoConvidado,
} from '../models/Evento';
import type { Evento } from '../models/Evento';
import { Cores } from '../models/Cores';
import type { Agenda } from '../models/Agenda';

const getAgendas = (): Agenda[] => {
    // Lógica que pegaria as agendas da API

    return [
        {
            id: '795548',
            nome: 'Reuniões',
            cor: Cores.MANGA,
            descricao: 'Categoria 1 para eventos X',
            visibilidade: Visibilidade.PADRAO,
            proprietario: '413515',
            criadoEm: new Date(),
            modificadoEm: new Date(),
            selected: true,
        },
        {
            id: '6846168',
            nome: 'Revisitas',
            cor: Cores.TOMATE,
            descricao: 'Agenda responsável por centralizar as revisitas',
            visibilidade: Visibilidade.PADRAO,
            proprietario: '413515',
            criadoEm: new Date(),
            modificadoEm: new Date(),
            selected: true,
        },
        {
            id: '9457245',
            nome: 'Confraternizações',
            cor: Cores.PAVAO,
            descricao: 'Festas e Confraternizações',
            visibilidade: Visibilidade.PADRAO,
            proprietario: '413515',
            criadoEm: new Date(),
            modificadoEm: new Date(),
            selected: true,
        },
    ];
};

const getEventos = (): Evento[] => {
    // Lógica que pegaria os eventos da API
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();

    return [
        {
            id: '1',
            titulo: 'Reunião de equipe',
            dataInicio: new Date(year, month, day, 10, 0), // 25 de month de year, 10:00
            dataFim: new Date(year, month, day, 11, 0), // 25 de month de year, 11:00
            descricao:
                'Reunião para discutir/debater sobre melhorias nos processos de...',
            localizacao: 'Sala de reuniões 3',
            isFullDay: false,
            visibilidade: Visibilidade.PADRAO,
            status: StatusEvento.CONFIRMADO,
            criadoPor: 'usuario@exemplo.com',
            criadoEm: new Date(year, 3, 20),
            modificadoEm: new Date(year, 3, 20),
            timeZone: 'America/Sao_Paulo',
            convidados: [
                {
                    email: 'colega@exemplo.com',
                    status: StatusConvidado.SIM,
                    permissao: PermissaoConvidado.VISUALIZAR,
                },
            ],
            agenda: '795548',
        },
        {
            id: '2',
            titulo: 'Aniversário da empresa',
            dataInicio: new Date(year, month, day, 12, 0), // 15 de maio de 2025
            dataFim: new Date(year, month, day, 14, 30),
            descricao:
                'Realizaremos uma pequena confraternização com os colaboradores',
            isFullDay: true,
            visibilidade: Visibilidade.PUBLICO,
            status: StatusEvento.CONFIRMADO,
            criadoPor: 'admin@exemplo.com',
            criadoEm: new Date(2025, 2, 10),
            modificadoEm: new Date(2025, 2, 10),
            timeZone: 'America/Sao_Paulo',
            agenda: '9457245',
        },
        {
            id: '3',
            titulo: 'Compania 1',
            dataInicio: new Date(year, month, day, 12, 0), // 15 de maio de 2025
            dataFim: new Date(year, month, day, 14, 30),
            descricao: 'Verificar o porque a abordagem não está funcionando',
            isFullDay: true,
            visibilidade: Visibilidade.PUBLICO,
            status: StatusEvento.CONFIRMADO,
            criadoPor: 'admin@exemplo.com',
            criadoEm: new Date(2025, 2, 10),
            modificadoEm: new Date(2025, 2, 10),
            timeZone: 'America/Sao_Paulo',
            agenda: '6846168',
        },
        {
            id: '4',
            titulo: 'Compania 2',
            dataInicio: new Date(year, month, day, 12, 0), // 15 de maio de 2025
            dataFim: new Date(year, month, day, 14, 30),
            descricao: 'Cliente alega que o visinho ...',
            isFullDay: true,
            visibilidade: Visibilidade.PUBLICO,
            status: StatusEvento.CONFIRMADO,
            criadoPor: 'admin@exemplo.com',
            criadoEm: new Date(2025, 2, 10),
            modificadoEm: new Date(2025, 2, 10),
            timeZone: 'America/Sao_Paulo',
            agenda: '6846168',
        },
    ];
};

export const useAPI = () => {
    return {
        getAgendas,
        getEventos,
    };
};
