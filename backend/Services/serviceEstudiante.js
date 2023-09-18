const db = require("../Config/databaseConfig");
const bcrypt = require("bcrypt");

function EjemploE() {
  return "Ejemplo";
}

async function add(estudiante) {
  const query =
    "insert into estudiantes(nombre, apellido, email, password, fecha_nacimiento, genero, nivel_educacion, departamento, telefono, atc, errores) values (?,?,?,?,?,?,?,?,?,?,?);";
  const hash = await bcrypt.hash(estudiante.pass, 10);
  const values = [
    estudiante.nombre,
    estudiante.apellidos,
    estudiante.email,
    hash,
    estudiante.nacimiento,
    estudiante.genero,
    estudiante.nivel_educacion,
    estudiante.Departamento,
    estudiante.telefono,
    estudiante.atc,
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
    const [result] = await db.query("SELECT * FROM  estudiantes");
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  EjemploE,
  add,
  getAll,
};
