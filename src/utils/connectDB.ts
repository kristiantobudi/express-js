/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
import mongoose from "mongoose";
import config from "../config/environment";
import { logger } from "./logger";

mongoose.set('strictQuery', true);

mongoose.connect(`${config.db}`)
.then(() => {
    logger.info('Connected to MongoDB')
})
.catch((error) => {
    logger.info('Failed to connect to MongoDB', error)
    logger.error(error)
    process.exit(1)
})