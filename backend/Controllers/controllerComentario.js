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
    let idUser = req.id;
    let tipoUser = req.tipo;
    const result = await services.addComentario(req.body, idUser, tipoUser);

    res.json({
        mensaje: result,
    });
}

module.exports = {
    add,
    getComentarios,
};