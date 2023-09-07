const services = require('../Services/serviceEstudiante.js');

//GETS
function ejemplo(req, res){
    const result = services.EjemploE();
    res.json({
        mensaje: result
    });
}

function getAll(req,res){
    const result = services.getAll();
    res.json({
        mensaje: 'Todos los estudiantes',
        estudiantes: result
    })
}


//POSTS
function add(req,res){
    const result = services.add(req.body.estudiante)

    res.json({
        mensaje: result
    })
}

module.exports = {
    ejemplo,
    add,
    getAll
};