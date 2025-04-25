<template>
    <div class="calendar__view">
        <!-- Visualização do mês -->
        <CalendarMonth v-if="viewMode === 'month'" />

        <!-- Outras visualizações podem ser adicionadas aqui posteriormente -->
        <div v-else class="calendar__placeholder">
            <p>
                {{ viewModeText[viewMode as keyof ViewModeText] }} em
                desenvolvimento
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useViewMode } from '../composables/useViewMode';
import CalendarMonth from '../views/CalendarMonth.vue';
import type { ViewModeText } from '../composables/useViewMode';

const { viewMode, viewModeText } = useViewMode();
</script>

<style lang="scss" scoped>
.calendar__view {
    grid-column: 2 / 3;
    grid-row: 2 / -1;
    height: 100%;
    overflow: auto;
    padding: 1rem;
    background-color: var(--bs-body-bg);
    transition: margin-left 0.3s ease;
}

.calendar__placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 1.5rem;
    color: var(--bs-secondary);
    text-align: center;
}
</style>
