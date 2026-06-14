export const TicketSchema = {
    type: "object",
    required: ["ticket_id"],
    properties: {
        ticket_id: {
            type: "string"
        }
    }
}

export type TicketIdBody = {
    ticket_id: string;
}
