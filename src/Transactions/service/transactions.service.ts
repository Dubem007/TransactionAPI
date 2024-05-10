import { Transaction } from '../interface/transactions.interface'
import * as fs from 'fs'
import * as path from 'path'

const transactionFilePath = path.join(__dirname, '../data/transactions.json');

export const getAllTheTransaction = async (querydata: string, parameter: string): Promise<Transaction[]> =>{

    return new Promise((resolve, reject) => {

        fs.readFile(transactionFilePath, 'utf8',(err, data) => {
            if(err){  
                reject({error: "No record found in the database"});
                return;
            }

           const transactons : Transaction[] = JSON.parse(data);
           let filteredTransactions: Transaction[] = transactons;

           if(parameter === "category")
            {
                filteredTransactions = filteredTransactions.filter(
                    (transaction)=> transaction.category === querydata
                );
            }

            if(parameter === "currency")
            {
                filteredTransactions = filteredTransactions.filter(
                    (transaction)=> transaction.category === querydata
                );
            }

            if(!querydata){
                filteredTransactions = filteredTransactions.filter(
                    (transaction)=> transaction.id !== null
                );
            }

            resolve(filteredTransactions);

        });
    });
};

export const creatNewTransaction = async (newtransaction : Transaction): Promise<Transaction[]> => {

    return new Promise ((resolve, reject) => {
        fs.readFile(transactionFilePath, 'utf8',(err, data) => {
            if(err){  
                reject({error: "Internal server error"});
                return;
            }

            const transactions: Transaction[] = JSON.parse(data);
            transactions.push(newtransaction);
        
            fs.writeFile(transactionFilePath, JSON.stringify(transactions, null, 2), (err) => {
                if(err){  
                    reject({error: "No record provided to create transaction"});
                    return;
                }

                resolve(transactions)
            });
       })
    })
}

export const updateNewTransaction = async (id: string, transactiondata : Transaction): Promise<Transaction[]> => {

    return new Promise ((resolve, reject) => {
        fs.readFile(transactionFilePath, 'utf8',(err, data) => {
            if(err){  
                reject({error: "Internal server error"});
                return;
            }

            const transactions: Transaction[] = JSON.parse(data);
            const transactionindex = transactions.findIndex((transaction) => transaction.id === id);

            if(transactionindex === -1)
            {
                reject("Transaction not found")
                return;
            }
        
            transactions[transactionindex] = transactiondata;
            fs.writeFile(transactionFilePath, JSON.stringify(transactions, null, 2), (err) => {
                if(err){  
                    reject({error: "No record provided to update transaction"});
                    return;
                }

                resolve(transactions)
            });
       })
    })
}