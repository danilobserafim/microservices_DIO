/*
GET /USERS
GET /USERS/:UUID
POST /USERS
PUT /USERS/:UUID
DELETE /USERS/:UUID 
*/
import { NextFunction as Next, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repositorie";


const userRoute = Router()

userRoute.get("/users", async (req: Request, res: Response, next: Next) => {

    const user = await userRepository.findAllUsers();

    res.status(StatusCodes.OK).send(user);
})

userRoute.get("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: Next) => {

   const uuid = req.params.uuid
   const user = await userRepository.findById(uuid)
    res.status(StatusCodes.OK).send(user);
})

userRoute.post("/users", async (req: Request, res: Response, next: Next) => {
    const newUser = req.body;
    const uuid = await userRepository.createUser(newUser)

    res.status(StatusCodes.CREATED).send(uuid || "Nada Inserido")
})

userRoute.patch("/users/:uuid", async (req: Request<{ uuid: string }>, res: Response, next: Next) => {
    const uuid = req.params.uuid;
    const modifedUser = req.body;

    modifedUser.uuid = uuid;

    await userRepository.updateUser(modifedUser)

    res.status(StatusCodes.OK).send(modifedUser)
})

userRoute.delete("/users/:uuid", async (req: Request<{uuid:string}>, res: Response, next: Next) => {
    const uuid = req.params.uuid
    await userRepository.removeUser(uuid)
    res.sendStatus(StatusCodes.OK)
})

export default userRoute;
