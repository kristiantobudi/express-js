/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
import joi from "joi";
import TransactionType from "../types/transaction.type";

export const createTransactionValidation = (payload: TransactionType) => {
    const schema = joi.object({
        tracking_id: joi.string().allow('', null),
        stock_name: joi.string().required(),
        currency: joi.string().required(),
        currency_code: joi.string().required(),
        retail: joi.string().required(),
        stock_market_cap: joi.string().required(),
        money: joi.string().required()
    })
    return schema.validate(payload)
}