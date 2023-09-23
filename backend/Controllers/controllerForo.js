const services = require("../Services/serviceForo.js");

//GETS
async function getForos(req, res) {
    idUser = req.id;
    tipoUser = req.tipo;
    const result = await services.getForos(idUser, tipoUser);
    res.json({
        mensaje: "Todos los foros",
        foros: result,
    });
}

//POSTS
async function add(req, res) {
    const result = await services.addForo(req.body);

    res.json({
    mensaje: result,
    });
}

module.exports = {
    add,
    getForos,
};