import React, {useState} from 'react';
import styled from 'styled-components';

import {Grid, TextField, Button, Autocomplete, Stack} from '@mui/material';
// import {Grid} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Titulo } from '../../components/Titulo';
import { Sidebar } from '../../components/Sidebar'
import { Link } from "react-router-dom"; // import de la libreria para el ruteo de la pagina
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CardBusqueda } from './CardBusqueda'

export function BuscarEventos({isOrganizador}) {
    const [categoria, setCategoria] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');

    /* PETICION DE TODOS LOS EVENTOS */
    
    const configFechaInicio = (fecha) => {
        const mont = (parseInt(fecha.$M) + 1).toString();
        var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
        setFechaInicio(fecha_);
    };
    const configFechaFinal = (fecha) => {
        const mont = (parseInt(fecha.$M) + 1).toString();
        var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
        setFechaFinal(fecha_);
    };

    return (
        <Container>
            <Sidebar isOrganizador={isOrganizador} opcionActiva={'buscar'}/>
            <BodyContent>
                <Titulo titulo={'Buscar Eventos'}/>
                <FilterBar>
                    <Grid container columns={12} columnSpacing={1}>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" label="Buscar" variant="outlined" size="small" fullWidth/>
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                size="small"
                                options={categorias}
                                getOptionLabel={(option) => option}
                                defaultValue={[categorias[0], categorias[1]]}
                                filterSelectedOptions
                                onChange={(event, newValue) => setCategoria(newValue)}
                                fullWidth
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    label="Categorías"
                                    placeholder="Materias"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Rango de Final"
                                    onChange={(newValue) => configFechaFinal(newValue)}
                                    views={["year", "month", "day"]}
                                    format="YYYY-MM-DD"
                                    slotProps={{ textField: { size: 'small' } }}/>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Rango de Final"
                                    onChange={(newValue) => configFechaFinal(newValue)}
                                    views={["year", "month", "day"]}
                                    format="YYYY-MM-DD"
                                    slotProps={{ textField: { size: 'small' } }}/>
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" size='small' style={{height: 40}} fullWidth>Filtrar</Button>
                        </Grid>
                    </Grid>
                    <div className='mt-3'>
                        <CardBusqueda evento={3}/>
                    </div>
                </FilterBar>
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
const categorias = [
    "Área común",
    "Ciencia",
    "Tecnología",
    "Medicina",
    "Derecho",
    "Arquitectura",
    "Programación",
    "Sistemas",
    "Ingeniería",
    "Finanzas",
    "Diseño gráfico",
    "Deporte",
    "Ocio",
    "Matemática",
    "Física",
    "Contabilidad",
];


const FilterBar = styled.div`
display: flex;
justify-content: start;

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