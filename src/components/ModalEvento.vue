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
                    <form
                        class="d-flex flex-column gap-3"
                        @submit.prevent="handleSubmit"
                    >
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

                        <div class="d-flex gap-3 flex-wrap">
                            <div class="flex-grow-1">
                                <label>Início</label>

                                <div class="d-flex gap-3">
                                    <input type="date" class="form-control" />

                                    <input type="time" class="form-control" />
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <label>Fim</label>

                                <div class="d-flex gap-3">
                                    <input type="date" class="form-control" />

                                    <input type="time" class="form-control" />
                                </div>
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
import { v4 as uuidv4 } from 'uuid';
import { ref, watch, onMounted, onUpdated, inject } from 'vue';
import type { Evento } from '../models/Evento';
import { FrequenciaRepeticao, TipoLembrete } from '../models/Evento';
import { useCurrentDate } from '../composables/useCurrentDate';
import { Modal } from 'bootstrap';

const modalEventoOpen = inject<boolean>('modalEventoOpen');

const PROPS = defineProps<{
    isOpen: boolean;
    eventoInicial: Evento;
    usuarioAtual: string;
}>();

const { currentDate } = useCurrentDate();

// Data
const evento = ref<Evento>();
const temRepeticao = ref(!!PROPS.eventoInicial.repetir);
const frequenciaRepeticao = ref(
    PROPS.eventoInicial.repetir?.frequencia || FrequenciaRepeticao.SEMANAL
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

// Métodos
const validarFormulario = () => {
    const novosErros: { [key: string]: string } = {};

    if (evento.value?.titulo.trim()) {
        novosErros.titulo = 'O título é obrigatório';
    }

    if (!evento.value?.dataFim) {
        novosErros.dataInicio = 'A data de início é obrigatória';
    }

    if (!evento.value?.dataFim) {
        novosErros.dataFim = 'A data de término é obrigatória';
    }

    if (
        evento.value?.dataFim &&
        evento.value.dataInicio &&
        evento.value?.dataFim < evento.value?.dataInicio
    ) {
        novosErros.dataFim =
            'A data de término deve ser superior à data de iníncio';
    }

    return Object.keys(novosErros).length === 0;
};

const handleSubmit = () => {
    if (!evento.value) return;

    if (!validarFormulario()) return;

    // construindo o novo evento
    const novoEvento: Evento = {
        ...evento.value,
        id: evento.value.id || uuidv4(),
        criadoPor: evento.value.criadoPor || PROPS.usuarioAtual,
        criadoEm: evento.value.criadoEm || new Date(),
        modificadoEm: new Date(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    // Adicionando regras de repetição se habilitado
    if (temRepeticao.value) {
        novoEvento.repetir = {
            frequencia: frequenciaRepeticao.value,
            intervalo: 1,
            // Outros campos de configuração de repetição

            // diasSemana?: number[]
            // diaDoMes?: number
            // terminaEm?: Date
            // terminaApos?: number
            // excecoes?: Date[]
        };
    } else {
        delete evento.value.repetir;
    }

    // Adicionando lembretes
    if (temLembrete.value) {
        evento.value.lembretes = [
            {
                id: uuidv4(),
                antecedencia: 30,
                tipo: TipoLembrete.NOTIFICACAO,
            },
        ];
    } else {
        delete evento.value.lembretes;
    }

    console.log('Salvar o evento aqui...');
    modalInstance.value?.hide();
};

// Hooks
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
        frequenciaRepeticao.value =
            novoValor.repetir?.frequencia || FrequenciaRepeticao.SEMANAL;
        temLembrete.value =
            novoValor.lembretes && novoValor.lembretes.length > 0;
    },
    { deep: true }
);
</script>
