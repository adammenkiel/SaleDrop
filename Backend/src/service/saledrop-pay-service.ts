import { Pool } from "pg";

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
        return res.rows[0]?.balance ?? 0;
    }

    //To correct
    async payMoney(userName: string, money: number) : Promise<boolean> {
        const userId = (await this.db.query("SELECT id FROM users WHERE username=$1", [userName])).rows[0].id;
        const res = await this.db.query("UPDATE wallet SET money=money-$1 WHERE id=$2 AND money>=$1", [money, userId]);
        if(res == null || res.rowCount == null)
            return false;
        return res.rowCount > 0;
    }
}