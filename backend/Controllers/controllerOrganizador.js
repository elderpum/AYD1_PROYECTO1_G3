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
    const result = await services.add(req.body);

    res.json({
        mensaje: result,
    });
}

async function getEvents(req, res){
    try {
        const id_orga = req.id;
        const response = await services.getAllEvents(id_orga)
        if (response.err) {
          return res.status(400).json(response);
        }
        return res.status(201).json(response);
      } catch (error) {
        return res.status(500).json({
          err: true,
          message: error.message,
        });
      }
}

module.exports = {
    ejemplo,
    add,
    getAll,
    getEvents
};