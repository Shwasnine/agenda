import { computed } from 'vue';
import { useCurrentDate } from './useCurrentDate';
import { useStore } from '../stores/useStore';

import type { Evento } from '../models/Evento';

export const useCalendar = () => {
    const { currentDate } = useCurrentDate();
    const { State } = useStore();

    // Eventos armazenados no State
    const events = computed(() => State.eventos);

    // Eventos para a data selecionada
    const eventsForSelectedDate = computed(() => {
        return events.value.filter((event) => {
            const eventDate = new Date(event.dataInicio);
            return (
                eventDate.getDate() === currentDate.value.getDate() &&
                eventDate.getMonth() === currentDate.value.getMonth() &&
                eventDate.getFullYear() === currentDate.value.getFullYear()
            );
        });
    });

    // Datas com eventos para o mês atual (para destacar no mini calendário)
    const datesWithEvents = computed(() => {
        const dates = new Map<string, number>();

        events.value.forEach((event) => {
            const eventDate = new Date(event.dataInicio);
            const dateKey = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;

            if (dates.has(dateKey)) {
                dates.set(dateKey, dates.get(dateKey)! + 1);
            } else {
                dates.set(dateKey, 1);
            }
        });

        return dates;
    });

    // Verificar se uma data tem eventos
    const hasEvents = (date: Date) => {
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return datesWithEvents.value.has(dateKey);
    };

    // Obter o número de eventos para uma data
    const getEventCount = (date: Date) => {
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return datesWithEvents.value.get(dateKey) || 0;
    };

    // Adicionar um evento
    const addEvent = (event: Evento) => {
        const newEvent = { ...event };
        if (!newEvent.id) {
            newEvent.id = Date.now().toString();
        }
        State.eventos.push(newEvent);
    };

    // Atualizar um evento
    const updateEvent = (updatedEvent: Evento) => {
        const index = State.eventos.findIndex((e) => e.id === updatedEvent.id);
        if (index !== -1) {
            State.eventos[index] = { ...updatedEvent };
        }
    };

    // Remover um evento
    const removeEvent = (eventId: string | number) => {
        State.eventos = State.eventos.filter((e) => e.id !== eventId);
    };

    return {
        events,
        eventsForSelectedDate,
        hasEvents,
        getEventCount,
        addEvent,
        updateEvent,
        removeEvent,
    };
};
