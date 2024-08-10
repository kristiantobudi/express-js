/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
import { Router } from "express";
import { createSession, createUser, updateUser } from "../controller/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", createUser)
AuthRouter.post("/login", createSession)
AuthRouter.put("/register/:id", updateUser)