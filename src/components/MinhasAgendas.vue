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

    <Teleport to="body">
        <div class="modal" ref="modalCreateAgenda" id="modalCreateAgenda">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Criar nova agenda</h5>
                        <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div class="modal-body d-flex gap-4 flex-column">
                        <label class="d-block">
                            <input
                                type="text"
                                class="form-control"
                                v-model="novaAgenda.nome"
                            />
                            <span>Nome:</span>
                        </label>
                        <label class="d-block">
                            <textarea
                                type="text"
                                class="form-control"
                                v-model="novaAgenda.descricao"
                            ></textarea>
                            <span>Descrição</span>
                        </label>
                    </div>
                    <div class="modal-footer d-flex gap-3 justify-content-end">
                        <button
                            class="btn-outline-secondary btn px-4 btn-pill"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        <button class="btn-primary btn px-4 btn-pill">
                            Criar agenda
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ChevronDown } from 'lucide-vue-next';
import Agenda from './Agenda.vue';
import { useStore } from '../stores/useStore';
import { Cores } from '../models/Cores';

const { State } = useStore();

const novaAgenda = ref({
    nome: '',
    descricao: '',
});
const agendas = computed(() => State.agendas);

const onUpdateAgenda = (payload: {
    selected: boolean;
    id: string | number;
    cor?: Cores | string;
}) => {
    const agenda = agendas.value.find((agenda) => agenda.id === payload.id);
    if (agenda) {
        agenda.selected = payload.selected;
        agenda.cor = (payload.cor as Cores) || (agenda.cor as Cores);
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

.modal {
    --bs-modal-header-border-width: 0;
    --bs-modal-footer-border-width: 0;
    --bs-modal-border-radius: 1.5rem;

    label {
        position: relative;

        span {
            position: absolute;
            left: 0.75rem;
            top: var(--bs-border-width);
            transform: translateY(-50%);
            font-size: 0.75rem;
            display: block;
            padding: 0.25rem;
            background-image: linear-gradient(
                to bottom,
                var(--bs-modal-bg) 0,
                var(--bs-modal-bg) 50%,
                transparent 50%,
                transparent 100%
            );
        }
    }

    textarea.form-control {
        height: 100px;
    }
}
</style>
