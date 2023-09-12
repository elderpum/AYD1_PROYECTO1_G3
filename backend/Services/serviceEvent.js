const db = require('../Config/databaseConfig');
const controllerS3 = require('../Controllers/controllerS3');

create.exports = async (data, idOrganizador) => {
    let imageLink = "";
    if(data.imagenPromocional){
        const s3Response = await controllerS3.uploadFile(data.imagenPromocional.nombre, Buffer.from(data.imagenPromocional.contenido, 'base64'));
        if(s3Response.err){
            return {err: true, message: s3Response.message}
        }
        imageLink = s3Response.link;
    }

    let query = 'INSERT INTO Evento (titulo, descripcion, fechaHora, duracion, ubicacion, costo, imagen, FormatoEvento, idOrganizador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    let values =[
        data.titulo,
        data.descripcion,
        data.fecha + " " + data.hora,
        data.duracion,
        data.ubicacion,
        data.costo,
        imageLink,
        data.formatoEvento,
        idOrganizador
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


    data.materialAdicional.forEach(async material => {
        const s3Response = await controllerS3.uploadFile(material.nombre, Buffer.from(material.contenido, 'base64'));
        if(!s3Response.err){
            const values =[
                material.nombre,
                material.descripcion,
                s3Response.link,
                row.insertId
            ];
            db.execute('INSERT INTO MaterialAdicional (nombre, descripcion, link, idEvento) VALUES (?, ?, ?, ?);', values);
        }
    });

    query = ('INSERT INTO CategoriaEvento (idEvento, idCategoria) VALUES (?, ?);');
    values = [row.insertId, data.categoria];

    try{
        await db.execute(query, values);
    }catch (error){
        return{
            err: true,
            message: error.message,
        }
    }

    return {
        err: false,
        message: 'Event created successfully',
    }
}