/*
GET /USERS
GET /USERS/:UUID
POST /USERS
PUT /USERS/:UUID
DELETE /USERS/:UUID 
*/
import { NextFunction as Next, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";


const userRoute = Router()

userRoute.get("/users", (req: Request, res: Response, next: Next) => {
    const user = { "usuarios": [{ id: 0, userNmae: "Danilo" }, { id: 1, userNmae: "Mayara" }] };
    res.status(StatusCodes.OK).send(user);
})

userRoute.get("/users/:uuid", (req: Request<{ uuid: number }>, res: Response, next: Next) => {
    const users = { "usuarios": [{ id: 0, userName: "Danilo" }, { id: 1, userName: "Mayara" }] };
    const idClientes = Number(req.params.uuid)
    let selectedUser = {}

    users.usuarios.map(user => {
        if (user.id === idClientes) {
            selectedUser = user
        }
    })
    res.status(StatusCodes.OK).send(selectedUser);
})

userRoute.post("/users", (req: Request, res: Response, next: Next) => {
    const newUser = req.body;
    console.log(req.body);

    res.status(StatusCodes.CREATED).send(newUser)
})

userRoute.patch("/users/:uuid", (req: Request, res: Response, next: Next) => {
    console.log(req.body);
    const users = { "usuarios": [{ id: 0, userName: "Danilo", idade: 30 }, { id: 1, userName: "Mayara", idade: 29 }] };
    users.usuarios[Number(req.params.uuid)].userName = req.body.name
    users.usuarios[Number(req.params.uuid)].idade = req.body.idade

    res.status(StatusCodes.OK).send(
        users.usuarios[Number(req.params.uuid)])
})

userRoute.delete("/users/:uuid", (req: Request, res: Response, next: Next) => {
    res.sendStatus(StatusCodes.OK)
})

export default userRoute;
