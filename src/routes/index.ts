/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Application, Router } from "express";
import { ProductRouter } from "./product/product.routes";
import { AuthRouter } from "./auth/auth.routes";

const _routes: Array<[string, Router]> = [
  ["/product", ProductRouter],
  ["/auth", AuthRouter],
];

export const routes = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  });
};
