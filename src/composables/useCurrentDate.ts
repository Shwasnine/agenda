import { ref } from 'vue';

const today = ref<Date>(new Date());
const currentDate = ref<Date>(today.value);

export const useCurrentDate = () => {
    const setCurrentDate = (date: Date) => {
        currentDate.value = date;
    };
    const resetCurrentDate = () => {
        currentDate.value = today.value;
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
        isToday,
        isTomorrow,
        isCurrentDate,
        isYesterday,
        isSameMonth,
        isSameYear,
        isSameDate,
    };
};
