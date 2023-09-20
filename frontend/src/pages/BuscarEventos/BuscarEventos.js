import React, {useState} from 'react';
import styled from 'styled-components';

import {Grid, TextField, Button, Autocomplete} from '@mui/material';
// import {Grid} from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Titulo } from '../../components/Titulo';
import { Sidebar } from '../../components/Sidebar'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CardBusqueda } from './CardBusqueda'


export function BuscarEventos({isOrganizador}) {
    const [categoria, setCategoria] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [palabra, setPalabra] = useState('');
    const [resultado, setResultado] = useState([]);
    var busqueda = []
    /* PETICION DE TODOS LOS EVENTOS */
    const filtrar = () => {
        busqueda = []
        
        for (let i=0;i<eventos.length;i++) {
            // VALIDACION de la palabra
            if (palabra !== '') {
                let re = new RegExp(palabra);
                if (eventos[i].titulo.match(re)) { // si no es nulo se sigue validando
                    // VALIDACION de las categorias
                    if (categoria.length > 0) { // si hay categorias se valida
                        let contador = 0;
                        for (let j=0; j<categoria.length;j++) {
                            for (let k=0; k<eventos[i].categorias.length;k++) {
                                if (categoria[j] === eventos[i].categorias[k]) {
                                    contador++;
                                }
                            }
                        }
                        if (contador >= categoria.length) { // las categorias se cumplen
                            // VALIDACION de las fechas
                            if ((fechaInicio !== '' && fechaInicio !== ' ') || (fechaFinal !== '' && fechaFinal !== ' ')) {
                                let inicio = Date.parse(fechaInicio);
                                let final = Date.parse(fechaFinal);
                                let fecha_evento = Date.parse(eventos[i].fecha);

                                if (fecha_evento >= inicio && fecha_evento <= final) {
                                    busqueda.push(eventos[i]);
                                }
                            } else {
                                busqueda.push(eventos[i]);
                            }
                        }
                    } else {// se pasa a los otros filtros
                        // VALIDACION de las fechas
                        if ((fechaInicio !== '' && fechaInicio !== ' ') || (fechaFinal !== '' && fechaFinal !== ' ')) {
                            let inicio = Date.parse(fechaInicio);
                            let final = Date.parse(fechaFinal);
                            let fecha_evento = Date.parse(eventos[i].fecha);

                            if (fecha_evento >= inicio && fecha_evento <= final) {
                                busqueda.push(eventos[i]);
                            }
                        } else {
                            busqueda.push(eventos[i]);
                        }
                    }
                } // si es nulo se descarta
            } else { // se pasa a los otros filtros// VALIDACION de las categorias
                if (categoria.length > 0) { // si hay categorias se valida
                    let contador = 0;
                    for (let j=0; j<categoria.length;j++) {
                        for (let k=0; k<eventos[i].categorias.length;k++) {
                            if (categoria[j] === eventos[i].categorias[k]) {
                                contador++;
                            }
                        }
                    }
                    if (contador >= categoria.length) { // las categorias se cumplen
                        // VALIDACION de las fechas
                        if ((fechaInicio !== '' && fechaInicio !== ' ') || (fechaFinal !== '' && fechaFinal !== ' ')) {
                            let inicio = Date.parse(fechaInicio);
                            let final = Date.parse(fechaFinal);
                            let fecha_evento = Date.parse(eventos[i].fecha);

                            if (fecha_evento >= inicio && fecha_evento <= final) {
                                busqueda.push(eventos[i]);
                            }
                        } else {
                            busqueda.push(eventos[i]);
                        }
                    }
                } else {// se pasa a los otros filtros
                    // VALIDACION de las fechas
                    if ((fechaInicio !== '' && fechaInicio !== ' ') || (fechaFinal !== '' && fechaFinal !== ' ')) {
                        let inicio = Date.parse(fechaInicio);
                        let final = Date.parse(fechaFinal);
                        let fecha_evento = Date.parse(eventos[i].fecha);

                        if (fecha_evento >= inicio && fecha_evento <= final) {
                            busqueda.push(eventos[i]);
                        }
                    } else {
                        busqueda.push(eventos[i]);
                    }
                }
            }
        }
        
        setResultado(busqueda);
        //<CardBusqueda isOrganizador={isOrganizador} evento={eventos[i]} key={i}/>
    }
    
    const configFechaInicio = (fecha) => {
        try {
            const mont = (parseInt(fecha.$M) + 1).toString();
            var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
            setFechaInicio(fecha_);
        } catch (error) {
            setFechaInicio('');
        }
    };
    const configFechaFinal = (fecha) => {
        try {
            const mont = (parseInt(fecha.$M) + 1).toString();
            var fecha_ = fecha.$y + "-" + mont + "-" + fecha.$D;
            setFechaFinal(fecha_);
        } catch (error) {
            setFechaFinal('');
        }
    };

    return (
        <Container>
            <Sidebar isOrganizador={isOrganizador} opcionActiva={'buscar'}/>
            <BodyContent>
                <Titulo titulo={'Buscar Eventos'}/>
                <FilterBar>
                    <Grid container columns={12} columnSpacing={1}>
                        <Grid item xs={3}>
                            <TextField id="outlined-basic" label="Buscar" variant="outlined" size="small" fullWidth
                                onChange={(newValue) => setPalabra(newValue.target.value)}/>
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                multiple
                                id="tags-outlined"
                                size="small"
                                options={categorias}
                                getOptionLabel={(option) => option}
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
                                    label="Rango de Inicio"
                                    onChange={(newValue) => configFechaInicio(newValue)}
                                    views={["year", "month", "day"]}
                                    format="YYYY-MM-DD"
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker 
                                    label="Rango de Final"
                                    onChange={(newValue) => configFechaFinal(newValue)}
                                    views={["year", "month", "day"]}
                                    format="YYYY-MM-DD"
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" size='small' style={{height: 40}} fullWidth onClick={filtrar}>Filtrar</Button>
                        </Grid>
                    </Grid>
                </FilterBar>
                {resultado.map((evento) => (
                    <CardBusqueda isOrganizador={isOrganizador} evento={evento} key={Math.random()}/>
                ))}
            </BodyContent>
        </Container>
    )
}

