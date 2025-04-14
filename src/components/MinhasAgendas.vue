<template>
    <div class="calendar__agendas">
        <button
            class="btn w-100 d-flex align-items-center"
            data-bs-toggle="collapse"
            data-bs-target="#minhas-agendas"
            aria-expanded="false"
        >
            <strong>Minhas agendas</strong>

            <ChevronDown class="ms-auto" />
        </button>

        <div class="collapse show" id="minhas-agendas">
            <div class="d-flex gap-2 flex-column">
                <Agenda
                    v-for="agenda in agendas"
                    v-bind="agenda"
                    @update:selected="onUpdateAgenda"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import Agenda from './Agenda.vue';
import { useStore } from '../stores/useStore';

const { State } = useStore();

const agendas = computed(() => State.agendas);

const onUpdateAgenda = (payload: {
    selected: boolean;
    id: string | number;
    color?: string;
}) => {
    const agenda = agendas.value.find((agenda) => agenda.id === payload.id);
    if (agenda) {
        agenda.selected = payload.selected;
        agenda.color = payload.color || agenda.color;
    }
};
</script>

<style lang="scss" scoped>
.calendar__agendas {
    --agenda-btn-hover-bg: rgba(0, 0, 0, 0.11);

    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.btn[data-bs-toggle='collapse'] {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    &:hover {
        background-color: var(--agenda-btn-hover-bg);
    }
}
</style>
