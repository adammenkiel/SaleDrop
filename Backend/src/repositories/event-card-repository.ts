import { Pool } from "pg";
import { UserProfile } from "../auth/user-profile";
import { EventCard } from "../db/entities/event-card";

export class EventCardRepository {

    public db: Pool;

    constructor(database: Pool) {
        this.db = database;
    }

    async getAll() : Promise<EventCard[]> {
        const res = await this.db.query("SELECT * FROM tickets");
        return res.rows;
    }

    async getEventCardById(id: number): Promise<EventCard> {
        const res = await this.db.query("SELECT * FROM tickets WHERE ticket_id=$1", [id]);
        const eventCard: EventCard = res.rows[0] as EventCard;
        const resInfo = await this.db.query("SELECT * FROM ticket_info WHERE ticket_id=$1", [id]);
        eventCard.amount = resInfo.rows[0].tickets_amount;
        return eventCard;
    }
    
}