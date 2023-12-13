const MongoClient=require('mongodb').MongoClient;

const DATABASE_URL="mongodb://localhost:27017/";
const dbName="sample";
let db;

module.exports={
    connectToDatabase:()=>{
        const client=new MongoClient(DATABASE_URL);
        db=client.db("sample");
        console.log("connected to db");
    },
    getDb:()=>{
        return db;
    }
}