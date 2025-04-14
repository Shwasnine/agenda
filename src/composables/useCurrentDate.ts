import { computed } from 'vue';
import { useStore } from '../stores/useStore';

const { State } = useStore();

const today = computed({
    get() {
        return State.today;
    },
    set(newValue) {
        State.today = newValue;
        localStorage.setItem('today', newValue.toString());
    },
});
const currentDate = computed({
    get() {
        return State.currentDate;
    },
    set(newValue) {
        State.currentDate = newValue;
        localStorage.setItem('currentDate', newValue.toString());
    },
});

export const useCurrentDate = () => {
    const setCurrentDate = (date: Date) => {
        currentDate.value = date;
    };
    const resetCurrentDate = () => {
        currentDate.value = today.value;
    };

    const nextMonth = () => {
        const nextMonthDate = new Date(currentDate.value.getTime());
        nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
        currentDate.value = nextMonthDate;
    };
    const prevMonth = () => {
        const prevMonthDate = new Date(currentDate.value.getTime());
        prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
        currentDate.value = prevMonthDate;
    };

    const nextYear = () => {
        const nexYearDate = new Date(currentDate.value.getTime());
        nexYearDate.setFullYear(nexYearDate.getFullYear() + 1);
        currentDate.value = nexYearDate;
    };

    const prevYear = () => {
        const prevYearDate = new Date(currentDate.value.getTime());
        prevYearDate.setFullYear(prevYearDate.getFullYear() - 1);
        currentDate.value = prevYearDate;
    };

    const isToday = (date: Date) => {
        const todayDate = new Date(
            today.value.getFullYear(),
            today.value.getMonth(),
            today.value.getDate()
        );
        const compareDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        return todayDate.getTime() === compareDate.getTime();
    };

    const isCurrentDate = (date: Date) => {
        const currentDateValue = new Date(
            currentDate.value.getFullYear(),
            currentDate.value.getMonth(),
            currentDate.value.getDate()
        );
        const compareDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        return currentDateValue.getTime() === compareDate.getTime();
    };

    const isTomorrow = (date: Date) => {
        const tomorrowDate = new Date(
            today.value.getFullYear(),
            today.value.getMonth(),
            today.value.getDate() + 1
        );
        const compareDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        return tomorrowDate.getTime() === compareDate.getTime();
    };
    const isYesterday = (date: Date) => {
        const yesterdayDate = new Date(
            today.value.getFullYear(),
            today.value.getMonth(),
            today.value.getDate() - 1
        );
        const compareDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        return yesterdayDate.getTime() === compareDate.getTime();
    };
    const isSameMonth = (date: Date) => {
        const todayDate = new Date(
            today.value.getFullYear(),
            today.value.getMonth()
        );
        const compareDate = new Date(date.getFullYear(), date.getMonth());
        return todayDate.getTime() === compareDate.getTime();
    };
    const isSameYear = (date: Date) => {
        const todayDate = new Date(today.value.getFullYear());
        const compareDate = new Date(date.getFullYear());
        return todayDate.getTime() === compareDate.getTime();
    };
    const isSameDate = (date: Date) => {
        const todayDate = new Date(
            today.value.getFullYear(),
            today.value.getMonth(),
            today.value.getDate()
        );
        const compareDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );
        return todayDate.getTime() === compareDate.getTime();
    };

    (window as any).setCurrentDate = setCurrentDate;

    return {
        today,
        currentDate,
        setCurrentDate,
        resetCurrentDate,

        nextMonth,
        prevMonth,
        nextYear,
        prevYear,

        isToday,
        isTomorrow,
        isCurrentDate,
        isYesterday,
        isSameMonth,
        isSameYear,
        isSameDate,
    };
};
