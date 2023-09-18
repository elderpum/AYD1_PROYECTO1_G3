import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../../assets/white_logo.png'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Link, useNavigate } from "react-router-dom"; // import de la libreria para el ruteo de la pagina

import 'bootstrap/dist/css/bootstrap.min.css';
import './RegistroEstudiante.css';
const Swal = require('sweetalert2');

export function RegistroEstudiante() {
    const [fecha, setFecha] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [genero, setGenero] = useState('');
    const [eduacion, setEducacion] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [telefono, setTelefono] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    const handleChangeGen = (event) => {
        setGenero(event.target.value);
    };

    const handleChangeEducation = (event) => {
        setEducacion(event.target.value);
    };

    const handleChangeCheckbox = (event) => {
        setIsChecked(event.target.checked);
    };
    
    const [showPassword, setShowPassword] = React.useState(null);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const registrarse = () => {
        if (isChecked) {
            axios.post("http://localhost:3001/api/estudiantes/add", {
                estudiante: {
                    nombre: nombre,
                    apellidos: apellido,
                    email: correo,
                    pass: contra,
                    nacimiento: fecha,
                    genero: genero,
                    nivel_educacion: eduacion,
                    Departamento: departamento,
                    telefono: telefono,
                    atc: true
                }
            }).then(function (response) {
                Swal.fire({
                    title: 'Felicidades!',
                    text: 'Registrado exitosamente!.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                navigate("/main");
                console.log(fecha);
            }).catch(function (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Hubo un error al registrarse.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                console.log(error);
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Debe aceptar los terminos y condiciones para registrarse.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }
    /*
    const clearAll = () => {
        setFecha('');
        setNombre('');
        setApellido('');
        setCorreo('');
        setContra('');
        setGenero('');
        setEducacion('');
        setDepartamento('');
        setTelefono('');
        setIsChecked(false);
    };
    */
    return (
        <Container>
            <ContainerAlternativo>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <img src={logo} alt='logo'/>
                </div>
            </ContainerAlternativo>
            <ContainerRegistro>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}  columns={12}>
                    <Grid item xs={12}>
                        <h1 className='titulo'>
                            Regístrate
                        </h1>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth 
                            id="nombre"
                            label="Nombre"
                            variant="filled"
                            size="small"
                            onChange={(newValue) => setNombre(newValue.target.value)}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth 
                            id="apeliido"
                            label="Apellido"
                            variant="filled"
                            size="small"
                            onChange={(newValue) => setApellido(newValue.target.value)}
                            />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            fullWidth 
                            id="correo"
                            label="Correo Electronico"
                            variant="filled"
                            size="small"
                            onChange={(newValue) => setCorreo(newValue.target.value)}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl     variant="filled">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="filled-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Contraseña"
                                onChange={(newValue) => setContra(newValue.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                label="Fecha de Nacimiento"
                                onChange={(newValue) => setFecha(newValue)}
                                views={["year", "month", "day"]}
                                format="YYYY-MM-DD"/>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Genero</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genero}
                                label="Genero"
                                onChange={handleChangeGen}>
                                <MenuItem value={'Masculino'}>Masculino</MenuItem>
                                <MenuItem value={'Femenino'}>Femenino</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Educacion</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={eduacion}
                                label="eduacion"
                                onChange={handleChangeEducation}>
                                <MenuItem value={'Primaria'}>Primaria</MenuItem>
                                <MenuItem value={'Básico'}>Básico</MenuItem>
                                <MenuItem value={'Diversificado'}>Diversificado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                        id="outlined-number"
                        label="Telefono"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={(newValue) => setTelefono(newValue.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth 
                            id="departamento"
                            label="Departamento"
                            variant="filled"
                            size="small"
                            onChange={(newValue) => setDepartamento(newValue.target.value)}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel required control={<Checkbox checked={isChecked} onChange={handleChangeCheckbox}/>} label="Acepto los términos y condiciones de uso." />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <div className='container-fluid d-flex flex-row-reverse bd-highlight'>
                            <button type="button" className="btn btn-success mrgn_left" onClick={registrarse}> Registrarse</button>
                            <Link to="/registroOrganizador">
                                <button type="button" className="btn btn-danger mrgn_left">Soy Una Organizacion</button>
                            </Link>
                            <Link to="/">
                                <button type="button" className="btn btn-info mrgn_left">Iniciar Sesion</button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </ContainerRegistro>
        </Container>
    );
}

/*

● Aceptación de Términos y Condiciones:

*/

const ContainerAlternativo = styled.div`
display: flex;
height: 550px;
width: 400px;
align-items: center;
justify-content: center;
background-color: #181818;
border-radius: 6px 0 0 6px;

& img {
    height: 75px;
}

& .mrgn {
    margin-top: 12px;
}
`

const ContainerRegistro = styled.div`
height: 550px;
width: 590px;
background-color: white;
border-radius: 0 6px 6px 0;
padding: 30px;

& button {
    color: white;
}

& button:hover {
    color: white;
}

& .mrgn_left {
    margin-left: 10px;
}
`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
top: 0;
height: 100%;
min-height: 100vh;
background: rgb(2,0,36);
background: linear-gradient(30deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 29%, rgba(0,212,255,1) 100%);
`

/*
background: linear-gradient(transparent, rgba(50, 90, 100, 1));
background-color: rgb(156, 41, 39);
*/