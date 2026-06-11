import { Pool } from "pg";
import { RegisterBody } from "../auth/auth-schemas";
import bcrypt from "bcrypt"

export class UserRepository {

    public db: Pool;

    constructor(database: Pool) {
        this.db = database;
    }

    async saveUser(user : RegisterBody) : Promise<void> {
        var hashPass = bcrypt.hash(user.password);
        this.db.query("");
    }
}