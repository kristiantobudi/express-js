/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
import { Router } from "express";
import { createSession, createUser, deleteSession, updateUser } from "../../modules/auth/controller/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", createUser)
AuthRouter.post("/login", createSession)
AuthRouter.put("/register/:id", updateUser)
AuthRouter.post("/logout", deleteSession)