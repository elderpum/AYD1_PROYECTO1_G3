const db = require('../Config/databaseConfig');
const controllerS3 = require('../Controllers/controllerS3');

exports.create = async (data, idOrganizador) => {
    let imageLink = "";
    if(data.imagenPromocional){
        const s3Response = await controllerS3.uploadFile(data.imagenPromocional.nombre, Buffer.from(data.imagenPromocional.contenido, 'base64'));
        if(s3Response.err){
            return {err: true, message: s3Response.message}
        }
        imageLink = s3Response.link;
    }

    let query = 'INSERT INTO Evento (titulo, descripcion, fechaHora, duracion, ubicacion, costo, imagen, FormatoEvento, idOrganizador, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    let values =[
        data.titulo,
        data.descripcion,
        data.fecha + " " + data.hora,
        data.duracion,
        data.ubicacion,
        data.costo,
        imageLink,
        data.formatoEvento,
        idOrganizador,
        data.categoria
    ];

    let row, fields
    try{
        [row, fields] = await db.execute(query, values);
    }catch (error){
        return{
            err: true,
            message: error.message,
        }
    }


    const fecha = new Date();
    data.materialAdicional.forEach(async material => {
        const s3Response = await controllerS3.uploadFile(material.nombre, Buffer.from(material.contenido, 'base64'));
        if(!s3Response.err){
            const values =[
                material.nombre,
                material.descripcion,
                s3Response.link,
                row.insertId,
                fecha.toISOString().slice(0, 19).replace('T', ' ')
            ];
            db.execute('INSERT INTO Material (nombre, descripcion, link, idEvento, fecha) VALUES (?, ?, ?, ?, ?);', values);
        }
    });

    query = 'INSERT INTO CategoriaEvento (idEvento, Categoria) VALUES (?, ?);';
    data.categoria.forEach(async categoria => {
        const values = [
            row.insertId,
            categoria
        ];
        await db.execute(query, values);
    })

    return {
        err: false,
        message: 'Event created successfully',
    }
}

exports.getEventsByStudent = async (idEstudiante) => {
    try{
        const [res] = await db.execute('SELECT ev.titulo, ev.fechaHora, ev.FormatoEvento, ev.imagen FROM Evento ev INNER JOIN evento_estudiante_U eeu ON eeu.id_evento = ev.idEvento WHERE eeu.id_estudiante = ?;', [idEstudiante]);

        rows = res[0];
        let response = [];
        rows.forEach(async row => {
            const [res] = await db.execute('SELECT Categoria FROM CategoriaEvento WHERE idEvento = ?', [row.idEvento]);
            let categorias = res[0];

            let cats = [];
            categorias.forEach(categoria => {
                cats.push(categoria.Categoria);
            });

            response.push({
                id: row.idEvento,
                titulo: row.titulo,
                fecha: row.fechaHora,
                formato: row.FormatoEvento,
                imagen: row.imagen,
                tipo: cats
            });
        });
        
        return{
            err: false,
            message: "Success",
            data: response
        }
    }catch(error){
        return{
            err: true,
            message: error.message
        }
    }
}