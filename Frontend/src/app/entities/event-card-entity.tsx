export type EventCardEntity = {
    ticket_id: string,
    name: string,
    short_description: string,
    description: string,
    ticket_date: Date,
    start_event_date: Date,
    end_event_date: Date
    cost: number,
    amount?: number
}