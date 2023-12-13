const express=require("express");
const router=express.Router();
const bcrypt=require('bcrypt');
const middle=require('../middleware/userMiddleware');
const adminController=require('../controllers/adminController');

const verify=(req,res,next)=>{
    console.log("Verify");
    if(req.session.admin){
         next()
         console.log(req.session.admin);
    }else{
         res.render('admin/login')
    }
}

router.get('/',verify,adminController.home);
router.get('/login',adminController.login);
router.post('/login',adminController.login);
router.get('/deleteUser/:id',adminController.deleteUser);
// router.put('/updateUser/:id',adminController.updateUser);
router.get('/editUser/:id',adminController.editUser);
router.post('/editSubmit/:id',adminController.editSubmit);
// router.post('/createUser',);
// router.post('/login',adminController.login);

module.exports=router;