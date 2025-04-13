<template>
    <div
        class="agenda__filtro"
        :class="{ 'agenda__filtro--selected': isSelected }"
        :style="{ '--agenda-color': PROPS.color }"
    >
        <div class="agenda__filtro__option" @click.prevent="toggleSelection">
            <div class="agenda__checkbox">
                <Check v-if="isSelected" />
            </div>
            <div class="agenda__name">Agenda A</div>
        </div>

        <div class="dropdown ms-auto dropendown-end">
            <button class="btn" data-bs-toggle="dropdown">
                <EllipsisVertical />
            </button>

            <div class="dropdown-menu">
                <button class="dropdown-item text-truncate">
                    Exibir apenas esta
                </button>
                <button class="dropdown-item text-truncate">
                    Configurações e compartilhamento
                </button>

                <div class="dropdown-divider"></div>

                <div class="d-flex gap-2 px-2 flex-wrap" ref="colorContainer">
                    <div
                        v-for="item in materialColorList"
                        class="agenda__color__item"
                        :class="{
                            'agenda__color__item--selected':
                                isSelectedColor(item),
                        }"
                        :style="{ backgroundColor: item.color }"
                        v-tooltip="{
                            title: item.name,
                        }"
                        @click.prevent="selectNewColor(item)"
                    >
                        <Check v-if="isSelectedColor(item)" />
                        <span class="visually-hidden">{{ item.name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /.agenda__filtro-->
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { Check, EllipsisVertical } from 'lucide-vue-next';
import { useColors } from '../composables/useCores';

const PROPS = defineProps<{
    id: number | string;
    name: string;
    color: string;
    selected: boolean;
}>();

const emit = defineEmits<{
    (
        e: 'update:selected',
        payload: { selected: boolean; id: number | string; color?: string }
    ): void;
}>();

const colorContainer = ref<HTMLElement | null>(null);

const { materialColorList } = useColors();

const isSelected = computed(() => PROPS.selected);

const isSelectedColor = (item: { name: string; color: string }) =>
    item.name === PROPS.name || item.color === PROPS.color;

const toggleSelection = () => {
    emit('update:selected', {
        selected: !PROPS.selected,
        id: PROPS.id,
    });
};

const selectNewColor = (item: { name: string; color: string }) => {
    if (item.name === PROPS.name || item.color === PROPS.color) {
        return;
    }

    emit('update:selected', {
        selected: PROPS.selected,
        id: PROPS.id,
        color: item.color,
    });
};
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

    &:hover {
        background: #eee;
    }

    .btn {
        --bs-btn-border-radius: 0.5rem;
        --bs-btn-hover-bg: rgba(0, 0, 0, 0.11);
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
