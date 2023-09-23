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

exports.addComentario = async (newComment) => {
    try{
        await db.execute('INSERT INTO Comentario(comentario, nombreUsuario, correoUsuario, idForo) VALUES(?, ?, ?, ?)', [newComment.comentario, newComment.nombreUsuario, newComment.correoUsuario, newComment.idForo]);
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