<template>
    <div class="color__theme">
        <button class="btn btn-calendar-light" @click.prevent="toggleTheme">
            <Moon v-if="darkMode" />
            <Sun v-else />
        </button>
    </div>
</template>

<script lang="ts" setup>
import { Sun, Moon } from 'lucide-vue-next';

import { useColorTheme } from '../composables/useColorTheme';

const { darkMode, toggleTheme } = useColorTheme();
</script>
