const jwt = require('jsonwebtoken');

module.exports = function auth(req,res,next) {

    
    const token = req.header('auth-token');

    console.log('received auth token '+ token);


    if(!token)
    return res.status(401).send('Access denied');

    try{

        var verified = jwt.verify(token, 'secret');
        req.user = verified;
        next();

    }catch(err){

        res.status(400).send('invalid token');
    }


}

