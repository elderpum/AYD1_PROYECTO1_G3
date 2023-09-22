export const getForo = async () => {

    const url = 'http://localhost:3001/obtenerForo';
    const resp = await fetch(url);
    const data = await resp.json();

    const foro = data.map(foroData => {
        return {
            id: foroData.id,
            nombre: foroData.nombre,
            categoria: foroData.categoria,
            comentarios: foroData.comentario, //esta una lita {} con los datos del comentario.
        }
    });

    return foro;
}
