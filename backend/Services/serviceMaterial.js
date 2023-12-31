const db = require('../Config/databaseConfig');
const path = require('path');
const controllerS3 = require("../Controllers/controllerS3");

exports.getMaterials = async () => {
    try{
        const [rows] = await db.execute('SELECT idMaterial, nombre, link FROM Material');

        let response = [];
        rows.forEach(row => {
            response.push({
                id: row.idMaterial,
                nombre: row.nombre,
                url: row.link,
                tipo: path.extname(path.basename(row.link))
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

exports.getMaterialsByCategory = async (category) => {
    try{
        
        const [rows] = await db.execute('SELECT m.idMaterial, m.nombre, m.link FROM Material m INNER JOIN CategoriaMaterial cm ON m.idMaterial = cm.idMaterial WHERE cm.Categoria = ?', [category.categoria]);
        let response = [];
        rows.forEach(row => {
            response.push({
                id: row.idMaterial,
                nombre: row.nombre,
                url: row.link,
                tipo: path.extname(path.basename(row.link))
            });
        });

        return{
            err: false,
            message: "Success",
            data: response
        }
    }catch(error){
        console.log(error.message)
        return{
            err: true,
            message: error.message
        }
    }
}

exports.addMaterial = async (newMaterial) => {
    try{
        const s3Response = await controllerS3.uploadFile(newMaterial.nombreArchivo, newMaterial.archivoBase64);
        let imageLink = s3Response.link;
        const [res,fields] = await db.execute('INSERT INTO Material (nombre, descripcion, link, idEvento, fecha) VALUES (?,?,?,?,?)', [newMaterial.titulo, newMaterial.url, imageLink, null, newMaterial.fechaPublicacion]);
        const res2 = await db.execute('INSERT INTO CategoriaMaterial (idMaterial, categoria) VALUES (?,?)', [res.insertId, newMaterial.categoria]);
        return{
            err: false,
            message: "Success"
        }
    }catch(error){
        console.log(error.message)
        return{
            err: true,
            message: error.message
        }
    }
}