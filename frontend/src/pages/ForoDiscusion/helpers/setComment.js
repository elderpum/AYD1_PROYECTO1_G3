const Swal = require('sweetalert2');

export const setComments = async (comment, foroId) => {

    const newComment = {
        comentario: comment,
        nombreUsuario: "nombreUsuario",
        correoUsuario: "correoUsuario",
        idForo: foroId,
    }


    // Peticion al backend.
    await fetch('http://localhost:3001/crearComentario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => {
            Swal.fire({
                title: 'Error!',
                text: 'Error al crear un comentario.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            console.log(err)
        })
}
