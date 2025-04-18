import { reactive } from 'vue';
import type { CalendarEvent } from '../composables/useCalendar';

// Criar alguns eventos de demonstração
const today = new Date();
const demoEvents: CalendarEvent[] = [
    {
        id: '1',
        title: 'Reunião com cliente',
        description: 'Discussão sobre o novo projeto',
        startDate: today,
        color: '#AD1457',
    },
    {
        id: '2',
        title: 'Consulta médica',
        startDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 2
        ),
        color: '#0B8043',
    },
    {
        id: '3',
        title: 'Entrega do projeto',
        description: 'Prazo final para entrega do MVP',
        startDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 7
        ),
        color: '#8E24AA',
    },
    {
        id: '4',
        title: 'Almoço com a equipe',
        startDate: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
        ),
        color: '#F4511E',
    },
    {
        id: '5',
        title: 'Aniversário do João',
        startDate: new Date(today.getFullYear(), today.getMonth(), 15),
        color: '#3F51B5',
    },
];

const State = reactive({
    currentDate: new Date(),
    today: new Date(),
    viewMode: 'month',
    isOpenSidebar: true,
    agendas: [
        {
            id: 1,
            name: 'Agenda A',
            color: '#AD1457',
            selected: true,
        },
        {
            id: 2,
            name: 'Agenda B',
            color: '#0B8043',
            selected: true,
        },
        {
            id: 3,
            name: 'Agenda C',
            color: '#8E24AA',
            selected: true,
        },
    ],
    eventos: [...demoEvents],
    selectedAgenda: null,
    selectedEvent: null,
    filtros: [],
});

export const useStore = () => {
    return {
        State,
    };
};
