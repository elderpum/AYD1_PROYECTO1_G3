const services = require("../Services/serviceForo.js");

//GETS
async function getForos(req, res) {
    const result = await services.getForos();
    res.json({
    mensaje: "Todos los foros",
    foros: result,
    });
}

//POSTS
async function add(req, res) {
    const result = await services.add(req.body.newForo);

    res.json({
    mensaje: result,
    });
}

module.exports = {
    add,
    getForos,
};