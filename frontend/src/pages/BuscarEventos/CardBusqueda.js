import React, {useState} from 'react';
import styled from 'styled-components';

import {Grid} from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function CardBusqueda({ evento }) {
    var categorias_evento = []
    for (let i=0;i<evento.categorias.length;i++) {
        categorias_evento.push(
            <Chip label={evento.categorias[i]}/>
        );
    }

    return (
        <Card>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 4, sm: 5, md: 5 }}  columns={12}>
                <Grid item xs={12}>
                    <div className='d-flex align-items-start flex-column content'>
                        <h5 className='heads'> {evento.titulo} </h5>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='d-flex align-items-start flex-column content'>
                        <h6> Hora: {evento.hora} </h6>
                        <h6> Fecha: {evento.fecha} </h6>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className='d-flex align-items-start flex-column content'>
                        <h6> Ubicación: {evento.ubicacion} </h6>
                        <h6> Costo: {evento.costo} </h6>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{marginBottom: 1}}>
                        {categorias_evento} 
                    </Stack>
                </Grid>
            </Grid>
            <div className='d-flex align-items-start flex-column content'>
            </div>
        </Card>
    );
}

const Card = styled.div`
display: flex;
padding: 20px;
margin-top: 30px;
transition: 0.3s ease-in-out;

border-radius: 9px 9px 9px 9px;
-moz-border-radius: 9px 9px 9px 9px;
-webkit-border-radius: 9px 9px 9px 9px;
border: 2px solid #e4e4e4;

& h5 {
    margin-bottom: 20px;
}

&:hover {
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.51);
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.51);
    -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.51);
}
`