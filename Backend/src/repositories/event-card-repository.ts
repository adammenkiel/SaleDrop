import { Pool } from "pg";
import { UserProfile } from "../auth/user-profile";
import { EventCard } from "../db/entities/event-card";

export class EventCardRepository {

    public db: Pool;

    constructor(database: Pool) {
        this.db = database;
    }

    private parse(obj: any) : EventCard {
        return {
                ticket_id: obj.ticket_id,
                name: obj.name,
                short_description: obj.short_description,
                description: obj.description,
                ticket_date: new Date(obj.ticket_date),
                start_event_date: new Date(obj.start_event_date),
                end_event_date: new Date(obj.end_event_date),
                cost: Number(obj.cost),
                amount: obj.amount ? Number(obj.amount) : 0
        }
    }

    async getAll() : Promise<EventCard[]> {
        const res = await this.db.query("SELECT * FROM tickets");
        return res.rows.map(row => this.parse(row));
    }

    async getEventCardById(id: number): Promise<EventCard> {
        const res = await this.db.query("SELECT * FROM tickets WHERE ticket_id=$1", [id]);
        const eventCard  = res.rows[0];
        const resInfo = await this.db.query("SELECT * FROM ticket_info WHERE ticket_id=$1", [id]);
        if (resInfo.rows.length === 0) 
            throw new Error(`ticket_info missing for ticket_id=${id}`);
        eventCard.amount = resInfo.rows[0].tickets_amount;
        return this.parse(eventCard);
    }
}