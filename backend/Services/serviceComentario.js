const db = require('../Config/databaseConfig');
const path = require('path');

exports.getComentarios = async () => {
    try{
        const [rows] = await db.execute('SELECT idComentario, comentario, nombreUsuario, correoUsuario FROM Comentario');
        return{
            err: false,
            message: "Success",
            data: rows
        }
    }catch(error){
        console.log(error.message);
        return{
            err: true,
            message: error.message
        }
    }
}

exports.addComentario = async (newComment, idUser, tipoUser) => {
    let id = idUser;
    let tipo = tipoUser;
    
    try{
        if (tipo == 2) {
            const [rows3] = await db.execute("SELECT Nombre, CorreoElectronico FROM Organizador WHERE ID = ?",[id]);
            if (rows3.length !== 0) {
                userData = rows3[0]; // Usamos el primer resultado si hay varios
            }
            await db.execute('INSERT INTO Comentario(comentario, nombreUsuario, correoUsuario, idForo) VALUES(?, ?, ?, ?)', [newComment.comentario, userData.Nombre, userData.CorreoElectronico, newComment.idForo]);
        } else if (tipo == 3) {
            const [rows3] = await db.execute("SELECT nombre, email FROM estudiantes WHERE id_estudiante = ?",[id]);
            if (rows3.length !== 0) {
                userData = rows3[0]; // Usamos el primer resultado si hay varios
            }
            await db.execute('INSERT INTO Comentario(comentario, nombreUsuario, correoUsuario, idForo) VALUES(?, ?, ?, ?)', [newComment.comentario, userData.nombre, userData.email, newComment.idForo]);
        }
        return{
            err: false,
            message: "Success"
        }
    }catch(error){
        return{
            err: true,
            message: error.message
        }
    }
}