import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import initializePassport from './config/passport.js';
import sessionRouter from './routes/session.routes.js';
import productsRouter from './routes/products.routes.js'
const app  = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))

app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use('/api/session',sessionRouter)
app.use('/api/products',productsRouter)