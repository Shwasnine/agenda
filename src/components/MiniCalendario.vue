<template>
    <div class="mini-calendario">
        <!-- Cabeçalho com navegação -->
        <div class="mini-calendario__header">
            <button class="btn btn-calendar-light" @click="prevMonth">
                <ChevronLeft />
            </button>

            <span class="mini-calendario__month-year">{{
                formatMonthYear(displayDate)
            }}</span>

            <button class="btn btn-calendar-light" @click="nextMonth">
                <ChevronRight />
            </button>
        </div>

        <!-- Dias da semana -->
        <div class="mini-calendario__weekdays">
            <div
                v-for="day in weekdayLabels"
                :key="day"
                class="mini-calendario__weekday"
            >
                {{ day }}
            </div>
        </div>

        <!-- Grade do calendário -->
        <div class="mini-calendario__grid">
            <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="mini-calendario__day"
                :class="{
                    'mini-calendario__day--other-month': !day.currentMonth,
                    'mini-calendario__day--today': isToday(day.date),
                    'mini-calendario__day--selected':
                        isSelectedDate(day.date) || isCurrentDate(day.date),
                    'mini-calendario__day--has-events':
                        hasEvents(day.date) && day.currentMonth,
                }"
                @click="selectDate(day.date)"
            >
                {{ day.dayNumber }}
                <div
                    v-if="hasEvents(day.date) && day.currentMonth"
                    class="mini-calendario__event-indicator"
                ></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useDateUtils } from '../composables/useDateUtils';
import { useCurrentDate } from '../composables/useCurrentDate';
import { useCalendar } from '../composables/useCalendar';

// Composables
const { formatMonthYear, getWeekdayName } = useDateUtils('pt-BR');
const { currentDate, setCurrentDate, isToday, isCurrentDate } =
    useCurrentDate();
const { hasEvents } = useCalendar();

// Estado local
const displayDate = ref(new Date(currentDate.value));
const localSelectedDate = ref(new Date(currentDate.value));

// Computar os rótulos dos dias da semana (abreviados)
const weekdayLabels = computed(() => {
    const weekdays = [];
    const baseDate = new Date(2023, 0, 1); // Uma data de domingo

    for (let i = 0; i < 7; i++) {
        const day = new Date(baseDate);
        day.setDate(baseDate.getDate() + i);
        // Formata com apenas a primeira letra e capitaliza
        weekdays.push(getWeekdayName(day, 'narrow'));
    }

    return weekdays;
});

// Gerar os dias do mês para exibição no calendário
const calendarDays = computed(() => {
    const year = displayDate.value.getFullYear();
    const month = displayDate.value.getMonth();

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

// Verificar se uma data está selecionada
const isSelectedDate = (date: Date) => {
    return (
        date.getDate() === localSelectedDate.value.getDate() &&
        date.getMonth() === localSelectedDate.value.getMonth() &&
        date.getFullYear() === localSelectedDate.value.getFullYear()
    );
};

// Selecionar uma data
const selectDate = (date: Date) => {
    localSelectedDate.value = date;
    setCurrentDate(date);
};

// Navegar para o mês anterior
const prevMonth = () => {
    const newDate = new Date(displayDate.value);
    newDate.setMonth(newDate.getMonth() - 1);
    displayDate.value = newDate;
};

// Navegar para o próximo mês
const nextMonth = () => {
    const newDate = new Date(displayDate.value);
    newDate.setMonth(newDate.getMonth() + 1);
    displayDate.value = newDate;
};

// Sincronizar o calendário com a data atual quando ela mudar
watch(currentDate, (newDate) => {
    localSelectedDate.value = new Date(newDate);
    displayDate.value = new Date(newDate);
});

// Inicializar o componente
onMounted(() => {
    // Sincronizar o estado local com a data atual
    localSelectedDate.value = new Date(currentDate.value);
    displayDate.value = new Date(currentDate.value);
});
</script>

<style lang="scss" scoped>
.mini-calendario {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.mini-calendario__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.mini-calendario__month-year {
    font-weight: bold;
    text-align: center;
    display: block;
    width: 100%;
    font-size: 0.875rem;

    &::first-letter {
        text-transform: uppercase;
    }
}

.mini-calendario__weekdays,
.mini-calendario__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-content: center;
    align-items: center;
    grid-gap: 0.25rem;

    text-align: center;

    font-size: 0.625rem;
    font-weight: 700;
}

.mini-calendario__day {
    aspect-ratio: 1;
    border-radius: 50%;

    background: transparent;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:not(.mini-calendario__day--today) {
        &:hover,
        &.mini-calendario__day--selected {
            background: rgba(0, 0, 0, 0.11);
        }
    }
}

.mini-calendario__day--today {
    background: var(--bs-primary);
    color: var(--bs-primary-color, #fff);
}

.mini-calendario__day--other-month {
    color: var(--bs-secondary-color);
}
</style>
