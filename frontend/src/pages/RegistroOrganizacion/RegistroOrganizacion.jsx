import React from 'react';
import { FormControlLabel, TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import './registroOrganizador.css';
import withe_logo from '../../assets/white_logo.png';


const currencies = [
    {
        value: 'S',
        label: 'Seleccionar',
    },
    {
        value: 'M',
        label: 'Masculino',
    },
    {
        value: 'F',
        label: 'Femenino',
    },
];


export const RegistroOrganizacion = () => {


    return (

        <div className="body-organizador">

            <div className="content-organizador">

                <div className="content-logo">
                    <div>
                        <img src={withe_logo} alt="logo" width="400" height="115" />
                    </div>
                </div>

                <div className="content-form">

                    <div>
                        <h1>Registro de Organización</h1>
                    </div>

                    <div className="form-inputs">
                        <form>
                            <div>
                                <TextField id="txtNombre" sx={{ m: 1, width: '30ch' }} label="Nombre" variant="filled" />
                                <TextField id="txtApellido" sx={{ m: 1, width: '30ch' }} label="Apellido" variant="filled" />
                                <TextField id="txtCorreo" sx={{ m: 1, width: '62ch', }} label="@Correo" variant="filled" />
                            </div>

                            <div>
                                <TextField id="txtContrasenia" sx={{ m: 1, width: '30ch' }} label="Contraseña" type="password" variant="filled" />
                                <TextField id="txtGenero" select label="Género" sx={{ m: 1, width: '30ch' }}
                                    SelectProps={{
                                        native: true,
                                    }}
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
                                <TextField id="txtInstitucion" sx={{ m: 1, width: '30ch' }} label="Nombre de la institución" variant="filled" />
                                <TextField id="txtNumero" sx={{ m: 1, width: '30ch' }} label="Número de teléfono" variant="filled" />
                            </div>

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer sx={{ m: 1, marginLeft: 4.2, }} components={['DatePicker']} >
                                    <DatePicker label="Fecha de nacimiento" />
                                </DemoContainer>
                            </LocalizationProvider>

                            <TextField id="txtDireccion" sx={{ m: 1, width: '62ch', }} label="Dirección" variant="filled" />

                            <TextField id="txtDescripcion" sx={{ m: 1, width: '62ch', }} label=" Descripción de la institución/empresa" variant="filled" />

                            <FormControlLabel sx={{ m: 1, }} control={<Checkbox />} label="Acepto los términos y condiciones" />

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