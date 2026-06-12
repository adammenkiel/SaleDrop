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
    
}