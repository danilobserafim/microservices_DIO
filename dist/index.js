"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/status", (request, response, next) => {
    response.status(200).send({ foo: "bar" });
});
app.listen(3000, () => {
    console.log("Tudo funcionando na porta 3000");
});
