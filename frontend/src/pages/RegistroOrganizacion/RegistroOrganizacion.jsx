import React, { useState } from 'react';
import { FormControlLabel, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useForm } from '../hooks/useForm'

import './registroOrganizador.css';
import withe_logo from '../../assets/white_logo.png';


const currencies = [
    {
        value: 'S',
        label: 'Seleccionar',
    },
    {
        value: 'Masculino',
        label: 'Masculino',
    },
    {
        value: 'Femenino',
        label: 'Femenino',
    },
];


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
        // console.log(form);
        console.log(gender);
        // console.log(checked);
        console.log(dateSelect);
        handleReset();
        setChecked(false);
        setGender('S');
        setDate(null);
    }

    return (

        <div className="body-organizador">

            <div className="content-organizador">

                <div className="content-logo-organizador">
                    <div>
                        <img src={withe_logo} alt="logo" width="400" height="115" />
                    </div>
                </div>

                <div className="content-form">

                    <div style={{ margin: 15 }}>
                        <h1>Registro Organizador</h1>
                    </div>

                    <div className="form-inputs">

                        <form onSubmit={handleSubmit}>
                            <div>
                                <TextField sx={{ m: 1, width: '30ch' }} label="Nombre" name='nombre' value={form.nombre} onChange={handleChange} variant="filled" />
                                <TextField sx={{ m: 1, width: '30ch' }} label="Apellido" name='apellido' value={form.apellido} onChange={handleChange} variant="filled" />
                                <TextField sx={{ m: 1, width: '62ch', }} label="@Correo" name='correo' value={form.correo} onChange={handleChange} variant="filled" />
                            </div>

                            <div>
                                <TextField sx={{ m: 1, width: '30ch' }} label="Contraseña" type="password" name='contrasenia' value={form.contrasenia} onChange={handleChange} variant="filled" />

                                <TextField
                                    sx={{ m: 1, width: '30ch' }}
                                    select
                                    label="Género"
                                    SelectProps={{
                                        native: true,
                                    }}
                                    value={gender}
                                    onChange={handleGenderChange}
                                    variant="filled"
                                >
                                    {currencies.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </TextField>
                            </div>

                            <div>
                                <TextField sx={{ m: 1, width: '30ch' }} label="Nombre de la institución" name='institucion' value={form.institucion} onChange={handleChange} variant="filled" />
                                <TextField sx={{ m: 1, width: '30ch' }} label="Número de teléfono" name='numero' value={form.numero} onChange={handleChange} variant="filled" />
                            </div>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer sx={{ m: 1, marginLeft: 4.2, }} components={['DatePicker']} >
                                    <DatePicker label="Fecha de nacimiento" value={dateSelect} onChange={handleDateChange} />
                                </DemoContainer>
                            </LocalizationProvider>

                            <TextField sx={{ m: 1, width: '62ch', }} label="Dirección" name="direccion" value={form.direccion} onChange={handleChange} variant="filled" />

                            <TextField sx={{ m: 1, width: '62ch', }} label=" Descripción de la institución/empresa" name="descripcion" value={form.descripcion} onChange={handleChange} variant="filled" />

                            <FormControlLabel sx={{ m: 1, }} control={<Checkbox checked={checked} onChange={handleCheckboxChange} />} label="Acepto los términos y condiciones" />

                            <div>
                                <Button type="submit" sx={{ m: 1, height: '6ch' }} variant="contained">Registrarse</Button>

                                <Button sx={{ m: 1, height: '6ch', width: '18ch' }} color="error" variant="contained">Atras</Button>
                            </div>
                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}