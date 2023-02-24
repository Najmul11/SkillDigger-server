import express from 'express'
import {config} from 'dotenv'
import course from './routes/CourseRoutes.js'
import contact from './routes/contactRoutes.js'
import user from './routes/UserRoutes.js'
import subscription from './routes/subscriptionRoutes.js'
import { ErrorMiddleware } from './middlewares/Error.js'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import cors from 'cors'

config({path:'./config/config.env'})
mongoose.set('strictQuery', true);


export const app=express()
app.use(express.json())
app.use(cors({
    origin: ['https://skill-digger.web.app'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(
    express.urlencoded({
        extended:true, 
    })
) 

app.use(cookieParser())


app.use('/api/v1',course)
app.use('/api/v1',user)
app.use('/api/v1',contact)
app.use('/api/v1',subscription)






app.use(ErrorMiddleware)