/*
Filtrar por
    - Por Nombre
    - Por Rangos de Fecha
    - Por Categorías

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

const eventos = [
    {
        "titulo": "Taller de programación 1",
        "descripcion": "Taller para estudiantes principiantes en POO.",
        "fecha": "2023-10-29",
        "hora": "12:00",
        "duracion": "02:00:00",
        "ubicacion": "En la sala de Meetf dfa sfdsfdasfads ff fasfads fadsfd fgdgfasfads",
        "categorias": ["Programación"],
        "costo": "0.00",
        "img": "https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2dyYW1taW5nfGVufDB8fDB8fHww&w=1000&q=80",
        "formato": "Virtual",
        "materiales": [
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "google.com",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 2",
                "descripcion": "se describe cositas",
                "link": "google.com",
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
        "categorias": ["Programación", "Sistemas"],
        "costo": "0.00",
        "img": "https://empresas.blogthinkbig.com/wp-content/uploads/2019/11/Imagen3-245003649.jpg?w=800",
        "formato": "Virtual",
        "materiales": [
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "google.com",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "www.google.com",
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
        "categorias": ["Programación", "Sistemas"],
        "costo": "0.00",
        "img": "https://i.pinimg.com/736x/ae/ca/bb/aecabbb80f83af71ad05737e2ae2a483.jpg",
        "formato": "Virtual",
        "materiales": [
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "google.com",
                "idEvento": 1,
            },
            {
                "idMaterial": 1,
                "nombre": "Documento 1",
                "descripcion": "se describe cositas",
                "link": "www.google.com",
                "idEvento": 1,
            }
        ]
    },
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
