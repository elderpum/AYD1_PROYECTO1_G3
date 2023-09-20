import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MisEventos.css'

import { Titulo } from '../../components/Titulo';
import { CardEvento } from '../../components/CardEvento';
import { Sidebar } from '../../components/Sidebar'
import { Link } from "react-router-dom"; // import de la libreria para el ruteo de la pagina

export function MisEventos(props) {
    const [lista_eventos, setListaEventos] = useState([]);
    /* PETICION DE TODOS LOS CREADOR POR EL ORGANIZADOR */
    const token = localStorage.getItem("auth");
    const url = `http://localhost:3001/api/organizador/getAllEvents`;

    const fetchData = async () => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify({idOrga: '1'}),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
            eventos = res.data
            console.log(res)
        });
    };
    fetchData();
    setListaEventos(eventos)
    /*
    var cards_list = [];
    for (let i=0;i<eventos.length;i++) {
        cards_list.push(
            <Grid item xs={12}>
                <CardEvento evento={eventos[i]}/>
            </Grid>
        );
    }*/
    return (
        <Container>
            <Sidebar isOrganizador={true} opcionActiva={'miseventos'}/>
            <BodyContent>
                <Titulo titulo={'Mis Eventos'}/>
                <div className='d-flex justify-content-start mb-4'>
                    <Link to="/crear-evento">
                        <Button variant="contained" size="small"> Crear Evento </Button>
                    </Link>
                </div>
                <Grid container rowSpacing={7} columns={12} sx={{ width: 1 }}>
                    {lista_eventos.map((evento) => (
                        <Grid item xs={12}>
                            <CardEvento evento={evento}/>
                        </Grid>
                    ))}
                </Grid>
            </BodyContent>
        </Container>
    )
}

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

var eventos = [
    {
        "titulo": "Taller de programación 4",
        "descripcion": "Talle para estudiantes principiantes en IA.",
        "fecha": "2023-12-29",
        "hora": "18:00",
        "duracion": "02:00:00",
        "ubicacion": "En la sala de Meet",
        "categorias": ["Programación", "Matemática", "Sistemas", "Ciencia"],
        "costo": "0.00",
        "img": "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2023/06/ia-3056634.jpg?tf=3840x",
        "formato": "Virtual",
        "materiales": [
            {
                "idMaterial": 2,
                "nombre": "Documento 2",
                "descripcion": "se describe cositas 2",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            }
        ]
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
        "materiales": [
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            }
        ]
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
        "materiales": [
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            }
        ]
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
        "materiales": [
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
                "idEvento": 1,
            }
        ]
    },
]