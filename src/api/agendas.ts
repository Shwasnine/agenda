import uuid from '../utils/uuid';
import type { AgendaType, EventType } from '../utils/types';

class Agenda implements AgendaType {
    id: string;
    name: string;
    description: string;
    color: string;
    events: EventType[];
    createdAt: Date;
    updatedAt: Date;

    constructor(calendarData: Partial<AgendaType>) {
        this.id = calendarData.id || uuid();
        this.name = calendarData.name || '';
        this.description = calendarData.description || '';
        this.color = calendarData.color || '#222222';
        this.events = calendarData.events || [];
        this.createdAt = calendarData.createdAt || new Date();
        this.updatedAt = calendarData.updatedAt || new Date();
    }

    addEvent(event: EventType): void {
        this.events.push(event);
        this.updatedAt = new Date();
    }

    removeEvent(eventId: string): void {
        this.events = this.events.filter((event) => event.id !== eventId);
        this.updatedAt = new Date();
    }
}
