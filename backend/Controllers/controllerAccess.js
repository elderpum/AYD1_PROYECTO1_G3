const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.isAnOrganizer = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      err: true,
      message: "No token provided",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

    if (decoded.tipo !== 2) {
      return res.status(401).json({
        err: true,
        message: "Invalid token",
      });
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      err: true,
      message: "Invalid token",
    });
  }
};

exports.isAnAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      err: true,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

    if (decoded.tipo !== 1) {
      return res.status(401).json({
        err: true,
        message: "Invalid token",
      });
    }

    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({
      err: true,
      message: "Invalid token",
    });
};
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

        if(decoded.tipo !== 2 && decoded.tipo !== 1 && decoded.tipo !== 3){
          return res.status(401).json({
              err: true,
              message: 'Invalid token'
          });
        }
        
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}

exports.isOrganizerOrStudent = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            err: true,
            message: 'No token provided'
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_PW);

        // Tipo 1 = Admin | Tipo 2 = Organizador | Tipo 3 = Estudiante
        if(decoded.tipo !== 2 && decoded.tipo !== 3){
            return res.status(401).json({
                err: true,
                message: 'Invalid token'
            });
        }

        req.id = decoded.id;
        req.tipo = decoded.tipo;
        next();
    }catch (error){
        return res.status(401).json({
            err: true,
            message: 'Invalid token'
        });
    }
}
