import { Pool } from "pg";
import { RegisterBody } from "../auth/auth-schemas";
import bcrypt from "bcrypt"

export class UserRepository {

    public db: Pool;

    constructor(database: Pool) {
        this.db = database;
    }

    async saveUser(user : RegisterBody) : Promise<void> {
        var hashPass = await bcrypt.hash(user.password, 10);
        await this.db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
            [user.username, user.email, hashPass]
        );
    }

    async findUserByName(userName: string) : Promise<RegisterBody> {
        const res = await this.db.query("SELECT * FROM users WHERE username = $1", [userName]);
        return res.rows[0];
    }
}