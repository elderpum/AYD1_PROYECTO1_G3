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