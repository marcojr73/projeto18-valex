import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import cardRouter from "./routers/cardRouter.js"
import reloadRouter from "./routers/reloadRouter.js"
import purchaseRouter from "./routers/purchasesRouter.js"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(cardRouter)
app.use(reloadRouter)
app.use(purchaseRouter)

const {PORT} = process.env

app.listen(PORT,()=>{
    console.log(`Server up on port ${PORT}`)
})