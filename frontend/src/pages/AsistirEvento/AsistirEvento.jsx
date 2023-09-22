import React, { useState } from 'react';
import { useEventContext } from '../../contexts/eventsContext';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from '../hooks/useForm';
import { setEvento } from './helper/setEvento';


import white_logo from '../../assets/white_logo.png';
import './asistirEvento.css';


export const AsistirEvento = () => {

    const { event } = useEventContext();

    const [gender, setGender] = useState('');

    const [monthTarjet, setMonthTarjet] = useState('');

    const { form, handleChange, handleReset } = useForm({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        nombreTarjeta: '',
        numTarjeta: '',
        anioTarjeta: '',
        cvvTarjeta: '',
    });


    //Control del genero
    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };


    //Control del mes de la tarjeta
    const handleMonthTarjetChange = (event) => {
        setMonthTarjet(event.target.value);
    }


    //Funcion para manejar el submit del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); //Evita que se recargue la pagina.

        setEvento(gender, monthTarjet, form, event.id);

        handleReset();
        setGender('');
        setMonthTarjet('');
    }


    return (
        <>
            <div className="body-asistir-evento">

                <div className="container-evento">

                    <div className="container-logo">
                        <img src={white_logo} alt="logo" width="210" height="75" />
                    </div>

                    <div className="container-form-evento">

                        <h2>¡Confirma tu participacion!</h2>

                        <form onSubmit={handleSubmit} className="form-evento">
                            <div>
                                <TextField
                                    required
                                    sx={{ m: 1, width: '30ch' }}
                                    label="Nombre"
                                    name='nombre'
                                    value={form.nombre}
                                    onChange={handleChange}
                                    variant="filled"
                                />


                                <TextField
                                    required
                                    sx={{ m: 1, width: '30ch' }}
                                    label="Apellido"
                                    name='apellido'
                                    value={form.apellido}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </div>

                            <div>
                                <TextField
                                    required
                                    sx={{ m: 1, width: '30ch' }}
                                    label="Teléfono"
                                    name='telefono'
                                    value={form.telefono}
                                    onChange={handleChange}
                                    variant="filled"
                                />

                                <FormControl required sx={{ m: 1, width: '30ch' }} variant="filled">
                                    <InputLabel id="demo-simple-select-label">Género</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={gender}
                                        onChange={handleGenderChange}
                                    >
                                        <MenuItem value={'Masculino'}>Masculino</MenuItem>
                                        <MenuItem value={'Femenino'}>Femenino</MenuItem>
                                    </Select>
                                </FormControl>

                            </div>

                            <div>
                                <TextField
                                    required
                                    sx={{ m: 1, width: '62ch' }}
                                    label="Correo"
                                    name='correo'
                                    value={form.correo}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </div>

                            <div>
                                <h4
                                    hidden={event.costo === 0 ? true : false}
                                >
                                    Pago del evento
                                </h4>

                                <TextField
                                    sx={{ m: 1, width: '30ch' }}
                                    required={event.costo === 0 ? false : true}
                                    hidden={event.costo === 0 ? true : false}
                                    label="Nombre de la tarjeta"
                                    name='nombreTarjeta'
                                    value={form.nombreTarjeta}
                                    onChange={handleChange}
                                    variant="filled"
                                />

                                <TextField
                                    sx={{ m: 1, width: '30ch' }}
                                    required={event.costo === 0 ? false : true}
                                    hidden={event.costo === 0 ? true : false}
                                    label="Número de tarjera"
                                    name='numTarjeta'
                                    value={form.numTarjeta}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </div>

                            <div>
                                <FormControl
                                    hidden={event.costo === 0 ? true : false}
                                    required={event.costo === 0 ? false : true}
                                    sx={{ m: 1, width: '15ch' }}
                                    variant="filled"
                                >

                                    <InputLabel id="demo-simple-select-label">Mes</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={monthTarjet}
                                        onChange={handleMonthTarjetChange}
                                    >
                                        <MenuItem value={'Enero'}>01</MenuItem>
                                        <MenuItem value={'Febrero'}>02</MenuItem>
                                        <MenuItem value={'Marzo'}>03</MenuItem>
                                        <MenuItem value={'Abril'}>04</MenuItem>
                                        <MenuItem value={'Mayo'}>05</MenuItem>
                                        <MenuItem value={'Junio'}>06</MenuItem>
                                        <MenuItem value={'Julio'}>07</MenuItem>
                                        <MenuItem value={'Agosto'}>08</MenuItem>
                                        <MenuItem value={'Septiembre'}>09</MenuItem>
                                        <MenuItem value={'Octubre'}>10</MenuItem>
                                        <MenuItem value={'Noviembre'}>11</MenuItem>
                                        <MenuItem value={'Diciembre'}>12</MenuItem>
                                    </Select>

                                </FormControl>

                                <TextField
                                    sx={{ m: 1, width: '15ch' }}
                                    required={event.costo === 0 ? false : true}
                                    hidden={event.costo === 0 ? true : false}
                                    label="Año"
                                    name='anioTarjeta'
                                    value={form.anioTarjeta}
                                    onChange={handleChange}
                                    variant="filled"
                                />

                                <TextField
                                    sx={{ m: 1, width: '15ch' }}
                                    required={event.costo === 0 ? false : true}
                                    hidden={event.costo === 0 ? true : false}
                                    label="CVV"
                                    name='cvvTarjeta'
                                    value={form.cvvTarjeta}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </div>


                            <div style={{ marginTop: 15 }}>
                                <Button
                                    sx={{ m: 1, height: '6ch', width: '18ch' }}
                                    color="error"
                                    variant="contained">
                                    Atras
                                </Button>

                                <Button
                                    sx={{ m: 1, height: '6ch', width: '22ch', }}
                                    type="submit"
                                    variant="contained">
                                    Asistir Evento
                                </Button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}
