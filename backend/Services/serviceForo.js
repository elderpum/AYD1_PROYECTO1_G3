const db = require('../Config/databaseConfig');
const path = require('path');

exports.getForos = async () => {
    try{
        const [rows] = await db.execute('SELECT idForo, titulo, descripcion, categoria FROM Foro');
        let response = [];

        if (rows.length != 0) {
            for (const row of rows) {
                const [rows2] = await db.execute('SELECT idForo, comentario, nombreUsuario, correoUsuario FROM Comentario WHERE idForo = ?', [row.idForo]);
                
                let comentarios = [];

                if (rows2.length !== 0) {
                    rows2.forEach(commentRow => {
                        comentarios.push({
                            comentario: commentRow.comentario,
                            nombreUsuario: commentRow.nombreUsuario,
                            correoUsuario: commentRow.correoUsuario
                        });
                    });
                }

                response.push({
                    id: row.idForo,
                    titulo: row.titulo,
                    descripcion: row.descripcion,
                    categoria: row.categoria,
                    comentarios: comentarios
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