import React from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';

import { Grid, Button, Stack, Chip} from '@mui/material';
import { Sidebar } from '../../components/Sidebar'
import { Link } from "react-router-dom";
import { useEventContext } from '../../contexts/eventsContext';

import 'bootstrap/dist/css/bootstrap.min.css';

export function VisualizarEvento({isOrganizador}) {
    const {event} = useEventContext();

    async function VerMaterial(url) {
        const newWindow = window.open(url, "_blank");
        if (newWindow) {
            newWindow.focus();
        } else {
            alert(
                "El bloqueo de ventanas emergentes está habilitado en su navegador. Habilite las ventanas emergentes para ver el contenido."
            );
        }
    }
    return (
        <Container>
            <Sidebar isOrganizador={isOrganizador} opcionActiva={'buscar'}/>
            <BodyContent>
                <div className='d-flex align-items-start flex-column my-4'>
                    <Link to="/buscarEvento">
                        <Button variant="contained" startIcon={<ArrowBackIcon />}>
                            Regresar
                        </Button>
                    </Link>
                </div>
                <ContainerInfo>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 3 }}  columns={12}>
                        <Grid item xs={12}>
                            <div className='d-flex align-items-start'>
                                <h4>{event.titulo}</h4>

                                <Link to={`/asistirEvento/${event.costo}`}>
                                    <Button 
                                        variant="outlined" 
                                        color='success' 
                                        size='small' 
                                        sx={{ borderRadius: 50 }} 
                                        startIcon={<CheckIcon/>}
                                    >
                                        Asistir
                                    </Button>
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='d-flex align-items-start'>
                                <p className='d-flex align-items-start talign'>
                                {event.descripcion}
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{marginBottom: 1}}>
                                <Chip label={event.categorias[0]}/>
                                <Chip label={event.categorias[1]}/>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='d-flex align-items-start flex-column mt-4'>
                                <ContainerData>
                                <h6 className='align_l'> Hora: {event.hora}</h6>  
                                <h6 className='align_l'> Fecha: {event.fecha} </h6>
                                </ContainerData>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='d-flex align-items-start flex-column mt-4'>
                                <ContainerData>
                                    <h6 className='align_l'> Duración: {event.duracion} </h6>
                                    <h6 className='align_l'> Ubicación: {event.ubicacion} </h6>
                                </ContainerData>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className='d-flex align-items-start flex-column mt-4'>
                                <ContainerData>
                                    <h6 className='align_l'> Formato: {event.formato} </h6>
                                    <h6 className='align_l'> Costo: {event.costo} </h6>
                                </ContainerData>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <img src={event.img} alt='o'/>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='d-flex align-items-start'>
                                <h5>Material Adicional</h5>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='d-flex align-items-start'>
                            {event.materiales.map((material) => (
                                <ContainerMaterial>
                                    <h6>{material.nombre}</h6>
                                    <p>{material.descripcion}</p>
                                    <Button variant="contained" size="small" onClick={() => VerMaterial(material.link)}>
                                        Ver Material
                                    </Button>
                                </ContainerMaterial>
                            ))}
                            </div>
                        </Grid>
                    </Grid>
                </ContainerInfo>
            </BodyContent>
        </Container>
    )
}

const ContainerMaterial = styled.div`
display: inline-block;
padding: 20px;
background-color: #e4e4e4;
text-align: left;
margin: 15px;
min-width: 250px;

border-radius: 7px 7px 7px 7px;
-moz-border-radius: 7px 7px 7px 7px;
-webkit-border-radius: 7px 7px 7px 7px;
`


const ContainerData = styled.div`
display: inline-block;
width: 100%;
padding: 20px;
background-color: #e4e4e4;
text-align: left;
margin: 15px;

border-radius: 7px 7px 7px 7px;
-moz-border-radius: 7px 7px 7px 7px;
-webkit-border-radius: 7px 7px 7px 7px;
`

const ContainerInfo = styled.div`
display: inline-block;

& .talign {
    text-align: left;
}

& img {
    max-width: 600px;
    max-height: 600px;
}

& h4 {
    margin-right: 25px;
}
`

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