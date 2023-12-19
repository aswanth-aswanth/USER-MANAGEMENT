const express=require("express");
const router=express.Router();
const bcrypt=require('bcrypt');
const middle=require('../middleware/userMiddleware');
const adminController=require('../controllers/adminController');
const verify=require('../middleware/adminMiddleware');

router.get('/',verify,adminController.home);
router.get('/login',adminController.login);
router.post('/login',adminController.login);
router.get('/createuser',adminController.createUserGet);
router.post('/createuser',adminController.createUser);
router.get('/deleteUser/:id',adminController.deleteUser);
router.get('/editUser/:id',adminController.editUser);
router.post('/editSubmit/:id',adminController.editSubmit);
router.post('/logout',adminController.logout);

module.exports=router;