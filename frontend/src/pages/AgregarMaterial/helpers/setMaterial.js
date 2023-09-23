const Swal = require('sweetalert2');

export const setMaterial = async (form, date, category, material) => {

    const mont = (parseInt(date.$M) + 1).toString();
    const fecha = date.$y + "/" + mont + "/" + date.$D;

    const newMaterial = {
        titulo: form.titulo,
        duenio: form.duenio,
        url: form.url,
        categoria: category,
        fechaPublicacion: fecha,
        nombreArchivo: material.name,
        archivoBase64: material.base64
    }

    // Peticion al backend.
    await fetch('http://localhost:3001/api/materiales/addMaterial', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMaterial)
    })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                title: 'Agregar Material.',
                text: 'El material se ha creado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        })
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Error al crear material educativo.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.log(err)
        })

}
