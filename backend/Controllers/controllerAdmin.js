const servicesAdmin = require('../Services/serviceAdmin');
const servicesEstudinte = require('../Services/serviceEstudiante');

//GETS
function ejemplo(req, res){
    const result = servicesAdmin.ejemploAdmin();
    res.json({
        mensaje: result
    });
}

function getAllEstudiantes(req, res){
    const resultEstudiante = servicesEstudinte.getAll()
    const resultOrganizadores = servicesAdmin.getOrganizadores()

    res.json({
        estudiantes: resultEstudiante,
        organizadores: resultOrganizadores
    })
}

module.exports = {
    ejemplo,
    getAllEstudiantes
};