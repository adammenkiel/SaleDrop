import { Pool, QueryResult } from "pg";
import { AppError } from "../exception/app-errors";

export class SaleDropPayService {
    
    public db: Pool;
    
    constructor(database: Pool) {
        this.db = database;
    }

    async getUserWalletBalance(userName: string): Promise<number> {
        const res = await this.db.query(
            "SELECT w.money FROM wallet w JOIN users u ON u.id=w.id WHERE u.username=$1",
            [userName]
        );
        return res.rows[0]?.money ?? 0;
    }

    async payForTicket(userName: string, ticket_id: string) 
    {
        const cost = (await this.db.query("SELECT cost FROM tickets WHERE ticket_id=$1", [ticket_id])).rows[0].cost;
        const userId = (await this.db.query("SELECT id FROM users WHERE username=$1", [userName])).rows[0].id;
        const res = await this.buyQuery(userId, ticket_id, cost);
        

        if(res == null || res.rowCount == null || res.rows.length == 0)
            return {result: false};
        return {result: res.rowCount > 0};
    }

    async payForTicketUserId(userId: string, ticket_id: string) 
    {
        const cost = (await this.db.query("SELECT cost FROM tickets WHERE ticket_id=$1", [ticket_id])).rows[0].cost;
        const res = await this.buyQuery(userId, ticket_id, cost);

        if(res == null || res.rowCount == null || res.rows.length == 0)
            return {result: false};
        return {result: res.rowCount > 0};
    }

    async buyQuery(userId: string, ticketId: string, cost: number) : Promise<QueryResult<any>> {
        const client = await this.db.connect();
        try {
            await client.query("BEGIN");
            const reservationInfo = await client.query("SELECT *, end_date<NOW() AS expired FROM reservations WHERE user_id=$1 AND ticket_id=$2 FOR UPDATE", [userId, ticketId]);
            if(reservationInfo.rows.length === 0) {
                throw new AppError("RESERVATION_EXPIRED", 400);
            }
            if(reservationInfo.rows[0].status === "SUCCESS") {
                throw new AppError("RESERVATION_ALREADY_PAID", 400);
            }
            if(reservationInfo.rows[0].expired) {
                throw new AppError("RESERVATION_EXPIRED", 400);
            }
            await client.query("UPDATE reservations SET status=$3 WHERE user_id=$1 AND ticket_id=$2", [userId, ticketId, "SUCCESS"]);
            const res = await client.query("UPDATE wallet SET money=money-$1 WHERE id=$2 AND money>=$1 RETURNING money", [cost, userId]);
            if(res.rows.length === 0) {
                throw new AppError("NO_MONEY", 400);
            }
            await client.query("COMMIT");
            return res;
        } catch(err) {
            await client.query("ROLLBACK");
            client.release();
            throw err;
        } finally {
            client.release();
        }
    }

    async createWallet(userId: string | number, money: number) {
        await this.db.query("INSERT INTO wallet (id, money) VALUES ($1, $2)", [userId, money]);
    }
}
