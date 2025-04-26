<template>
    <div class="calendar-events">
        <div class="calendar-events__date">Dia {{ currentDate.getDate() }}</div>

        <div
            v-if="eventsForSelectedDate.length > 0"
            class="calendar-events__list"
        >
            <div
                v-for="event in eventsForSelectedDate"
                :key="event.id"
                class="calendar-events__item"
                :style="bindAgendaColor(event.agenda)"
            >
                <div class="calendar-events__color-marker"></div>
                <div class="calendar-events__content">
                    <div class="calendar-events__title">{{ event.titulo }}</div>
                    <div class="divider"></div>
                    <div
                        v-if="event.descricao"
                        class="calendar-events__description"
                    >
                        {{ event.descricao }}
                    </div>
                    <div class="calendar-events__horario">
                        {{ formatDate(event.dataInicio, 'HH:MM') }} ás
                        {{ formatDate(event.dataFim, 'HH:MM') }}
                    </div>
                </div>
            </div>

            <!-- <div
                class="calendar-events__item"
                v-for="placeholder in 30"
                :data-placeholder="placeholder"
            >
                <div class="calendar-events__color-marker"></div>
                <div class="calendar-events__content">
                    <div class="calendar-events__title">
                        <div class="placeholder w-100"></div>
                    </div>
                    <div class="calendar-events__description">
                        <div class="placeholder w-100 mb-1"></div>
                    </div>
                    <div class="calendar-events__horario">
                        <div class="d-flex gap-2">
                            <div class="placeholder col"></div>
                            <div class="placeholder col-3"></div>
                            <div class="placeholder col"></div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>

        <div v-else class="calendar-events__empty">
            <div class="alert alert-warning" v-if="qtdeAgendasAtivas == 0">
                Nenhuma agenda foi selecionada
            </div>
            <div class="alert alert-info">Nenhum evento para esta data</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCurrentDate } from '../composables/useCurrentDate';
import { useDateUtils } from '../composables/useDateUtils';
import { useCalendar } from '../composables/useCalendar';

import { useStore } from '../stores/useStore';

const { getAgenda, State } = useStore();
const { currentDate } = useCurrentDate();
const { formatDate } = useDateUtils('pt-BR');
const { eventsForSelectedDate } = useCalendar();

const qtdeAgendasAtivas = computed(() => {
    return State.agendas.filter((agenda) => agenda.selected).length;
});

const bindAgendaColor = (agendaID: string | undefined) => {
    if (!agendaID) return null;

    const agenda = getAgenda(agendaID);

    if (agenda) return { '--event-color': agenda.cor };

    return null;
};
</script>

<style lang="scss" scoped>
.calendar-events {
    height: 100%;
    overflow: auto;
    border-left: var(--bs-border-width) solid var(--bs-border-color);

    &__date {
        font-weight: 600;
        font-size: 0.9rem;
        padding: 9px 1rem;
        background: var(--bs-body-bg);
        position: sticky;
        top: 0;
        z-index: 1;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
    }

    &__item {
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem;
        border-radius: 0.5rem;
        background-color: var(--bs-gray-100);
        transition: background-color 0.2s;

        &:hover {
            background-color: var(--bs-gray-200);
        }
    }

    &__color-marker {
        width: 4px;
        border-radius: 2px;
        background-color: var(--event-color, var(--bs-primary));
    }

    &__content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    &__title {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &__description {
        font-size: 0.8rem;
        color: var(--bs-secondary-color);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__horario {
        font-size: 0.8rem;
        color: var(--bs-secondary-color);
    }

    .divider {
        border-top: 1px solid currentColor;
        opacity: 0.5;
        width: 100%;
    }

    &__empty {
        padding: 1rem;
        text-align: center;
        color: var(--bs-secondary-color);
        font-size: 0.9rem;
        background-color: var(--bs-gray-100);
        border-top: 1px solid var(--bs-border-color);
        height: calc(100% - (18px + 1.5rem));
    }
}

[data-bs-theme='dark'] {
    .calendar-events {
        &__item {
            background-color: var(--bs-gray-800);

            &:hover {
                background-color: var(--bs-gray-700);
            }
        }

        &__empty {
            background-color: var(--bs-gray-800);
        }
    }
}
</style>
