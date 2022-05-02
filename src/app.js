import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import initializePassport from './config/passport.js';
import sessionRouter from './routes/session.routes.js';
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js';
import {Server} from 'socket.io';
const app  = express();
const PORT = process.env.PORT||8080;
const server = app.listen(PORT,()=>console.log(`Listening on port ${PORT}`))
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
})
app.use(cors({credentials:true, origin:"http://localhost:3000"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

app.use('/api/session',sessionRouter)
app.use('/api/products',productsRouter)
app.use('/api/carts',cartsRouter);

let connectedSockets = {};
io.on('connection',socket=>{
    console.log("client connected");
    if(socket.handshake.query.name){
        //Check if there's an associated id with socketId
        if(Object.values(connectedSockets).some(user=>user.id===socket.handshake.query.id)){
            console.log("entré");
            //replace socket id for current connected socket
            Object.keys(connectedSockets).forEach(idSocket =>{
                if(connectedSockets[idSocket].id===socket.handshake.query.id){
                    delete connectedSockets[idSocket];
                    connectedSockets[socket.id]={
                        name:socket.handshake.query.name,
                        id:socket.handshake.query.id,
                        thumbnail:socket.handshake.query.thumbnail
                    };
                }
            })
        }else{
            connectedSockets[socket.handshake.query.id]={
                name:socket.handshake.query.name,
                id:socket.handshake.query.id,
                thumbnail:socket.handshake.query.thumbnail
            };
        }
    }
    io.emit('users',connectedSockets)
    //Other listeners
    socket.on('disconnect',reason=>{
        delete connectedSockets[socket.id]
    })
    socket.on('message',data=>
    console.log(JSON.stringify(data)));
})