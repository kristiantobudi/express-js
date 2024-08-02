/* eslint-disable prettier/prettier */
import { NextFunction, Router, Request, Response } from "express";
import { LoginUser } from "../interface/addUser";

export const LoginRouter: Router = Router();

const users: LoginUser[] = [
  {
    user_id: 1,
    username: "kristianto.budi",
    password: "12345",
    first_name: "kristianto",
    last_name: "budi",
    email: "kristianto.budi@ho.com",
    auth: "admin",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
LoginRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    statusCode: 200,
    data: users,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
LoginRouter.post("/add", (req: Request, res: Response, next: NextFunction) => {
  const newUser: LoginUser = req.body;

  if (
    !newUser.user_id ||
    !newUser.username ||
    !newUser.password ||
    !newUser.first_name ||
    !newUser.last_name ||
    !newUser.email ||
    !newUser.auth
  ) {
    return res.status(400).send({
      status: false,
      statusCode: 400,
      message: "Data not found",
    });
  }

  newUser.user_id = users.length + 1;
  users.push(newUser);

  res.status(201).send({
    status: true,
    statusCode: 201,
    message: "User created successfully",
    data: newUser,
  });
});
