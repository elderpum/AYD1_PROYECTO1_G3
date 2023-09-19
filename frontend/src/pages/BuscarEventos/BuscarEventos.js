import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Titulo } from '../../components/Titulo';
import { Sidebar } from '../../components/Sidebar'
import { Link } from "react-router-dom"; // import de la libreria para el ruteo de la pagina

export function BuscarEventos(props) {
    /* PETICION DE TODOS LOS EVENTOS */
    var eventos = [
        {
            "titulo": "Taller de programación 1",
            "descripcion": "Taller para estudiantes principiantes en POO.",
            "fecha": "2023-10-29",
            "hora": "12:00",
            "duracion": "02:00:00",
            "ubicacion": "En la sala de Meetf dfa sfdsfdasfads ff fasfads fadsfd fgdgfasfads",
            "categorias": ["Programacion"],
            "costo": "0.00",
            "img": "https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&w=1000&q=80",
            "formato": "Virtual",
            "materiales": "" 
        },
        {
            "titulo": "Taller de programación 2",
            "descripcion": "Los comentarios son parte de los temas de discusión, que se proporcionan, pueden existir una cantidad sin fin de comentarios para cada tema de discusión, para poder dejar un tema se debe contar con sesión activa en la plataforma, los campos que solicita al realizar un",
            "fecha": "2023-10-29",
            "hora": "14:00",
            "duracion": "02:00:00",
            "ubicacion": "En la sala de Meet",
            "categorias": ["Programacion", "Sistemas"],
            "costo": "0.00",
            "img": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
            "formato": "Virtual",
            "materiales": "" 
        },
        {
            "titulo": "Taller de programación 3",
            "descripcion": "Talle para estudiantes principiantes en Golang",
            "fecha": "2023-10-29",
            "hora": "16:00",
            "duracion": "02:00:00",
            "ubicacion": "En la sala de Meet",
            "categorias": ["Programacion", "Sistemas"],
            "costo": "0.00",
            "img": "https://i.pinimg.com/736x/ae/ca/bb/aecabbb80f83af71ad05737e2ae2a483.jpg",
            "formato": "Virtual",
            "materiales": "" 
        },
        {
            "titulo": "Taller de programación 4",
            "descripcion": "Talle para estudiantes principiantes en IA.",
            "fecha": "2023-10-29",
            "hora": "18:00",
            "duracion": "02:00:00",
            "ubicacion": "En la sala de Meet",
            "categorias": ["Programacion", "Matematica", "Sistemas", "Ciencia"],
            "costo": "0.00",
            "img": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/06/ia-3056634.jpg?tf=3840x",
            "formato": "Virtual",
            "materiales": "" 
        },
    ]

    return (
        <Container>
            <Sidebar isOrganizador={true} opcionActiva={'buscar'}/>
            <BodyContent>
                <Titulo titulo={'Buscar Eventos'}/>
            </BodyContent>
        </Container>
    )
}

/*
FALTA>
    mostrar material extra
*/

const BodyContent = styled.div`
flex: 0.8;
bottom: 0;
padding-left: 75px;
padding-right: 75px;
padding-bottom: 150px;
`

const Container = styled.div`
display: flex;
`



/*
Los estudiantes y organizadores pueden buscar los eventos disponibles en el momento
para ello tendrán un módulo de búsqueda para los eventos, donde podrán filtrar:
● Por Nombre
● Por Rangos de Fecha
● Por Categorías
Al seleccionar un evento podrá acceder a la información detallada del evento, como también
la opción de asistir o comprar un boleto para el evento.
*/