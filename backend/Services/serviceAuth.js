const db = require('../Config/databaseConfig');
const bcrypt = require('bcrypt');

exports.authenticate = async (email, password, type) =>  {
    let result, query;
    
    if(type === 1){ //admin
        [result] = await db.execute("SELECT *, id_admin as id, pass as password FROM Administrador WHERE name = ?;", [email])
        query = "UPDATE Administrador SET errores = ? WHERE name = ?;"
    }else if(type === 2){//organizador
        [result] = await db.execute("SELECT *, ID as id, Contrasena as password FROM Organizador WHERE CorreoElectronico = ?;", [email])
        query = "UPDATE Organizador SET errores = ? WHERE CorreoElectronico = ?;"
    }else{//estudiante
        [result] = await db.execute("SELECT *, id_estudiante as id FROM estudiantes WHERE email = ?;", [email])
        query = "UPDATE estudiantes SET errores = ? WHERE email = ?;"
    }
    
    if(result.length === 0){
        return {authExitoso:false, message:"Usuario no existente"}
    }

    const authenticated = await bcrypt.compare(password, result[0].password)

    if(authenticated){
        if(result[0].errores >= 5){
            return {authExitoso:false, user: result[0], message:"Su usuario se encuentra bloqueado, contacte a un administrador"}
        }
        await db.execute(query, [0, email])
        result[0].errores = 0;
        return {authExitoso:true, user: result[0], message:"Bienvenido!"}
    }
    
    result[0].errores++;
    await db.execute(query,[result[0].errores, email])
    
    return {authExitoso:false, user: result[0], message:"Contraseña incorrecta"}
}