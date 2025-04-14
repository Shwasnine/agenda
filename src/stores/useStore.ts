import { reactive } from 'vue';

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
            selected: false,
        },
        {
            id: 2,
            name: 'Agenda B',
            color: '#0B8043',
            selected: false,
        },
        {
            id: 3,
            name: 'Agenda C',
            color: '#8E24AA',
            selected: false,
        },
    ],
    eventos: [],
    selectedAgenda: null,
    selectedEvent: null,
    filtros: [],
});

export const useStore = () => {
    return {
        State,
    };
};
