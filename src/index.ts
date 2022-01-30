import express, { NextFunction as Next, Request, Response, urlencoded } from "express";
import statusRoute from "./routes/status.route";
import userRoute from "./routes/users.route";

//criando instancia da aplicação
const app = express();

//configurações da aplicação
app.use(express.json());
app.use(urlencoded({ extended: true }))

//criação de rotas
app.use(userRoute);
app.use(statusRoute)

app.get("/", (req: Request, res: Response, next: Next) => {
    res.send("Escolha para que rota deseja seguir: status ou users")
})



app.listen(3000, () => {
    console.log("Tudo funcionando na porta 3000");
});