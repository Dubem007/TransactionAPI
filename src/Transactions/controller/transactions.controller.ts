import {Request, Response} from 'express'
import { Transaction} from '../interface/transactions.interface'
import { getAllTheTransaction, creatNewTransaction,updateNewTransaction} from '../service/transactions.service'

export const getAllTransactions = async ( req: Request, res: Response) => {
    const { category, currency} = req.query;
    let filterdTransactions: Transaction[];
    try{

        if(category)
        {
            const querydata = `${category}`
            filterdTransactions = await getAllTheTransaction(querydata, "category")
        }else if(currency)
        {
            const querydata = `${currency}`
            filterdTransactions = await getAllTheTransaction(querydata, "currency")
        }else
        {
            const querydata = ``
            filterdTransactions = await getAllTheTransaction(querydata, "")
        }

        res.json(filterdTransactions)
    }catch(error)
    {
         console.error('Error:', error instanceof Error ? error.message: "Unknown error")
         res.status(500).json({error: "Error occurred while retrieving transactions"})
    }
}

export const createTransaction = async (req: Request, res:Response) => {
    const newTransaction: Transaction = req.body;
    let response: Transaction[];
    try{
       
        response = await creatNewTransaction(newTransaction);
        res.json(response)
    }catch(error){
        console.error('Error:', error instanceof Error ? error.message: "Unknown error")
        res.status(500).json({error: "Error occurred while creating new transactions"})
    }
}

export const updateTransaction = async (req: Request, res:Response) => {
    const newTransaction: Transaction = req.body;
    const {id} = req.params;
    let response: Transaction[];
    try{
       
        response = await updateNewTransaction(id, newTransaction);
        res.json(response)
    }catch(error){
        console.error('Error:', error instanceof Error ? error.message: "Unknown error")
        res.status(500).json({error: "Error occurred while updating new transactions"})
    }
}