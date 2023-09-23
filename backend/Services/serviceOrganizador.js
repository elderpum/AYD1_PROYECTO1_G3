const db = require("../Config/databaseConfig");
const bcrypt = require("bcrypt");

function EjemploE() {
  return "Ejemplo";
}

async function add(organizador) {
  console.log(organizador)
  const query =
    "insert into Organizador(Nombre, Apellido, CorreoElectronico, Contrasena, FechaNacimiento, Genero, NombreInstitucionEmpresa, Descripcion, DireccionEmpresa, NumeroTelefono, AceptacionTerminosCondiciones, errores) values (?,?,?,?,?,?,?,?,?,?,?,?);";
  const hash = await bcrypt.hash(organizador.Contrasena, 10);
  const values = [
    organizador.Nombre,
    organizador.Apellido,
    organizador.CorreoElectronico,
    hash,
    organizador.FechaNacimiento,
    organizador.Genero,
    organizador.NombreInstitucionEmpresa,
    organizador.Descripcion,
    organizador.DireccionEmpresa,
    organizador.NumeroTelefono,
    organizador.AceptacionTerminosCondiciones,
    0,
  ];
  try {
    await db.query(query, values);
    return "Se agrego correctamente";
  } catch (error) {
    throw error;
  }
}

async function getAll() {
  try {
    const [result] = await db.query("SELECT * FROM Organizador");
    return result;
  } catch (error) {
    throw error;
  }
}

async function getAllEvents(idOrga) {
  try {
    const [eventos] = await db.execute(
      "SELECT * from Evento where idOrganizador = ?;",
      [idOrga]
    );

    // Crea un array para almacenar los eventos con sus categorías y materiales.
    const eventsToSend = [];

    for (const evento of eventos) {
      
      // Obtiene las categorías del evento.
      const [categorias] = await db.execute(
        "SELECT categoria from CategoriaEvento where idEvento = ?;",
        [evento.idEvento]
      );
      const categ = []

      for (const categoria of categorias){
        categ.push(categoria.categoria)
      }

      // Obtiene los materiales del evento.
      const [materiales] = await db.execute(
        "SELECT * from Material where idEvento= ?;",
        [evento.idEvento]
      );
        fecha_hora_array = evento.fechaHora.toISOString().split("T")
        const event = {
          titulo: evento.titulo,
          descripcion: evento.descripcion,
          fecha: fecha_hora_array[0],
          hora: fecha_hora_array[1],
          duracion: evento.duracion,
          ubicacion: evento.ubicacion,
          costo: evento.costo,
          img: evento.imagen,
          formato: evento.FormatoEvento,
          categorias: categ,
          materiales: materiales
        }

      // Agrega el objeto al array.
      eventsToSend.push(event);
    }

    return {
      err: false,
      message: "Get All Eventos Succesfully!",
      data: eventsToSend,
    };
  } catch (error) {
    return {
      err: true,
      message: error.message,
    };
  }
}

module.exports = {
  EjemploE,
  add,
  getAll,
  getAllEvents,
};
