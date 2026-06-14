import { Pool } from "pg";

export class SaleDropPayService {
    
    public db: Pool;
    
    constructor(database: Pool) {
        this.db = database;
    }

    async getUserWalletBalance(userName: string): Promise<number> {
        console.log(userName);
        const res = await this.db.query(
            "SELECT w.money FROM wallet w JOIN users u ON u.id=w.id WHERE u.username=$1",
            [userName]
        );
        return res.rows[0]?.money ?? 0;
    }

    /**
    @depreated it's recommended to use payForTicket function
    */
    async payMoney(userName: string, money: number) {
        const userId = (await this.db.query("SELECT id FROM users WHERE username=$1", [userName])).rows[0].id;
        const res = await this.db.query("UPDATE wallet SET money=money-$1 WHERE id=$2 AND money>=$1 RETURNING money", [money, userId]);
        if(res == null || res.rowCount == null || res.rows.length == 0)
            return {result: false};
        return {result: res.rowCount > 0};
    }

    async payForTicket(userName: string, ticket_id: string) 
    {
        console.log(userName + " " + ticket_id)
        const cost = (await this.db.query("SELECT cost FROM tickets WHERE ticket_id=$1", [ticket_id])).rows[0].cost;
        const userId = (await this.db.query("SELECT id FROM users WHERE username=$1", [userName])).rows[0].id;
        const res = await this.db.query("UPDATE wallet SET money=money-$1 WHERE id=$2 AND money>=$1 RETURNING money", [cost, userId]);
        
        console.log(cost + " - " + userId + " - " + res);
        
        if(res == null || res.rowCount == null || res.rows.length == 0)
            return {result: false};
        return {result: res.rowCount > 0};
    }
}
