const verifyUser = (req, res, next) => {
    console.log("req session id : ",req.session);
    if (req.session && req.session.userId) {
      next();
    } else {
      res.render('user/login')
      // res.status(401).json({ error: 'Unauthorized' });
    }
  }; 
  module.exports=verifyUser;