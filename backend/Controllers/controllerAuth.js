const jwt = require('jsonwebtoken');
const serviceAuth = require('../Services/serviceAuth')

exports.login = async (req,res) => {
    try{
        const {correo, password, tipo} = req.body;
        const {authExitoso, user, message} = await serviceAuth.authenticate(correo, password, tipo);

        if(!authExitoso){
            return res.json({authExitoso, message, contador: user ? user.errores : -1})
        }
        
        const tokenAuth = jwt.sign({tipo, id: user.id}, process.env.JWT_SECRET_PW, {expiresIn:'300s'})

        return res.json({authExitoso, contador: user.errores ?? -1, tokenAuth, message})
    }catch(error){
        res.status(401).json({authExitoso:false, message:error.message})
    }
};