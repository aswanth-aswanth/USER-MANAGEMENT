const { ObjectId } = require('mongodb');
const {getDb}=require('../models/db');

const connectDb=()=>{
    const db=getDb();
    const adminCollection=db.collection('admin');
    const usersCollection=db.collection('users');
    return {adminCollection,usersCollection};
}

// const home = async(req, res) => {
//     try {
//      const userData= await Users.find()
//      const mailError = req.query.error ? req.query.error : "";
//      const successMessage = req.flash('success');
//      const errorMessage = req.flash('error');
//       res.render("adminpage",{userData,mailError,successMessage,errorMessage});
//     } catch (error) {
//       console.log(error);
//     }
//   };
const home=async(req,res)=>{
    try {
        const {usersCollection}=connectDb();
        const userDataCursor = await usersCollection.find();
        const userData = await userDataCursor.toArray();
        console.log("userdata : ", userData);
        res.render('admin/home', { userData });
    } catch (error) {
        console.log(error);
    }
}

const login=async(req,res)=>{
    try {
        const {adminCollection}=connectDb();
        const {email,password}=req.body;
        const Admin=await adminCollection.findOne({email});
        console.log("Admin");
        console.log(Admin);
        console.log(email,password);
        if(Admin){
            if(Admin.password==password){
                req.session.admin=Admin.email;
                res.redirect("/admin");
            }else{
                res.redirect("/login");
            }
        }else{
            res.redirect("/login")
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteUser=async(req,res)=>{
    try {
         const userId=req.params.id;
         const {usersCollection}=connectDb();
         const result=await usersCollection.deleteOne({_id:new ObjectId(userId)});
         res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}

const updateUser=async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const editUser=async(req,res)=>{
    try {
        console.log("editUser");
        const _id=req.params.id;
        const {usersCollection}=connectDb();
        const user=await usersCollection.findOne({_id:new ObjectId(_id)});
        console.log("id : ",_id);
        console.log("user : ",user);
        res.render('admin/edit-user',{user});
    } catch (error) {
        console.log(error);
    }
}

const editSubmit=async(req,res)=>{
    try {
        console.log("editSubmit");
        const {usersCollection}=connectDb();
        const id=req.params.id;
        const result=await usersCollection.updateOne({_id:new ObjectId(id)},{
            $set:{
                username:req.body.username,
                email:req.body.email,
            }
        })
        console.log(result);
        const successMessage="User data edited successfully";
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
}

const createUser=async(req,res)=>{
    try {
        res.render('admin/signup');
    } catch (error) {
        console.log(error);
    }
}

const createSubmit=async(req,res)=>{
    try {
        const {usersCollection}=connectDb();
        const {username,email,password}=req.body;
        const user=usersCollection.insertOne({});
        const successMessage="User created successfully";
        res.redirect("/admin")
    } catch (error) {
        console.log(error);
    }
}
module.exports={login,home,deleteUser,updateUser,editUser,editSubmit,createUser}