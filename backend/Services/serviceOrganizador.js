var organizador = [];

function EjemploE() {
    return "Ejemplo";
}

async function add(organizador) {
    const query =
        "insert into Organizador(Nombre, Apellido, CorreoElectronico, Contrasena, FechaNacimiento, Genero, NombreInstitucionEmpresa, Descripcion, DireccionEmpresa, NumeroTelefono, AceptacionTerminosCondiciones, errores) values (?,?,?,?,?,?,?,?,?,?,?);";
    const hash = await bcrypt.hash(organizador.pass, 10);
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

module.exports = {
    EjemploE,
    add,
    getAll,
};