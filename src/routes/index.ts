/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import { Application, Router } from "express";
import { ProductRouter } from "./product/product.routes";
import { CmcRouter } from "./cmc/cmc.routes";
import { CategoryRouter } from "./storage/categoryRouter";
import { ItemRouter } from "./storage/itemRouter";
import { UserRouter } from "./storage/userRouter";

const _routes: Array<[string, Router]> = [
  ["/product", ProductRouter],
  ["/cmc", CmcRouter],
  ["/storage", CategoryRouter],
  ["/storage", UserRouter],
  ["/storage", ItemRouter]
];

export const routes = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  });
};
