<template>
    <aside
        class="calendar__sidebar"
        :class="{ 'calendar__sidebar--closed': !isOpen }"
    >
        <CriarEvento />

        <MiniCalendario />

        <MinhasAgendas />
    </aside>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import CriarEvento from './CriarEvento.vue';
import MiniCalendario from './MiniCalendario.vue';
import MinhasAgendas from './MinhasAgendas.vue';
import { useStore } from '../stores/useStore';

const { State } = useStore();
const isOpen = computed(() => State.isOpenSidebar);
</script>

<style lang="scss" scoped>
.calendar__sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem;
    height: 100%;
    overflow-y: auto;

    background-color: var(--bs-body-bg);
    color: var(--bs-body-color);
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);

    border-right: 1px solid var(--bs-border-color);
    transition: transform 0.3s ease;

    &--closed {
        transform: translateX(-100%);
    }
}
</style>
