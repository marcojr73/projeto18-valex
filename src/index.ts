import express, { Request, Response } from "express"
import "express-async-errors"

import dotenv from "dotenv"
import cors from "cors"

import cardRouter from "./routers/cardRouter.js"
import reloadRouter from "./routers/reloadRouter.js"
import purchaseRouter from "./routers/purchasesRouter.js"
import errorHandler from "./middlewares/errorHandlerMiddleware.js"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

app.use(cardRouter)
app.use(reloadRouter)
app.use(purchaseRouter)

app.use(errorHandler)

const {PORT} = process.env

app.listen(PORT,()=>{
    console.log(`Server up on port ${PORT}`)
})