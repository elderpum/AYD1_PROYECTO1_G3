const db = require("../Config/databaseConfig");
const controllerS3 = require("../Controllers/controllerS3");

exports.create = async (data, idOrganizador) => {
  let imageLink = "";
  if (data.imagenPromocional) {
    const s3Response = await controllerS3.uploadFile(
      data.imagenPromocional.nombre,
      Buffer.from(data.imagenPromocional.contenido, "base64")
    );
    if (s3Response.err) {
      return { err: true, message: s3Response.message };
    }
    imageLink = s3Response.link;
  }

  let query =
    "INSERT INTO Evento (titulo, descripcion, fechaHora, duracion, ubicacion, costo, imagen, FormatoEvento, idOrganizador, categoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  let values = [
    data.titulo,
    data.descripcion,
    data.fecha + " " + data.hora,
    data.duracion,
    data.ubicacion,
    data.costo,
    imageLink,
    data.formatoEvento,
    idOrganizador,
    data.categoria,
  ];

  let row, fields;
  try {
    [row, fields] = await db.execute(query, values);
  } catch (error) {
    return {
      err: true,
      message: error.message,
    };
  }

  data.materialAdicional.forEach(async (material) => {
    const s3Response = await controllerS3.uploadFile(
      material.nombre,
      Buffer.from(material.contenido, "base64")
    );
    if (!s3Response.err) {
      const values = [
        material.nombre,
        material.descripcion,
        s3Response.link,
        row.insertId,
      ];
      db.execute(
        "INSERT INTO MaterialAdicional (nombre, descripcion, link, idEvento) VALUES (?, ?, ?, ?);",
        values
      );
    }
  });

  query = "INSERT INTO CategoriaEvento (idEvento, Categoria) VALUES (?, ?);";
  data.categoria.forEach(async (categoria) => {
    const values = [row.insertId, categoria];
    await db.execute(query, values);
  });

  return {
    err: false,
    message: "Event created successfully",
  };
};

exports.getAvailables = async () => {
  try {
    const [eventos] = await db.execute("SELECT * FROM Evento WHERE fechaHora >= NOW();");

    // Crea un array para almacenar los eventos con sus categorías y materiales.
    const eventsToSend = [];

    for (const evento of eventos) {
      // Obtiene las categorías del evento.
      const [categorias] = await db.execute(
        "SELECT categoria from CategoriaEvento where idEvento = ?;",
        [evento.idEvento]
      );
      const categ = [];

      for (const categoria of categorias) {
        categ.push(categoria.categoria);
      }

      // Obtiene los materiales del evento.
      const [materiales] = await db.execute(
        "SELECT * from Material where idEvento= ?;",
        [evento.idEvento]
      );
      fecha_hora_array = evento.fechaHora.toISOString().split("T");
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
        metariales: materiales,
      };

      // Agrega el objeto al array.
      eventsToSend.push(event);
    }

    return {
      err: false,
      message: "Get All Events Succesfully!",
      data: eventsToSend,
    };
  } catch (error) {
    return {
      err: true,
      message: error.message,
    };
  }
};
