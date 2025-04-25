<template>
    <div class="modal" ref="modalEl">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        {{ eventoInicial.id ? 'Editar Evento' : 'Novo Evento' }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        @click.prevent="modalEventoOpen = false"
                    ></button>
                </div>
                <div class="modal-body">
                    <form class="d-flex flex-column gap-3">
                        <div class="form-group">
                            <input
                                type="text"
                                class="form-control"
                                id="titulo"
                                :value="evento?.titulo"
                            />
                            <label for="titulo">Título</label>
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="isFullDay"
                                />
                                <label for="isFullDay">Dia inteiro</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button
                        class="btn btn-outline-secondary"
                        @click.prevent="modalEventoOpen = false"
                    >
                        Cancelar
                    </button>
                    <button class="btn btn-primary">Salvar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUpdated, inject } from 'vue';
import type { Evento } from '../models/Evento';
import { useCurrentDate } from '../composables/useCurrentDate';
import { Modal } from 'bootstrap';

const modalEventoOpen = inject<boolean>('modalEventoOpen');

const PROPS = defineProps<{
    isOpen: boolean;
    eventoInicial: Evento;
}>();

const { currentDate } = useCurrentDate();

// Data
const evento = ref<Evento>();
const temRepeticao = ref(!!PROPS.eventoInicial.repetir);
const frequenciaRepeticao = ref(
    PROPS.eventoInicial.repetir?.frequencia || 'semanal'
);
const temLembrete = ref(
    PROPS.eventoInicial.lembretes && PROPS.eventoInicial.lembretes.length > 0
);
const modalInstance = ref<Modal>();

// Elementos
const modalEl = ref<HTMLElement>();

const createModalInstance = () => {
    if (modalEl.value && !modalInstance.value)
        modalInstance.value = Modal.getOrCreateInstance(modalEl.value);
};

onMounted(createModalInstance);
onUpdated(createModalInstance);

watch(
    () => PROPS.isOpen,
    (state) => {
        if (!modalInstance.value) return;

        if (state) {
            modalInstance.value.show();
        } else {
            modalInstance.value.hide();
        }
    }
);

watch(
    () => PROPS.eventoInicial,
    (novoValor) => {
        const dataBase = () => new Date(currentDate.value.getTime());

        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const criadoEm = new Date();
        const modificadoEm = new Date();

        evento.value = {
            id: novoValor.id || '',
            titulo: novoValor.titulo || '',
            descricao: novoValor.descricao || '',
            dataInicio: novoValor.dataInicio || dataBase(),
            dataFim:
                novoValor.dataInicio ||
                dataBase().setHours(new Date().getHours() + 1),
            localizacao: novoValor.localizacao || '',
            isFullDay: novoValor.isFullDay || false,
            cor: novoValor.cor || '#4285F4',
            repetir: novoValor.repetir ? novoValor.repetir : undefined,
            lembretes: novoValor.lembretes || undefined,
            convidados: novoValor.convidados || [],
            visibilidade: novoValor.visibilidade || 'padrao',
            status: novoValor.status || 'confirmado',
            criadoPor: novoValor.criadoPor,
            criadoEm: criadoEm,
            modificadoEm: modificadoEm,
            timeZone: timeZone,
        };

        temRepeticao.value = !!novoValor.repetir;
        frequenciaRepeticao.value = novoValor.repetir?.frequencia || 'semanal';
        temLembrete.value =
            novoValor.lembretes && novoValor.lembretes.length > 0;
    },
    { deep: true }
);
</script>
