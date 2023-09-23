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


    const foro = data.foros.data.map(foroData => {
        return {
            id: foroData.id,
            titulo: foroData.titulo,
            descripcion: foroData.descripcion,
            categoria: foroData.categoria,
            comentarios: foroData.comentarios,
        }
    });

    return foro;
}
