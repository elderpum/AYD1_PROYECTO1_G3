export const getForo = async () => {

    const url = 'http://localhost:3001/obtenerFoto';
    const resp = await fetch(url);
    const data = await resp.json();

    const foro = data.map(foroData => {
        return {
            id: foroData.ID,
            nombre: foroData.nombre,
            categoria: foroData.categoria,
            comentarios: foroData.comentario,
        }
    });

    return foro;
}
