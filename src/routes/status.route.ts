
import express, { NextFunction as Next, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const statusRoute = express();

statusRoute.use(express.json());

statusRoute.get("/status", (request: Request, response: Response, next: Next) => {
    response.sendStatus(StatusCodes.OK)
});


export default statusRoute;
