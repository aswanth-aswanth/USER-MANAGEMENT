const express=require('express');
const router=express.Router();
// const middle=require('../middleware/userMiddleware');
const userController=require('../controllers/userController');

// Middleware for user verification
const verifyUser = (req, res, next) => {
    console.log("req session id : ",req.session);
    if (req.session && req.session.userId) {
      next();
    } else {
      res.render('user/login')
      // res.status(401).json({ error: 'Unauthorized' });
    }
  }; 


  //User homepage
  router.get('/', verifyUser, userController.home);
  // User Login (POST request)
  router.post('/login', userController.login);
  // User Login (GET request)
  router.get('/login', userController.loginGet);
  // User Signup (POST request)
  router.post('/signup', userController.signup);
  // Home Page for Users (requires authentication)
  // Logout (GET request)
router.get('/logout', userController.logout); 
  

module.exports=router;