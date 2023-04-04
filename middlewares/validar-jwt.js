const {response} = require('express');
const jwt = require('jsonwebtoken');
const validarJwt = (req, res = response, next)=>{

    const token = req.header('x-token');
    
    if(!token){
        res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }

    try {
        
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        console.log(error);
        res.status(402).json({
            ok: false,
            msg:'Fallo la autenticacion'
        })
    }

    next();
}


module.exports = validarJwt;