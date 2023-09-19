import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import './Titulo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export function CardEvento({evento}) {

    let categorias = [];
    for (let i=0;i<evento.categorias.length;i++) {
        categorias.push(
            <Chip label={evento.categorias[i]}/>
        );
    }
    return (
        <Container>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 4, sm: 5, md: 5 }}  columns={12}>
                <Grid item xs={4}>
                    <div className='d-flex align-items-start flex-column content'>
                        <h5 className='heads'> {evento.titulo} </h5>
                        <p className='s_descripcion mt-1'>{evento.descripcion}</p>
                        <h6 className='mt-auto'> Categorías:</h6>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{marginBottom: 1}}>
                            {categorias} 
                        </Stack>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className='d-flex align-items-start flex-column mt-4'>
                        <h6 className='align_l'> Fecha: {evento.fecha}</h6>  
                        <h6 className='align_l'> Duración: {evento.duracion} </h6>
                        <h6 className='align_l'> Ubicación: {evento.ubicacion} </h6>
                        <h6 className='align_l'> Formato: {evento.formato} </h6>
                        <h6 className='align_l'> Costo: {evento.costo} </h6>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <img src={evento.img} alt='IMG'/>
                </Grid>
            </Grid>
        </Container>
    )
}

const Container = styled.div`
display: flex;
padding: 35px;

border-radius: 9px 9px 9px 9px;
-moz-border-radius: 9px 9px 9px 9px;
-webkit-border-radius: 9px 9px 9px 9px;
border: 3px solid #c7c7c7;

& img {
    border-radius: 9px 9px 9px 9px;
    width: 100%;
    max-width: 18rem;
    max-height: 22rem;
}
`




