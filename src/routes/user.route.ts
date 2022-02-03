
/*

TAREFAS A SEREM CUMPRIDAS
CRUD DE USUARIO COMPLETO

GET / USERS
GET USERS / :UUID
POST / USERS
PUT / USERS
DELETE / USERS / :UUID

*/

import express, { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import Repository from "../repositories/user.repository";


const usersRoute = Router();

usersRoute.get("/users",async (req: Request, res: Response, next: NextFunction) => {
    const users = await Repository.findAllUsers()
    res.status(StatusCodes.OK).send(users)
})


usersRoute.get("/users/:uuid", async (req: Request<{uuid: string}>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid
        const user = await Repository.findUserById(uuid)

        res.status(StatusCodes.OK).send(user)
    } catch (error) {
        next(error)
        
    }
})

usersRoute.post("/users", async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newUser = req.body
        const uuid = await Repository.createUser(newUser)

        res.status(StatusCodes.CREATED).send(uuid)
    } catch (error) {
        next(error)
        
    }




})

usersRoute.patch("/users/:uuid", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = req.body;    
        user.uuid = uuid;
        await Repository.updateUser(user);
        
        res.sendStatus(StatusCodes.OK);
        
    } catch (error) {
        next(error)
    }

})

usersRoute.delete("/users/:uuid", async (req: Request, res: Response, next: NextFunction) => {
try {
    const uuid = req.params.uuid
    await Repository.removeUser(uuid)
    res.status(StatusCodes.GONE).send(`${uuid} has been deleted`)
} catch (error) {
    next(error)
}
})


export default usersRoute;

