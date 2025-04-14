<template>
    <header class="calendar__header">
        <button class="btn btn-calendar-light">
            <Menu />
        </button>

        <!-- BRAND -->
        <div class="calendar__band"><Calendar /> Agenda</div>

        <!--Controls-->
        <div class="calendar__controls">
            <!--Today-->
            <button
                class="btn btn-outline-secondary"
                @click.prevent="resetCurrentDate"
            >
                Hoje
            </button>

            <button class="btn btn-calendar-light">
                <ChevronLeft />
            </button>

            <button class="btn btn-calendar-light">
                <ChevronRight />
            </button>

            <time
                :datetime="toISO(currentDate)"
                class="calendar__current__date"
                >{{ dataFormatada }}</time
            >
        </div>
        <!--/.calendar__controls-->

        <div class="calendar__search">
            <button class="btn btn-calendar-light">
                <Search />
            </button>
        </div>

        <div class="dropdown">
            <button
                class="btn btn-outline-secondary d-flex gap-2 align-items-center"
                data-bs-toggle="dropdown"
            >
                <span>Mês</span>
                <ChevronDown />
            </button>

            <div class="dropdown-menu">
                <button class="dropdown-item">Dia</button>
                <button class="dropdown-item">Semana</button>
                <button class="dropdown-item active">Mês</button>
                <button class="dropdown-item">Ano</button>
                <button class="dropdown-item">Programação</button>
                <button class="dropdown-item">4 dias</button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item d-flex align-items-center gap-2">
                    <Check /> <span>Mostrar fins de semana</span>
                </button>
                <button class="dropdown-item d-flex align-items-center gap-2">
                    <Check /> <span>Mostrar eventos recusados</span>
                </button>
                <button class="dropdown-item d-flex align-items-center gap-2">
                    <Check /> <span>Mostrar tarefas concluídas</span>
                </button>
                <button class="dropdown-item d-flex align-items-center gap-2">
                    <Check />
                    <span>Mostrar agendamentos de horários</span>
                </button>
            </div>
        </div>

        <CalendarSettings />

        <ColorTheme />
    </header>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';

// Composables
import { useCurrentDate } from '../composables/useCurrentDate';
import { useDateUtils } from '../composables/useDateUtils';

// Components
import {
    Menu,
    Calendar,
    ChevronLeft,
    ChevronDown,
    ChevronRight,
    Search,
    Check,
} from 'lucide-vue-next';

import ColorTheme from './ColorTheme.vue';
import CalendarSettings from './CalendarSettings.vue';

// Utilities
// import { useCalendarStore } from '../stores/calendarStore';

// Methods dos composables
const { currentDate, resetCurrentDate } = useCurrentDate();
const { toISO, formatMonthYear } = useDateUtils('pt-BR');

const dataFormatada = computed(() => {
    return formatMonthYear(currentDate.value);
});
</script>

<style lang="scss" scoped>
.calendar__header {
    --calendar__header-gap: 1rem;
    --calendar__header-padding-x: 1rem;
    --calendar__header-padding-y: 0.5rem;

    grid-row: 1 / 2;
    grid-column: 1/-1;

    display: flex;
    gap: var(--calendar__header-gap);

    padding: var(--calendar__header-padding-x) var(--calendar__header-padding-y);
    border-bottom: var(--bs-border-width) solid var(--bs-border-color);
}

.calendar__band {
    font-weight: 600;
}

.calendar__controls,
.calendar__band {
    display: flex;
    gap: var(--calendar__header-gap);
    align-items: center;
}

.calendar__current__date {
    font-weight: 600;
    font-size: clamp(1rem, 2vw, 1.5rem);

    &::first-letter {
        text-transform: uppercase;
    }
}

.calendar__search {
    margin-left: auto;
}
</style>
