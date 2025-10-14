import { Router } from "express";
import { UserRouter } from "./UserRouter";

export const indexRouter = (router: Router) => {
    UserRouter(router);
}