import { Pool } from "pg";
import { AppError } from "../exception/app-errors";


export class ReservationService {
    
    public db: Pool;
    constructor(database: Pool) {
        this.db = database;
    }

    async startReservation(userId: string, ticketId: string) : Promise<void> {
        const client = await this.db.connect();
        try {
            await client.query("BEGIN");
            const response = await client.query(
                "UPDATE ticket_info SET tickets_amount=tickets_amount-1 WHERE ticket_id=$1 AND tickets_amount>0 RETURNING ticket_id",
                [ticketId]
            );
            if(response.rowCount == 0) {
                throw new AppError("No tickets avaliable!", 400);
            }
            await client.query(
                "INSERT INTO reservations (user_id, ticket_id, end_date, status) VALUES ($1, $2, $3, $4)",
                [userId, ticketId, new Date(Date.now() + 5 * 60 * 1000) , "PENDING"]);
            await client.query("COMMIT");
        } catch(err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    async checkReservation(): Promise<boolean> {
        
        return false;
    }
}