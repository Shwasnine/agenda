<template>
    <div
        class="agenda__filtro"
        :class="{ 'agenda__filtro--selected': isSelected }"
        :style="{ '--agenda-color': PROPS.cor }"
    >
        <div class="agenda__filtro__option">
            <div class="agenda__checkbox" @click.prevent="toggleSelection">
                <Check v-if="isSelected" />
            </div>
            <div class="agenda__name">{{ nome }}</div>
        </div>

        <div class="dropdown ms-auto dropendown-end">
            <button
                class="btn"
                ref="dropdownToggler"
                @click.prevent.stop="toggleMenu"
                :aria-expanded="shown"
            >
                <EllipsisVertical />
            </button>
        </div>
    </div>

    <Teleport to="body">
        <div
            class="dropdown-menu dropdown__cores__agenda"
            :class="{ show: shown }"
            ref="dropdownMenu"
        >
            <div class="dropdown-header fw-bold">Alterar Cor da Agenda</div>
            <!-- <button class="dropdown-item text-truncate">
                Exibir apenas esta
            </button>
            <button class="dropdown-item text-truncate">
                Configurações e compartilhamento
            </button> -->

            <div class="dropdown-divider"></div>

            <div class="d-flex gap-2 px-2 flex-wrap" ref="colorContainer">
                <div
                    v-for="item in materialColorList"
                    class="agenda__color__item"
                    :class="{
                        'agenda__color__item--selected': true,
                    }"
                    :style="{ backgroundColor: item.color }"
                    v-tooltip="{
                        title: item.name,
                    }"
                    @click.prevent="changeColor(item.color)"
                >
                    <Check v-if="isSelectedColor(item.color)" />
                    <span class="visually-hidden">{{ item.name }}</span>
                </div>
            </div>
        </div>
    </Teleport>
    <!-- /.agenda__filtro-->
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { createPopper, offset } from '@popperjs/core';

import { Check, EllipsisVertical } from 'lucide-vue-next';
import { useColors } from '../composables/useCores';
import { Cores } from '../models/Cores';

const PROPS = defineProps<{
    id: number | string;
    nome: string;
    cor: Cores;
    selected: boolean;
}>();

const emit = defineEmits<{
    (
        e: 'update:selected',
        payload: { selected: boolean; id: number | string; cor?: string }
    ): void;
}>();

const dropdownToggler = ref<HTMLElement | null>(null);
const dropdownMenu = ref<HTMLElement | null>(null);
const colorContainer = ref<HTMLElement | null>(null);

const { materialColorList } = useColors();

const isSelected = computed(() => PROPS.selected);
const popperInstance = ref();
const shown = ref<boolean>(false);

// Métodos
const toggleSelection = () => {
    emit('update:selected', {
        selected: !PROPS.selected,
        id: PROPS.id,
    });
};

const isSelectedColor = (color: string) => {
    return color == PROPS.cor;
};

const toggleMenu = () => {
    if (shown.value) return closeMenu();

    openMenu();
};

const openMenu = () => {
    if (!popperInstance.value) return;

    shown.value = true;

    popperInstance.value.update();
};

const closeMenu = () => {
    shown.value = false;
};

const changeColor = (color: string) => {
    emit('update:selected', {
        id: PROPS.id,
        selected: isSelected.value,
        cor: color,
    });
};

onMounted(() => {
    if (!dropdownToggler.value || !dropdownMenu.value) return;

    popperInstance.value = createPopper(
        dropdownToggler.value,
        dropdownMenu.value,
        {
            placement: 'right',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        }
    );

    document.addEventListener('click', closeMenu);
});
</script>

<style lang="scss" scoped>
.agenda__filtro--selected {
    .agenda__checkbox {
        background: var(--agenda-color);
        color: #fff;
    }
}

.agenda__filtro {
    border-radius: 0.5rem;

    display: grid;
    grid-template-columns: 1fr min-content;

    &:hover,
    &:has([aria-expanded='true']) {
        background: #eee;
    }

    .btn {
        --bs-btn-border-radius: 0.5rem;
        --bs-btn-hover-bg: rgba(0, 0, 0, 0.11);

        &:is([aria-expanded='true']) {
            --bs-btn-bg: var(--bs-btn-hover-bg);
        }
    }
}

.agenda__checkbox {
    width: 1.5em;
    height: 1.5em;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 2px solid var(--agenda-color);
    border-radius: 0.3rem;

    cursor: pointer;
}

.agenda__filtro__option {
    padding-left: 0.75rem;
    padding-right: 0.75rem;

    display: grid;
    grid-template-columns: 1.5em 1fr;
    grid-gap: 0.5rem;
    align-items: center;
}

.agenda__name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.agenda__color__item {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 14px;
        height: 14px;
        color: #fff;
    }
}

.dropdown-menu {
    max-width: 250px;
}
</style>

<style>
.dropdown__cores__agenda {
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.6);
}
</style>
