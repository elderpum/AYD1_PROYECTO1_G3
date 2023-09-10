var estudiantes = []

function EjemploE(){
    return 'Ejemplo'
}

function add(estudiante){
    const student = estudiante    
    estudiantes.push(student)
    return 'Se agrego correctamente'
}

function getAll(){
    return estudiantes
}

module.exports = {
    EjemploE,
    add,
    getAll
};
