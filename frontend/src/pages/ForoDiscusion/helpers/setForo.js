const Swal = require('sweetalert2');

export const setForo = async (form, category) => {

    const token = localStorage.getItem("auth");

    const newForo = {
        titulo: form.nombre,
        descripcion: form.descripcion,
        categoria: category,
    }

    // console.log(newForo);

    // Peticion al backend.
    await fetch('http://localhost:3001/crearForo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
        },
        body: JSON.stringify(newForo)
    })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: 'Foro de discusión.',
                text: 'El foro de discusión se ha creado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Error al crear al foro de discusión.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.log(err)
        })
}
