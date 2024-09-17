const jwt = require('jsonwebtoken');


const jwtAuthMiddleware =(req,res,next)=>{
     // first check the request headers has authorization or not 
     const authorization = req.headers.authorization 
     if(!authorization) return res.status(401).json({ error : 'Token not found'});

    //extract the jwt token from the request header 
    //console.log(req.headers)
     const token = req.headers.authorization.split(' ')[1];
     
     if(!token) return res.status(401).json({ error : 'Unauthorized' });
     
     try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user information to the request object 
        req.user = decoded 
        next();
     }catch(err){
        //console.error(err);
        res.status(401).json({ errors : 'Invalid token'})
     }
}

module.exports = jwtAuthMiddleware 