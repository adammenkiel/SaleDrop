import { Pool } from "pg";
import { AppError } from "../exception/app-errors";


export class ReservationService {
    
    public db: Pool;
    constructor(database: Pool) {
        this.db = database;
    }

    async startReservation(userId: string, ticketId: string) : Promise<void> {
        await this.cleanReservation(userId, ticketId);
        const client = await this.db.connect();
        try {
            await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE");
            const response = await client.query(
                "UPDATE ticket_info SET tickets_amount=tickets_amount-1 WHERE ticket_id=$1 AND tickets_amount>0 RETURNING ticket_id",
                [ticketId]
            );
            if(response.rowCount === 0) {
                throw new AppError("No tickets avaliable!", 400);
            }
            await client.query(
                "INSERT INTO reservations (user_id, ticket_id, end_date, status) VALUES ($1, $2, $3, $4)",
                [userId, ticketId, new Date(Date.now() + 5 * 60 * 1000) , "PENDING"]
            );
            await client.query("COMMIT");
        } catch(err) {
            await client.query("ROLLBACK");
            throw err;
        } finally {
            client.release();
        }
    }

    async cleanReservation(userId:string, ticketId: string): Promise<void> {
        const client = await this.db.connect();
        try {
        await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE");
        const ans = await client.query(
            "DELETE FROM reservations WHERE user_id=$1 AND ticket_id=$2 AND (NOW() > end_date OR status=$3) RETURNING status",
            [userId, ticketId, "SUCCESS"]
        );
        if(ans.rows.length > 0 && ans.rows[0].status === "PENDING") {
            await client.query(
                "UPDATE ticket_info SET tickets_amount=tickets_amount+1 WHERE ticket_id=$1",
                [ticketId]
            );
        }
        await client.query("COMMIT");
        console.log("COMMIT cleanRes");
        } catch(err) {
            await client.query("ROLLBACK");
            console.log("rollback cleanRes")
            throw err;
        } finally {
            client.release();
        }
    }

    async cancelReservation(userId: string, ticketId: string) : Promise<void> {
        const client = await this.db.connect();
        try {
            await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE");
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
            await client.query("BEGIN ISOLATION LEVEL SERIALIZABLE");
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
        await this.cleanReservation(userId, ticketId);
        const response = await this.db.query(
            "SELECT 1 FROM reservations WHERE user_id=$1 AND ticket_id=$2 AND NOW() < end_date AND status=$3 LIMIT 1",
            [userId, ticketId, "PENDING"]
        )
        return response.rows.length > 0;
    }
    async validateReservations() {
        console.log("Starting...");
        console.log("PID:", process.pid, "START"); 
        const client = await this.db.connect();
        try {
            await client.query("BEGIN");
            const response = await client.query(`
                WITH
                    deleted AS (
                        DELETE FROM reservations WHERE NOW() > end_date AND status=$1 RETURNING ticket_id
                    ),
                    amo AS (
                        SELECT ticket_id, COUNT(*) AS cnt FROM deleted GROUP BY ticket_id
                    )
                UPDATE ticket_info ti SET tickets_amount = ti.tickets_amount + amo.cnt FROM amo WHERE ti.ticket_id = amo.ticket_id
                RETURNING 1;
            `, ["PENDING"]);
            await client.query("COMMIT");
            console.log("Validated "+ response.rows.length + " reservations");
        } catch(err) {
            console.log(err);
            console.log("Validation rollback!");
            await client.query("ROLLBACK");
        } finally {
            client.release();
        }
        console.log("Ending...")
    }
}