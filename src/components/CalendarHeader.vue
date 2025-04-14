<template>
    <header class="calendar__header">
        <button
            class="btn btn-calendar-light"
            @click.prevent="State.isOpenSidebar = !State.isOpenSidebar"
        >
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

            <button class="btn btn-calendar-light" @click.prevent="next">
                <ChevronLeft />
            </button>

            <button class="btn btn-calendar-light" @click.prevent="next">
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
                <span>{{ viewModeText[viewMode] }}</span>
                <ChevronDown />
            </button>

            <div class="dropdown-menu">
                <button
                    class="dropdown-item"
                    :class="{ active: viewMode === 'day' }"
                    @click.prevent="setViewMode('day')"
                >
                    Dia
                </button>
                <button
                    class="dropdown-item"
                    :class="{ active: viewMode === 'week' }"
                    @click.prevent="setViewMode('week')"
                >
                    Semana
                </button>
                <button
                    class="dropdown-item"
                    :class="{ active: viewMode === 'month' }"
                    @click.prevent="setViewMode('month')"
                >
                    Mês
                </button>
                <button
                    class="dropdown-item"
                    :class="{ active: viewMode === 'year' }"
                    @click.prevent="setViewMode('year')"
                >
                    Ano
                </button>
                <!--<button class="dropdown-item">Programação</button>
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
                </button>-->
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
import { useViewMode } from '../composables/useViewMode';
import { useStore } from '../stores/useStore';

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

// State
const { State } = useStore();

// Methods dos composables
const {
    currentDate,
    resetCurrentDate,
    nextMonth,
    prevMonth,
    nextYear,
    prevYear,
} = useCurrentDate();
const { toISO, formatMonthYear } = useDateUtils('pt-BR');
const { viewMode, viewModeText, setViewMode } = useViewMode();

// Computeds
const dataFormatada = computed(() => {
    return formatMonthYear(currentDate.value);
});

// Métodos
const next = () => {
    if (viewMode.value === 'day' || viewMode.value === 'month') {
        nextMonth();
    } else if (viewMode.value === 'year') {
        nextYear();
    }
};
const prev = () => {
    if (viewMode.value === 'day' || viewMode.value === 'month') {
        prevMonth();
    } else if (viewMode.value === 'year') {
        prevYear();
    }
};
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
