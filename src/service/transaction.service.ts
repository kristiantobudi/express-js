/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable eol-last */
// eslint-disable-next-line @typescript-eslint/semi
import TransactionType from "../types/transaction.type";
import transactionModel from "../models/transaction/transaction.model";

export const createTransaction = async (payload: TransactionType) => {
    return await transactionModel.create(payload)
}

export const getTransactionByID = async (id: String) => {
    return await transactionModel.findOne({ tracking_id: id })
}

export const getTransactionByDate = async (date: String) => {
    return await transactionModel.find({ createdAt: date })
}