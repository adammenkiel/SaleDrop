import { Pool } from "pg";
import { UserProfile } from "../auth/user-profile";
import bcrypt from "bcrypt";
import { AppError } from "../exception/app-errors";

export class UserRepository {

    public db: Pool;

    constructor(database: Pool) {
        this.db = database;
    }

    async saveUser(user : UserProfile) : Promise<void> {
        var hashPass = await bcrypt.hash(user.password, 10);
        try {
            await this.db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                [user.username, user.email, hashPass]
            );
        } catch(err) {
            throw new AppError("User with the same data (email or username) already exists!", 409);
        }
    }

    async findUserByName(userName: string) : Promise<UserProfile> {
        const res = await this.db.query("SELECT * FROM users WHERE username = $1", [userName]);
        return res.rows[0];
    }
}