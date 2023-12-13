const bcrypt=require('bcrypt');
const {getDb}=require('../models/db');

const connectDb=()=>{
  const db=getDb();
  const usersCollection=db.collection('users');
  return usersCollection;
}


// User Login
const login = async (req, res) => {
    try {
        // const db=getDb();
        const usersCollection=connectDb();

        const { email, password } = req.body;
        // usersCollection=db.collection('users' );
        console.log("login");
        const user = await usersCollection.findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
          req.session.userId = user._id;
          res.redirect('/'); 
        } else {
            res.render('user/login');
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  };
  //User login for get request
  const loginGet=(req,res)=>{
    if(!req.session.userId){
      res.render("user/login");
    }else{
      res.redirect("/");
    }
  }
  // User Signup
  const signup = async (req, res) => {
    try {
      console.log("signup executed");
      const {username,password,email}=req.body;
      usersCollection=connectDb();
      const existingUser=await usersCollection.findOne({
        email:email
      })
      if(existingUser){
        return res.status(400).json({error:"email already exists"});
      }
      const hashedPassword=bcrypt.hashSync(password,10);
      const newUser={
        username,
        password:hashedPassword,
        email
      }
      const result=await usersCollection.insertOne(newUser);
      req.session.userId=result.insertedId;
      res.json({message:"Signup successfull",data:result});
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Home Page for Users
  const home = (req, res) => {
    // console.log("home")
    // if(req.session.user){
      console.log("Home session");
      res.render('user/home');
    // }else{
      // res.render('user/login');
    // }
  };
  
  //User logout
  const logout=(req,res)=>{
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.redirect('/')
      }
    });
  }
  module.exports = {
    login,
    signup,
    home,
    logout,
    loginGet
  };