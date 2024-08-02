/* eslint-disable prettier/prettier */
import { Application, Router } from "express";
import { ProductRouter } from "./product";
import { LoginRouter } from "./login";

const _routes: Array<[string, Router]> = [
  ["/product", ProductRouter],
  ["/auth/login", LoginRouter],
];

export const routes = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  });
};
