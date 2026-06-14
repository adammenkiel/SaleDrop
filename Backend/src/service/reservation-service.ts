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
            if(response.rowCount === 0) {
                throw new AppError("No tickets avaliable!", 400);
            }
            const selQuery = await client.query(
                "SELECT end_date FROM reservations WHERE user_id=$1 AND ticket_id=$2 AND NOW() > end_date FOR UPDATE",
                [userId, ticketId]
            )
            console.log(selQuery.rows);
            if(selQuery.rows.length === 0) {
                await client.query(
                    "INSERT INTO reservations (user_id, ticket_id, end_date, status) VALUES ($1, $2, $3, $4)",
                    [userId, ticketId, new Date(Date.now() + 5 * 60 * 1000) , "PENDING"]);
            } else {
                await client.query(
                    "UPDATE reservations SET end_date=$3 WHERE ticket_id=$1 AND user_id=$2",
                    [ticketId, userId, new Date(Date.now() + 5 * 60 * 1000)]
                );
            }
            await client.query("COMMIT");
        } catch(err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    async cancelReservation(userId: string, ticketId: string) : Promise<void> {
        const client = await this.db.connect();
        try {
            await client.query("BEGIN");
            const response = await client.query(
                "DELETE FROM reservations WHERE user_id=$1 AND ticket_id=$2 RETURNING 1",
                [userId, ticketId]);
            
            if(response.rowCount === 0) {
                throw new AppError("No reservation!", 400);
            }

            await client.query(
                "UPDATE ticket_info SET tickets_amount=tickets_amount+1 WHERE ticket_id=$1",
                [ticketId]
            );
            await client.query("COMMIT");
        } catch(err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    async successReservation(userId: string, ticketId: string) : Promise<void> {
        const client = await this.db.connect();
        try {
            await client.query("BEGIN");
            const response = await client.query(
                "DELETE FROM reservations WHERE user_id=$1 AND ticket_id=$2 RETURNING 1",
                [userId, ticketId]);
            
            if(response.rowCount === 0) {
                throw new AppError("No reservation!", 400);
            }
            await client.query("COMMIT");
        } catch(err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    async checkReservation(userId: string, ticketId: string): Promise<boolean> {
        const response = await this.db.query(
            "SELECT 1 FROM reservations WHERE user_id=$1 AND ticket_id=$2 AND NOW() < end_date LIMIT 1",
            [userId, ticketId]
        )
        return response.rows.length > 0;
    }
}