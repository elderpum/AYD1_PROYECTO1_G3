const db = require('../Config/databaseConfig');
const path = require('path');

exports.getForos = async (idUser, tipoUser) => {
    try{
        const [rows] = await db.execute("SELECT idForo, titulo, descripcion, categoria FROM Foro");
        let response = [];
        const id = idUser;
        let tipo = tipoUser;

        if (rows.length != 0) {
            for (const row of rows) {
                const [rows2] = await db.execute(
                "SELECT idForo, comentario, nombreUsuario, correoUsuario FROM Comentario WHERE idForo = ?",
                [row.idForo]
                );

            let comentarios = [];

            // Obtener datos del usuario (organizador o estudiante)
            let userData = {}; // Inicializamos como un objeto vacío
            if (tipo == 2) {
                const [rows3] = await db.execute("SELECT Nombre, CorreoElectronico FROM Organizador WHERE ID = ?",[id]);
                if (rows3.length !== 0) {
                    userData = rows3[0]; // Usamos el primer resultado si hay varios
                }
            } else if (tipo == 3) {
                const [rows3] = await db.execute("SELECT Nombre, CorreoElectronico FROM Estudiante WHERE ID = ?",[id]);
                if (rows3.length !== 0) {
                    userData = rows3[0]; // Usamos el primer resultado si hay varios
                }
            }

            if (rows2.length !== 0) {
                rows2.forEach((commentRow) => {
                // Agregar datos del usuario a cada comentario
                comentarios.push({
                    comentario: commentRow.comentario,
                    nombreUsuario: userData.Nombre, // Agregar el nombre del usuario
                    correoUsuario: userData.CorreoElectronico, // Agregar el correo del usuario
                    });
                });
            }

            response.push({
                id: row.idForo,
                titulo: row.titulo,
                descripcion: row.descripcion,
                categoria: row.categoria,
                comentarios: comentarios,
                });
            }
        }

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
    const query = 'INSERT INTO Foro (titulo, descripcion, categoria) VALUES (?,?,?)';
    const values = [newForo.titulo, newForo.descripcion, newForo.categoria];
    try{
        const result = await db.query(query, values);
        return{
            err: false,
            message: "Success",
            data: result
        }
    }catch(error){
        return{
            err: true,
            message: error.message
        }
    }
}