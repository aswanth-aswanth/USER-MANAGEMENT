const verify=(req,res,next)=>{
    console.log("Verify");
    if(req.session.admin){
         next()
         console.log(req.session.admin);
    }else{
         res.render('admin/login')
    }
}

module.exports=verify;