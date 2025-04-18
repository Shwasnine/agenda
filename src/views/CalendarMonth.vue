<template>
    <main class="calendar__month-view">
        <!-- Cabeçalho com os dias da semana -->
        <div class="calendar__weekdays">
            <div
                v-for="day in weekdayLabels"
                :key="day"
                class="calendar__weekday"
            >
                {{ day }}
            </div>
        </div>

        <!-- Grade do calendário -->
        <div class="calendar__grid">
            <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="calendar__grid-day"
                :class="{
                    'calendar__grid-day--other-month': !day.currentMonth,
                    'calendar__grid-day--today': isToday(day.date),
                    'calendar__grid-day--selected': isCurrentDate(day.date),
                }"
                @click="selectDate(day.date)"
            >
                <div class="calendar__day-header">
                    <span class="calendar__day-number">{{
                        day.dayNumber
                    }}</span>
                </div>

                <div class="calendar__day-content">
                    <!-- Eventos do dia -->
                    <div
                        v-if="day.currentMonth && hasEvents(day.date)"
                        class="calendar__day-events"
                    >
                        <div
                            v-for="event in getEventsForDate(day.date)"
                            :key="event.id"
                            class="calendar__day-event"
                            :style="{ '--event-color': event.color }"
                        >
                            {{ event.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDateUtils } from '../composables/useDateUtils';
import { useCurrentDate } from '../composables/useCurrentDate';
import { useCalendar } from '../composables/useCalendar';

// Composables
const { currentDate, setCurrentDate, isToday, isCurrentDate } =
    useCurrentDate();
const { getWeekdayName } = useDateUtils('pt-BR');
const { events, hasEvents } = useCalendar();

// Nomes dos dias da semana
const weekdayLabels = computed(() => {
    const weekdays = [];
    const baseDate = new Date(2023, 0, 1); // Uma data de domingo

    for (let i = 0; i < 7; i++) {
        const day = new Date(baseDate);
        day.setDate(baseDate.getDate() + i);
        weekdays.push(getWeekdayName(day, 'short'));
    }

    return weekdays;
});

// Dias do calendário
const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();

    // Primeiro dia do mês atual
    const firstDayOfMonth = new Date(year, month, 1);
    // Último dia do mês atual
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Dia da semana do primeiro dia (0 = Domingo, 1 = Segunda, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Total de dias para mostrar (dias do mês atual + dias do mês anterior para completar a primeira semana)
    const totalDays = 42; // 6 semanas * 7 dias

    const days = [];

    // Adicionar dias do mês anterior para completar a primeira semana
    const lastDayOfPrevMonth = new Date(year, month, 0);
    const daysInPrevMonth = lastDayOfPrevMonth.getDate();

    for (let i = 0; i < firstDayOfWeek; i++) {
        const day = daysInPrevMonth - (firstDayOfWeek - i - 1);
        days.push({
            date: new Date(year, month - 1, day),
            dayNumber: day,
            currentMonth: false,
        });
    }

    // Adicionar dias do mês atual
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        days.push({
            date: new Date(year, month, day),
            dayNumber: day,
            currentMonth: true,
        });
    }

    // Adicionar dias do próximo mês para preencher as 6 semanas
    const remainingDays = totalDays - days.length;
    for (let day = 1; day <= remainingDays; day++) {
        days.push({
            date: new Date(year, month + 1, day),
            dayNumber: day,
            currentMonth: false,
        });
    }

    return days;
});

// Selecionar uma data
const selectDate = (date: Date) => {
    setCurrentDate(new Date(date));
};

// Obter eventos para uma data específica
const getEventsForDate = (date: Date) => {
    return events.value.filter((event) => {
        const eventDate = new Date(event.startDate);
        return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
        );
    });
};
</script>

<style lang="scss" scoped>
.calendar__month-view {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
}

.calendar__weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--bs-border-color);

    .calendar__weekday {
        &::first-letter {
            text-transform: uppercase;
        }
    }
}

.calendar__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    flex: 1;
    gap: 1px;
    background-color: var(--bs-border-color);
    border: 1px solid var(--bs-border-color);
    border-radius: 0.25rem;
    overflow: hidden;
}

.calendar__grid-day {
    background-color: var(--bs-body-bg);
    min-height: 100px;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    &--other-month {
        background-color: var(--bs-gray-100);

        .calendar__day-number {
            color: var(--bs-gray-500);
        }
    }

    &--today {
        .calendar__day-number {
            background-color: var(--bs-primary);
            color: #fff;
        }
    }

    &--selected {
        outline: 2px solid var(--bs-primary);
        z-index: 1;
    }
}

.calendar__day-header {
    padding: 0.5rem;
    display: flex;
    justify-content: flex-end;
}

.calendar__day-number {
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.9rem;
}

.calendar__day-content {
    flex: 1;
    padding: 0 0.5rem 0.5rem;
    overflow: hidden;
}

.calendar__day-events {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.calendar__day-event {
    background-color: var(--event-color, var(--bs-primary));
    color: #fff;
    font-size: 0.8rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        opacity: 0.9;
        cursor: pointer;
    }
}

// Dark mode adjustments
[data-bs-theme='dark'] {
    .calendar__grid-day {
        &--other-month {
            background-color: var(--bs-gray-800);

            .calendar__day-number {
                color: var(--bs-gray-600);
            }
        }
    }
}
</style>
