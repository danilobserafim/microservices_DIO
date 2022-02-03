import express from "express";
import errorHandler from "./middlewares/error-handler.middleware";
import statusRouter from "./routes/status.route";
import usersRouter from "./routes/user.route";

const app = express()
//Configurações da aplicação
app.use(express.json())
//Configurações de rotas
app.use(usersRouter)
app.use(statusRouter)

//Configuração dos handler e Errors
app.use(errorHandler)

//Inicialização do servidor
app.listen(3000, () => {
    console.log("Tudo funcionando na porta 3000");

})