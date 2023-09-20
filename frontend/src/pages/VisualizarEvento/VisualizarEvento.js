import React, {useState} from 'react';
import styled from 'styled-components';

import {Grid, TextField, Button, Autocomplete, Stack} from '@mui/material';
import { Sidebar } from '../../components/Sidebar'
import { Link } from "react-router-dom"; // import de la libreria para el ruteo de la pagina

import 'bootstrap/dist/css/bootstrap.min.css';

export function VisualizarEvento({isOrganizador}) {

    return (
        <Container>
            <Sidebar isOrganizador={isOrganizador} opcionActiva={'buscar'}/>
            <BodyContent>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 4, sm: 5, md: 5 }}  columns={12}>
                    <Grid item xs={12}>
                        TITULO
                    </Grid>
                </Grid>
            </BodyContent>
        </Container>
    )
}

/*
Filtrar por
    - Por Nombre
    - Por Rangos de Fecha
    - Por Categorías
Al seleccionar un evento podrá acceder a la información detallada del evento, como también
la opción de asistir o comprar un boleto para el evento.

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