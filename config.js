const {MongoClient}=require('mongodb');
const DATABASE_URL="mongodb://localhost:27017/";

let db;
const connectToMongoDB=async()=>{
    try{
        const client=new MongoClient(DATABASE_URL);
        await client.connect()
        console.log("Successfully connected");
        db = client.db();
    }catch(err){
        console.log(err);
        throw err;
    }
}

module.exports={connectToMongoDB,db};