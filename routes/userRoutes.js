const express=require('express');
const router=express.Router();
// const middle=require('../middleware/userMiddleware');
const userController=require('../controllers/userController');
const verifyUser=require('../middleware/userMiddleware');
// Middleware for user verification



  //User homepage
  router.get('/', verifyUser, userController.home);
  // User Login (POST request)
  router.post('/login', userController.login);
  // User Login (GET request)
  router.get('/login', userController.loginGet);
  // User Signup (POST request)
  router.post('/signup', userController.signup);
  //User signup (GET request)
  router.get('/signup',userController.signupGet);
  // Logout (POST request)
router.post('/logout', userController.logout); 
  

module.exports=router;