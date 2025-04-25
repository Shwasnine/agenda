<template>
    <div class="calendar__app">
        <CalendarHeader />

        <CalendarSidebar />

        <CalendarView />
    </div>
    <!--/.calendar__app-->
    <ModalEvento
        :is-open="modalEventoOpen"
        :evento-inicial="eventoInicial"
        usuarioAtual="145"
    />
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue';

import CalendarHeader from './components/CalendarHeader.vue';
import CalendarSidebar from './components/CalendarSidebar.vue';
import CalendarView from './components/CalendarView.vue';
import ModalEvento from './components/ModalEvento.vue';

import { useStore } from './stores/useStore';

const modalEventoOpen = ref(false);

const { State } = useStore();
const eventoInicial = State.eventos[0];

provide('modalEventoOpen', modalEventoOpen);
</script>

<style lang="scss" scoped>
.calendar__app {
    display: grid;
    grid-template-columns: 270px 1fr;
    grid-template-rows: min-content 1fr;

    height: 100vh;
    width: 100vw;

    background-color: var(--bs-body-bg);

    color: var(--bs-body-color);
    font-family: var(--bs-body-font-family);
    font-size: var(--bs-body-font-size);
    font-weight: var(--bs-body-font-weight);
    line-height: var(--bs-body-line-height);
}
</style>
