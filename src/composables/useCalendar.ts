import { ref, computed } from 'vue';
import { useCurrentDate } from './useCurrentDate';

export interface CalendarEvent {
    id: string | number;
    title: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    allDay?: boolean;
    colorId?: string | number;
    color?: string;
}

export const useCalendar = () => {
    const { currentDate } = useCurrentDate();
    const events = ref<CalendarEvent[]>([]);

    // Eventos para a data selecionada
    const eventsForSelectedDate = computed(() => {
        return events.value.filter((event) => {
            const eventDate = new Date(event.startDate);
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
            const eventDate = new Date(event.startDate);
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
    const addEvent = (event: CalendarEvent) => {
        const newEvent = { ...event };
        if (!newEvent.id) {
            newEvent.id = Date.now().toString();
        }
        events.value.push(newEvent);
    };

    // Atualizar um evento
    const updateEvent = (updatedEvent: CalendarEvent) => {
        const index = events.value.findIndex((e) => e.id === updatedEvent.id);
        if (index !== -1) {
            events.value[index] = { ...updatedEvent };
        }
    };

    // Remover um evento
    const removeEvent = (eventId: string | number) => {
        events.value = events.value.filter((e) => e.id !== eventId);
    };

    // Exemplo de eventos para desenvolvimento
    const addDemoEvents = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        addEvent({
            id: '1',
            title: 'Reunião com cliente',
            description: 'Discussão sobre o novo projeto',
            startDate: today,
            colorId: 1,
            color: '#AD1457',
        });

        addEvent({
            id: '2',
            title: 'Consulta médica',
            startDate: tomorrow,
            colorId: 2,
            color: '#0B8043',
        });

        addEvent({
            id: '3',
            title: 'Entrega do projeto',
            description: 'Prazo final para entrega do MVP',
            startDate: nextWeek,
            colorId: 3,
            color: '#8E24AA',
        });
    };

    // Inicializar com eventos de demonstração
    addDemoEvents();

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
