export const getForo = async () => {

    const token = localStorage.getItem("auth");
    const url = 'http://localhost:3001/api/foros/getforos';
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });
    const data = await resp.json();

    const foro = data.map(foroData => {
        return {
            id: foroData.idForo,
            nombre: foroData.nombre,
            descripcion: foroData.descripcion,
            categoria: foroData.categoria,
            comentarios: foroData.comentario,
        }
    });

    return foro;
}
