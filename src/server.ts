import express, {Application} from "express"
import transactionRoutes from "./Transactions/routes/transactions.routes"
const app: Application = express();

app.use(express.json())

//Routes
app.use('/api', transactionRoutes)
//Server port
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3500

//tart the server

app.listen(PORT, () =>{
    console.log(`Server is running on http ${PORT}`)
})