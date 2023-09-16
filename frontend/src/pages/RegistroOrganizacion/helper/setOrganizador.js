export const setOrganizador = async (form, gender, date) => {

    const mont = (parseInt(date.$M) + 1).toString()

    const newOrganizer = {
        Nombre: form.nombre,
        Apellido: form.apellido,
        CorreoElectronico: form.correo,
        Contrasena: form.contrasenia,
        FechaNacimiento: date.$y + "/" + mont + "/" + date.$D,
        Genero: gender,
        NombreInstitucionEmpresa: form.institucion,
        Descripcion: form.descripcion,
        DireccionEmpresa: form.direccion,
        NumeroTelefono: form.numero,
        AceptacionTerminosCondiciones: 1,
        errores: 0
    }

    
    // console.log(newOrganizador);
    // Peticion al backend.
    await fetch('http://localhost:3001//organizador/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newOrganizer)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

}
