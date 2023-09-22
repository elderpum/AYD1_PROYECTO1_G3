const db = require('../Config/databaseConfig');
const path = require('path');

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
        const [res] = await db.execute('SELECT m.idMaterial, m.nombre, m.link FROM Material INNER JOIN CategoriaMaterial cm ON m.idMaterial = cm.idMaterial WHERE cm.Categoria = ?', [category]);
        let rows = res[0];

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
        return{
            err: true,
            message: error.message
        }
    }
}