export const setEvento = async (gender, monthTarjet, form) => {

    const newCompetitor = {
        nombre: form.nombre,
        apellido: form.apellido,
        genero: gender,
        telefono: form.telefono,
        correo: form.correo,
        nombreTarjeta: form.nombreTarjeta,
        numTarjeta: form.numTarjeta,
        mesTarjeta: monthTarjet,
        anioTarjeta: form.anioTarjeta,
        cvvTarjeta: form.cvvTarjeta,
    }


    // console.log(newOrganizador);
    // Peticion al backend.
    await fetch('http://localhost:3001/estudiante/asistirEvento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCompetitor)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
}