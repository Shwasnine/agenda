/**
 * Aqui estão as princioais propriedades
 * - `id`: um identificador único para o evento
 * - `title`: o título do evento
 * - `description`: a descrição do evento
 * - `start`: a data e hora de início do evento
 * - `end`: a data e hora de término do evento
 * - `allDay`: um booleano indicando se o evento é o dia todo
 * - `location`: o local do evento
 * - `attendees`: uma lista de participantes com seus nomes, e-mails e status de resposta
 * - `recurrence`: informações sobre a recorrência do evento (diário, semanal, mensal, anual)
 * - `reminders`: lembretes configurados para o evento (pop-up ou e-mail)
 * - `createdAt`: a data de criação do evento
 * - `updatedAt`: a data da última atualização do evento
 */
export type EventType = {
    id: string;
    title: string;
    description: string;
    start: Date;
    end: Date;
    allDay: boolean;
    location: string;
    attendees: {
        email: string;
        name: string;
        response: 'accepted' | 'declined' | 'tentative';
    }[];
    recurrence?: {
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
        interval: number;
        endDate?: Date;
        daysOfWeek?: number[]; // 0 = Sunday, 1 = Monday, etc.
        dayOfMonth?: number; // 1-31
        monthOfYear?: number; // 1-12
    };
    reminders?: {
        type: 'popup' | 'email';
        minutes: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
};

export type AgendaType = {
    id: string;
    name: string;
    description: string;
    color: string;
    events: EventType[];
    createdAt: Date;
    updatedAt: Date;
};
