const express=require('express');
const app=express();
const {MongoClient}=require('mongodb');
const session=require('express-session');
const {connectToDatabase,getDb}=require('./models/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const nocache = require("nocache");
const port=process.env.port||3000;

connectToDatabase();
app.set("view engine","ejs");
app.use(session({
    secret:'secretKey',
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/', userRoutes);
app.use('/admin', adminRoutes);


app.listen(port,()=>{
    console.log("listening on port : ",port);
})