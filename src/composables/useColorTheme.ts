import { ref, watch } from 'vue';

export const useColorTheme = () => {
    const currentTheme = ref<string>('light');
    const darkMode = ref<boolean>(false);

    const setTheme = (theme: string) => {
        currentTheme.value = theme;
        darkMode.value = theme === 'dark';
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme); // Salva a preferência do tema no localStorage
    };

    const toggleTheme = () => {
        const newTheme = darkMode.value ? 'light' : 'dark';
        setTheme(newTheme);
    };

    const setDarkMode = (isDark: boolean) => {
        darkMode.value = isDark;
        const newTheme = isDark ? 'dark' : 'light';
        setTheme(newTheme);
    };

    watch(darkMode, (newValue) => {
        const newTheme = newValue ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // Inicializa o tema com base na preferência do usuário
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme'); // Obtém a preferência do tema salva no localStorage

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Adiciona um listener para mudanças na preferência do usuário
    prefersDarkScheme.addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
    });

    return {
        currentTheme,
        darkMode,
        setTheme,
        toggleTheme,
        setDarkMode,
    };
};
