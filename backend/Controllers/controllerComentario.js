const services = require("../Services/serviceComentario.js");

//GETS
async function getComentarios(req, res) {
    const result = await services.getComentarios();
    res.json({
        mensaje: "Todos los comentarios",
        comentarios: result,
    });
}

//POSTS
async function add(req, res) {
    const result = await services.add(req.body);

    res.json({
        mensaje: result,
    });
}

module.exports = {
    add,
    getComentarios,
};