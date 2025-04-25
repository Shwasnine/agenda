import { reactive } from 'vue';
import type { CalendarEvent } from '../composables/useCalendar';

// API
import { useAPI } from '../api';

// Métodos da API
const { getAgendas, getEventos } = useAPI();

// ad
const agendas = getAgendas();
const eventos = getEventos();

const State = reactive({
    currentDate: new Date(),
    today: new Date(),
    viewMode: 'month',
    isOpenSidebar: true,
    agendas: agendas,
    eventos: eventos,
    // usuario
    usuario: {
        name: 'Danilo Batista de Souza',
        id: 0,
    },
});

export const useStore = () => {
    return {
        State,
    };
};
