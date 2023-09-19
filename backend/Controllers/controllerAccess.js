const jwt = require('jsonwebtoken');

exports.isAnOrganizer = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

        if(decoded.tipo !== 2){
            return res.status(401).json({
                err: true,
                message: 'Invalid token'
            });
        }

        req.id = decoded.id;
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}

exports.isAStudent = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

        if(decoded.tipo !== 3){
            return res.status(401).json({
                err: true,
                message: 'Invalid token'
            });
        }

        req.id = decoded.id;
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}

exports.anyRole = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

        if(decoded.tipo === 2 || decoded.tipo === 1 || decoded.tipo === 3){
            next();
        }
        
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}