const db = require('../Config/databaseConfig');
const path = require('path');

exports.getForos = async () => {
    try{
        const [rows] = await db.execute('SELECT idForo, nombre, descripcion FROM Foro');
        const [rows2] = await db.execute('SELECT comentario, nombreUsuario, correoUsuario FROM Comentario WHERE idForo = ?', [rows.id]);
        let response = [];
        rows.forEach(row => {
            response.push({
                id: row.idForo,
                nombre: row.nombre,
                descripcion: row.descripcion,
                comentarios: rows2.comentario,
            });
        });

        return{
            err: false,
            message: "Success",
            data: response
        }
    }catch(error){
        console.log(error.message);
        return{
            err: true,
            message: error.message
        }
    }
}

exports.addForo = async (newForo) => {
    try{
        await db.execute('INSERT INTO Foro(titulo, descripcion, categoria) VALUES(?, ?)', [newForo.nombre, newForo.descripcion, newForo.categoria]);
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