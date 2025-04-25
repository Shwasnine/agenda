import { useColors } from '../composables/useCores';

import {
    Visibilidade,
    StatusEvento,
    StatusConvidado,
    PermissaoConvidado,
} from '../models/Evento';
import type { Evento } from '../models/Evento';

const getAgendas = () => {
    // Lógica que pegaria as agendas da API

    return [];
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
        },
        {
            id: '2',
            titulo: 'Aniversário da empresa',
            dataInicio: new Date(year, month, day, 12, 0), // 15 de maio de 2025
            dataFim: new Date(year, month, day, 14, 30),
            isFullDay: true,
            visibilidade: Visibilidade.PUBLICO,
            status: StatusEvento.CONFIRMADO,
            criadoPor: 'admin@exemplo.com',
            criadoEm: new Date(2025, 2, 10),
            modificadoEm: new Date(2025, 2, 10),
            timeZone: 'America/Sao_Paulo',
            cor: '#795548', // Manga
        },
    ];
};

export const useAPI = () => {
    return {
        getAgendas,
        getEventos,
    };
};
