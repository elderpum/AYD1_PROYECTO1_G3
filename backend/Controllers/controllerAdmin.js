const servicesAdmin = require("../Services/serviceAdmin");
const servicesEstudinte = require("../Services/serviceEstudiante");

//GETS
function ejemplo(req, res) {
  const result = servicesAdmin.ejemploAdmin();
  res.json({
    mensaje: result,
  });
}

async function getAllEstudiantes(req, res) {
  const resultEstudiante = await servicesEstudinte.getAll();
  const resultOrganizadores = await servicesAdmin.getOrganizadores();

  res.json({
    estudiantes: resultEstudiante,
    organizadores: resultOrganizadores,
  });

}

async function blockUser(req, res) {
  try {
    const data = req.body;

    const response = await servicesAdmin.blockUser(data);

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

async function unblockUser(req, res) {
  try {
    const data = req.body;

    const response = await servicesAdmin.unblockUser(data);

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
  getAllEstudiantes,
  blockUser,
  unblockUser,
};
