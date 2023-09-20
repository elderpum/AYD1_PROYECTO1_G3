const db = require("../Config/databaseConfig");

function ejemploAdmin() {
  return "Ejemplo de Admin";
}

async function getOrganizadores() {
  try {
    const [result] = await db.query("SELECT * FROM  Organizador");
    return result;
  } catch (error) {
    throw error;
  }
}

async function blockUser(data) {
  try {
    //Organizador
    if ((data.type === 1)) {
      [result] = await db.execute("SELECT * from Organizador where ID = ?;", [
        data.id,
      ]);
      query = "UPDATE Organizador SET errores = 5 where CorreoElectronico = ?;";
      //Estudiante
    } else if ((data.type === 2)) {
      [result] = await db.execute(
        "SELECT * from estudiantes where id_estudiante = ?;",
        [data.id]
      );
      query = "UPDATE estudiantes SET errores = 5 WHERE email = ?";
    }

    if (result.length === 0) {
      return { err: true, message: "User don't exist" };
    }


    if (data.type === 1) {
      await db.execute(query, [result[0].CorreoElectronico]);
    } else if (data.type === 2){
      await db.execute(query, [result[0].email]);
    }
    

    return {
      err: false,
      message: "User block successfully",
    };
  } catch (error) {
    return {
      err: true,
      message: error.message,
    };
  }
}

async function unblockUser(data) {
  try {
    //Organizador
    if ((data.type === 1)) {
      [result] = await db.execute("SELECT * from Organizador where ID = ?;", [
        data.id,
      ]);
      query = "UPDATE Organizador SET errores = 0 where CorreoElectronico = ?;";
      //Estudiante
    } else if ((data.type === 2)) {
      [result] = await db.execute(
        "SELECT * from estudiantes where id_estudiante = ?;",
        [data.id]
      );
      query = "UPDATE estudiantes SET errores = 0 WHERE email = ?";
    }

    if (result.length === 0) {
      return { err: true, message: "User don't exist" };
    }

    if (data.type === 1) {
      await db.execute(query, [result[0].CorreoElectronico]);
    } else if (data.type === 2){
      await db.execute(query, [result[0].email]);
    }

    return {
      err: false,
      message: "User Unblock successfully",
    };
  } catch (error) {
    return {
      err: true,
      message: error.message,
    };
  }
}

module.exports = {
  ejemploAdmin,
  getOrganizadores,
  blockUser,
  unblockUser,
};
