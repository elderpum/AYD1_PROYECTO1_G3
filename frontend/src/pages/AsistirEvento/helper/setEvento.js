const Swal = require('sweetalert2');

export const setEvento = async (gender, monthTarjet, form, idEvento) => {

    const token = localStorage.getItem("auth");

    const newCompetitor = {
        idEvento: idEvento,
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
    await fetch('http://localhost:3001/estudiantes/asistirEvento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(newCompetitor)
    })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: 'Evento.',
                text: 'tu rgistro fue exitoso.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Error al inscribirse al evento.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.log(err)
        })
}