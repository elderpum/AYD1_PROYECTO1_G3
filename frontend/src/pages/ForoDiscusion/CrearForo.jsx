import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useForm } from '../hooks/useForm';
import { setForo } from './helpers/setForo';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

import white_logo from '../../assets/white_logo.png';
import './css/crearForo.css';


export const CrearForo = () => {

    //Estado de categoria.
    const [category, setCaegory] = useState('');

    //Redireccionamiento.
    const navigate = useNavigate();


    //Control de formulario.
    const { form, handleChange, handleReset } = useForm({
        nombre: '',
        descripcion: '',
    });


    //Redirecciona a la pagina de foro de discusión.
    const onForo = () => {
        navigate('/foro', {
            replace: true, //No dejar que la persona regrese a la pagina anterior.
        });
    }


    //Control de categoria.
    const handleChangeCategory = (event) => {
        setCaegory(event.target.value)
    }


    //Control de formulario.
    const handleSubmint = (e) => {
        e.preventDefault(); //Evita que se recargue la pagina.

        setForo(form, category);
        setCaegory('');
        handleReset();

        return (
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="success">Foro creado exitosamente.</Alert>
            </Stack>
        );
    }

    return (
        <>
            <div className="body-crear-foro">

                <div className="container-crear-foro">

                    <div className="container-logo-foro">
                        <img src={white_logo} alt="logo" width="210" height="75" />
                    </div>

                    <div className="form-container-foro">
                        <h3> Crea tu propio foro de discusión. </h3>

                        <form onSubmit={handleSubmint}>

                            <div>
                                <TextField sx={{ m: 1, width: '30ch', }} required label="Nombre del foro" name='nombre' value={form.nombre} onChange={handleChange} variant="filled" />

                                <FormControl sx={{ m: 1, width: '32ch' }} variant="filled">
                                    <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        onChange={handleChangeCategory}
                                    >
                                        <MenuItem value={'Area común'}>Area común</MenuItem>
                                        <MenuItem value={'Ciencia'}>Ciencia</MenuItem>
                                        <MenuItem value={'Tecnología'}>Tecnología</MenuItem>
                                        <MenuItem value={'Medicina'}>Medicina</MenuItem>
                                        <MenuItem value={'Derecho'}>Derecho</MenuItem>
                                        <MenuItem value={'Arquitectura'}>Arquitectura</MenuItem>
                                        <MenuItem value={'Programación'}>Programación</MenuItem>
                                        <MenuItem value={'Sistemas'}>Sistemas</MenuItem>
                                        <MenuItem value={'Ingeniería'}>Ingeniería</MenuItem>
                                        <MenuItem value={'Finanzas'}>Finanzas</MenuItem>
                                        <MenuItem value={'Disño gráfico'}>Disño gráfico</MenuItem>
                                        <MenuItem value={'Derpote'}>Derpote</MenuItem>
                                        <MenuItem value={'Matemática'}>Matemática</MenuItem>
                                        <MenuItem value={'Física'}>Física</MenuItem>
                                        <MenuItem value={'Contabilidad'}>Contabilidad</MenuItem>
                                        <MenuItem value={'Otros'}>Otros</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div>
                                <TextField sx={{ m: 1, width: '64ch' }} required label="Descipción del foro" name='descripcion' value={form.descripcion} onChange={handleChange} variant="filled" />
                            </div>

                            <div style={{ marginTop: 20 }}>
                                <Button sx={{ m: 1, height: '6ch', width: '18ch' }} onClick={onForo} color="error" variant="contained">Atras</Button>
                                <Button sx={{ m: 1, height: '6ch', width: '18ch', }} type="submit" variant="contained">Crear</Button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </>
    )
}