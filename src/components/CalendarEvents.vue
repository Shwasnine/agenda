<template>
    <div class="calendar-events">
        <div class="calendar-events__date">
            {{ formatLongDate(currentDate) }}
        </div>

        <div
            v-if="eventsForSelectedDate.length > 0"
            class="calendar-events__list"
        >
            <div
                v-for="event in eventsForSelectedDate"
                :key="event.id"
                class="calendar-events__item"
                :style="{ '--event-color': event.cor }"
            >
                <div class="calendar-events__color-marker"></div>
                <div class="calendar-events__content">
                    <div class="calendar-events__title">{{ event.titulo }}</div>
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
        </div>

        <div v-else class="calendar-events__empty">
            Nenhum evento para esta data
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useCurrentDate } from '../composables/useCurrentDate';
import { useDateUtils } from '../composables/useDateUtils';
import { useCalendar } from '../composables/useCalendar';

const { currentDate } = useCurrentDate();
const { formatLongDate, formatDate } = useDateUtils('pt-BR');
const { eventsForSelectedDate } = useCalendar();
</script>

<style lang="scss" scoped>
.calendar-events {
    margin-top: 1rem;

    &__date {
        font-weight: 600;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
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
        margin-top: 0.25rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__empty {
        padding: 1rem;
        text-align: center;
        color: var(--bs-secondary-color);
        font-size: 0.9rem;
        background-color: var(--bs-gray-100);
        border-radius: 0.5rem;
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
