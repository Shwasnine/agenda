import type { EventType } from '../utils/types';
import uuid from '../utils/uuid';

class Evento implements EventType {
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
        daysOfWeek?: number[];
        dayOfMonth?: number;
        monthOfYear?: number;
    };
    reminders?: {
        type: 'popup' | 'email';
        minutes: number;
    }[];
    createdAt: Date;
    updatedAt: Date;

    constructor(eventData: Partial<EventType>) {
        this.id = eventData.id || uuid();
        this.title = eventData.title || '';
        this.description = eventData.description || '';
        this.start = eventData.start || new Date();
        this.end = eventData.end || new Date();
        this.allDay = eventData.allDay || false;
        this.location = eventData.location || '';
        this.attendees = eventData.attendees || [];
        this.recurrence = eventData.recurrence;
        this.reminders = eventData.reminders;
        this.createdAt = eventData.createdAt || new Date();
        this.updatedAt = eventData.updatedAt || new Date();
    }
}
