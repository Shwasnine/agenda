<template>
    <div class="dropdown">
        <button
            class="btn btn-primary d-flex gap-2 align-items-center w-100"
            data-bs-toggle="dropdown"
        >
            <Plus />
            <span>Criar</span>

            <ChevronDown class="ms-auto" />
        </button>

        <div class="dropdown-menu">
            <button
                class="dropdown-item"
                @click.prevent="modalEventoOpen = true"
            >
                Evento
            </button>
            <button class="dropdown-item">Agenda</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { Plus, ChevronDown } from 'lucide-vue-next';

const modalEventoOpen = inject<boolean>('modalEventoOpen');
</script>

<style lang="scss" scoped>
.btn {
    --bs-btn-font-weight: 600;
    --bs-btn-font-size: 1.25rem;
    --bs-btn-padding-y: 0.5rem;
}

.dropdown-menu {
    width: clamp(180px, 100%, 250px);
}

.dropdown-item {
    --bs-dropdown-item-padding-y: 0.5rem;
}
</style>
