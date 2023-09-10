var organizadores = [
    {
        nombre: "Organizador1",
        apellido: "OrgaApellido1",
        email: "organizador1@gmail.com",
        pass: "1234",
        nacimiento: "2023-02-09 17:49:36",
        genero: "Mujer",
        empresa: "Emrpesita 1",
        descrip_empresa: "La mejor empresita",
        direc_empresa: "esta en un lugar del mundo",
        tel_empresa: 78945632,
        atc: true
    },
    {
        nombre: "Organizador2",
        apellido: "OrgaApellido2",
        email: "organizador2@gmail.com",
        pass: "1234",
        nacimiento: "2023-02-09 17:49:36",
        genero: "Mujer",
        empresa: "Emrpesita 2",
        descrip_empresa: "La mejor empresita",
        direc_empresa: "esta en un lugar del mundo",
        tel_empresa: 78945632,
        atc: true
    },
    {
        nombre: "Organizador3",
        apellido: "OrgaApellido3",
        email: "organizador3@gmail.com",
        pass: "1234",
        nacimiento: "2023-02-09 17:49:36",
        genero: "Mujer",
        empresa: "Emrpesita 3",
        descrip_empresa: "La mejor empresita",
        direc_empresa: "esta en un lugar del mundo",
        tel_empresa: 78945632,
        atc: true
    }
]

function ejemploAdmin(){
    return 'Ejemplo de Admin'
}

function getOrganizadores(){
    return organizadores
}


module.exports = {
    ejemploAdmin,
    getOrganizadores
};
