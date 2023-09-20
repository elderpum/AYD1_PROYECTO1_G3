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
    const [eventos, setListaEventos] = useState([]);
    /* PETICION DE TODOS LOS CREADOR POR EL ORGANIZADOR */
    //var eventos = [];
    const token = localStorage.getItem("auth");
    const url = `http://localhost:3001/api/organizador/getAllEvents`;
    React.useEffect(() => {
        async function getInfo() {
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
                setListaEventos(res.data)
            });
        }
        getInfo();
    }, []);

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
                    {eventos.map((evento) => (
                        <Grid item xs={12} key={Math.random()}>
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

