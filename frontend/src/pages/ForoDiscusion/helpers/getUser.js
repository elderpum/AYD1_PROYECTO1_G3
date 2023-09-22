export const getUser = async () => {

    const token = localStorage.getItem("auth");

    const url = 'http://localhost:3001/obtenerUsuario';
    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
        },
    });

    const userData = await resp.json();

    const user = {
        id: userData.id,
        nombre: userData.nombre,
        correo: userData.correo,
    }


    return user;
}
