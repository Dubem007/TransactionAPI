export interface Transaction {
    id: string,
    date: Date,
    amount:number,
    currency: string,
    type: "income" | "expense",
    category: string,
    accountname: string
}