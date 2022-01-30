import { response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../db";
import user from "../models/user.model";

class userRepository {
    async findAllUsers(): Promise<user[]> {
        const query = "select username, uuid from aplication_user";

        const result = await db.query<user>(query)
        const rows = result.rows
        return rows || [];
    }

    async findById(uuid: string) {
        const query = `SELECT username, uuid FROM aplication_user WHERE uuid = $1`;

        const values = [uuid]
        const { rows } = await db.query<user>(query, values);
        const [user] = rows
        return user;

    }

    async createUser(user: user): Promise<string> {

        const values = [user.userName, user.password]

        const query = "INSERT INTO aplication_user(username, password) VALUES($1,  crypt($2, 'my_salt') ) RETURNING uuid"

        const { rows } = await db.query<{uuid: string}>(query, values)
        const [newUser] = rows
        return newUser.uuid
    }
    async updateUser(user: user): Promise<void> {
        const query =  `UPDATE aplication_user  
                        SET username = $1,  
                            password = crypt($2, 'my_salt')
                        WHERE uuid = $3` ;

        const values = [user.userName, user.password, user.uuid];
        await db.query(query, values);
        response.sendStatus(StatusCodes.OK)
        
    }
    async removeUser(uuid: string): Promise<void> {
        const query =  `DELETE from aplication_user  
                        WHERE uuid = $1` ;

        const values = [uuid];
        await db.query(query, values);

        
    }

}

export default new userRepository();