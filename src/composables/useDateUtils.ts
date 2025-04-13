export function useDateUtils(locale: string = 'pt-BR') {
    /**
     * Converte uma data para formato ISO
     */
    const toISO = (date: Date) => date.toISOString();

    /**
     * Formata a data usando o método de formatação manual
     */
    const formatDate = (date: Date, format: string) => {
        const month = date.getMonth() + 1; // Meses são baseados em zero
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();
        const formattedDate = format
            .replace('YYYY', year.toString())
            .replace('MM', month < 10 ? '0' + month : month.toString())
            .replace('DD', day < 10 ? '0' + day : day.toString())
            .replace('HH', hours < 10 ? '0' + hours : hours.toString())
            .replace('mm', minutes < 10 ? '0' + minutes : minutes.toString())
            .replace('ss', seconds < 10 ? '0' + seconds : seconds.toString())
            .replace(
                'SSS',
                milliseconds < 10
                    ? '00' + milliseconds
                    : milliseconds < 100
                    ? '0' + milliseconds
                    : milliseconds.toString()
            );
        return formattedDate;
    };

    /**
     * Formata a data usando a API Intl.DateTimeFormat para internacionalização
     */
    const formatLocalized = (
        date: Date,
        options: Intl.DateTimeFormatOptions = {}
    ) => {
        return new Intl.DateTimeFormat(locale, options).format(date);
    };

    /**
     * Retorna a data por extenso no formato local (ex: "12 de abril de 2025")
     */
    const formatLongDate = (date: Date) => {
        return formatLocalized(date, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    /**
     * Formata apenas a data no estilo local
     */
    const formatLocalDate = (date: Date) => {
        return formatLocalized(date, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    /**
     * Formata apenas o horário no estilo local
     */
    const formatLocalTime = (date: Date) => {
        return formatLocalized(date, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    /**
     * Formata a data e hora completas no estilo local
     */
    const formatLocalDateTime = (date: Date) => {
        return formatLocalized(date, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    /**
     * Retorna o nome do mês conforme o locale
     */
    const getMonthName = (
        date: Date,
        style: 'long' | 'short' | 'narrow' = 'long'
    ) => {
        return formatLocalized(date, { month: style });
    };

    /**
     * Retorna o nome do dia da semana conforme o locale
     */
    const getWeekdayName = (
        date: Date,
        style: 'long' | 'short' | 'narrow' = 'long'
    ) => {
        return formatLocalized(date, { weekday: style });
    };

    /**
     * Formata uma data relativa (há X dias, em X dias, etc)
     */
    const formatRelative = (date: Date) => {
        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
        const now = new Date();
        const diffInMs = date.getTime() - now.getTime();
        const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return rtf.format(0, 'day'); // hoje
        if (diffInDays === 1) return rtf.format(1, 'day'); // amanhã
        if (diffInDays === -1) return rtf.format(-1, 'day'); // ontem
        if (diffInDays > 1 && diffInDays < 7)
            return rtf.format(diffInDays, 'day'); // em X dias
        if (diffInDays < 0 && diffInDays > -7)
            return rtf.format(diffInDays, 'day'); // há X dias

        // Para datas mais distantes, simplesmente formata a data
        return formatLocalDate(date);
    };

    /**
     * Formata a data no estilo "Mês de Ano"
     */
    const formatMonthYear = (date: Date) => {
        return formatLocalized(date, {
            month: 'long',
            year: 'numeric',
        });
    };

    return {
        toISO,
        formatDate,
        formatLocalized,
        formatLongDate,
        formatLocalDate,
        formatLocalTime,
        formatLocalDateTime,
        getMonthName,
        getWeekdayName,
        formatRelative,
        formatMonthYear,
    };
}
