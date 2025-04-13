<template>
    <div class="dropdown">
        <button class="btn btn-calendar-light" data-bs-toggle="dropdown">
            <Settings />
        </button>

        <div class="dropdown-menu">
            <button class="dropdown-item" type="button">
                <Settings />
                <span>Configurações</span>
            </button>
            <button class="dropdown-item" type="button">
                <Trash />
                <span>Lixeira</span>
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" type="button">Outro Item</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Settings, Trash } from 'lucide-vue-next';
</script>

<style lang="scss" scoped>
.dropdown-menu {
    --bs-dropdown-item-padding-y: 0.5em;
}

.dropdown-item {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
</style>
