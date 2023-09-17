const services = require("../Services/serviceOrganizador.js");

//GETS
function ejemplo(req, res) {
    const result = services.EjemploO();
    res.json({
        mensaje: result,
    });
}

async function getAll(req, res) {
    const result = await services.getAll();
    res.json({
        mensaje: "Todos los organizadores",
        organizadores: result,
    });
}

//POSTS
async function add(req, res) {
    const result = await services.add(req.body.organizador);

    res.json({
        mensaje: result,
    });
}

module.exports = {
    ejemplo,
    add,
    getAll,
};