import { computed } from 'vue';
import { useStore } from '../stores/useStore';

type ViewMode = 'day' | 'week' | 'month' | 'year';
export type ViewModeText = {
    day: 'Dia';
    week: 'Semana';
    month: 'Mês';
    year: 'Ano';
};
const viewModeText: ViewModeText = {
    day: 'Dia',
    week: 'Semana',
    month: 'Mês',
    year: 'Ano',
};

const { State } = useStore();
const viewMode = computed({
    get() {
        return State.viewMode;
    },
    set(newValue) {
        State.viewMode = newValue;
        localStorage.setItem('viewMode', newValue);
    },
});

export const useViewMode = () => {
    const setViewMode = (mode: ViewMode) => {
        State.viewMode = mode;
    };

    const resetViewMode = () => {
        State.viewMode = 'month';
    };

    const isViewMode = (mode: ViewMode) => {
        return State.viewMode === mode;
    };

    return {
        viewMode,
        viewModeText,
        setViewMode,
        resetViewMode,
        isViewMode,
    };
};
