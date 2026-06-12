
export type EventCard = {
    type_id: number,
    name: string,
    short_description: string,
    ticket_date: Date,
    start_event_date: Date,
    end_event_date: Date
    cost?: number,
    amount?: number
}