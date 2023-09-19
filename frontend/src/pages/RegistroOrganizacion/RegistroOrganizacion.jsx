import React, { useState } from 'react';
import { FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import { useForm } from '../hooks/useForm';
import { setOrganizador } from './helper/setOrganizador'
import withe_logo from '../../assets/white_logo.png';
import './registroOrganizador.css';


export const RegistroOrganizacion = () => {

    // Manejo de formulario.
    const { form, handleChange, handleReset } = useForm({
        nombre: '',
        apellido: '',
        correo: '',
        contrasenia: '',
        institucion: '',
        numero: '',
        direccion: '',
        descripcion: '',
    });


    //Estado del checkbox.
    const [checked, setChecked] = useState(false);


    //Estado del select.
    const [gender, setGender] = useState('');


    //Estado del datepicker.
    const [dateSelect, setDate] = useState(null);


    //Control o cambio del checkbox.
    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };


    //Control del genero
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };


    //Control del datepicker.
    const handleDateChange = (date) => {
        setDate(date);
    };


    //Funcion registro.
    const handleSubmit = (e) => {
        e.preventDefault(); //evita el recargo de la pagina

        if (checked === false) {
            alert('Debe aceptar los terminos y condiciones');
            return;
        }

        if(gender === ''){
            return alert('Debe seleccionar un genero');
        }

        if(dateSelect === null){
            return alert('Debe seleccionar una fecha');
        }

        setOrganizador(form, gender, dateSelect);

        handleReset();
        setChecked(false);
        setGender('');
        setDate(null);
    }

    return (

        <div className="body-organizador">

            <div className="content-organizador">

                <div className="content-logo-organizador">
                    <div>
                        <img src={withe_logo} alt="logo" width='350vh' height="115vh" />
                    </div>
                </div>

                <div className="content-form">

                    <div style={{ margin: 15 }}>
                        <h1>Registro Organizador</h1>
                    </div>

                    <div className="form-inputs">

                        <Grid container  rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} columns={12} >

                            <Grid item xs={6} >
                                <TextField
                                    fullWidth
                                    required
                                    label="Nombre"
                                    name='nombre'
                                    value={form.nombre}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Apellido"
                                    name='apellido'
                                    value={form.apellido}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="@Correo"
                                    name='correo'
                                    value={form.correo}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Contraseña"
                                    type="password"
                                    name='contrasenia'
                                    value={form.contrasenia}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel id="demo-simple-select-label">Género</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        label="eduacion"
                                        onChange={handleGenderChange}
                                    >
                                        <MenuItem value={'Ciencia'}>Masculino</MenuItem>
                                        <MenuItem value={'Tecnología'}>Femenino</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Nombre de la institución"
                                    name='institucion'
                                    value={form.institucion}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Número de teléfono"
                                    name='numero'
                                    value={form.numero}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker
                                            label="Fecha de nacimiento"
                                            value={dateSelect}
                                            onChange={handleDateChange}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Dirección"
                                    name="direccion"
                                    value={form.direccion}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label=" Descripción de la institución/empresa"
                                    name="descripcion" value={form.descripcion}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={checked}
                                        onChange={handleCheckboxChange} />}
                                    label="Acepto los términos y condiciones"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <div
                                    className='container-fluid d-flex justify-content-center align-items-center'
                                    style={{ gap: '20px' }}
                                >
                                    <Button  onClick={handleSubmit} variant="contained">Registrarse</Button>
                                    <Button color="error" variant="contained">Atras</Button>
                                </div>
                            </Grid>

                        </Grid>

                    </div>

                </div>

            </div>

        </div>
    );
}