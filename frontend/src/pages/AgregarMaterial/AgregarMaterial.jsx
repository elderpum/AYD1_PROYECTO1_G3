import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { setMaterial } from './helpers/setMaterial';

import white_logo from '../../assets/white_logo.png';
import './agregarmaterial.css';


export const AgregarMaterial = () => {

    const navigate = useNavigate(); //Hook para navegar entre paginas.

    const [material, setUploadMaterial] = useState({
        profile: '',
        base64: '',
        name: '',
    });

    const [category, setCaegory] = useState('');


    const [dateSelect, setDate] = useState(null);


    const { form, handleChange, handleReset } = useForm({
        titulo: '',
        duenio: '',
        url: '',
    });


    const handleDateChange = (date) => {
        setDate(date);
    }


    const handleChangeCategory = (event) => {
        setCaegory(event.target.value)
    }

    //Funcion para manejar fotos de perfil y convertir a base 64.
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                if (reader.readyState === 2) {
                    const base64 = reader.result;
                    var arrayB64 = base64.split(',');
                    setUploadMaterial({
                        profile: base64,
                        base64: arrayB64[1],
                        name: e.target.files[0].name,
                    });
                }
            }
        }
    }


    const onMainChange = (e) => {
        navigate('/org/main', {
            replace: true, //No dejar que la persona regrese a la pagina anterior.
        });
    }

    const handleSubmint = (e) => {
        e.preventDefault(); //Evita que se recargue la pagina.

        if (material.profile === '') {
            return alert('Debe cargar material');
        }

        if (dateSelect === null) {
            return alert('Debe seleccionar una fecha');
        }

        if (category === '') {
            return alert('Debe seleccionar una categoría');
        }


        //LLamar al backend.
        setMaterial(form, dateSelect, category, material);


        setUploadMaterial({
            profile: '',
            base64: '',
            name: '',
        });

        setCaegory('');
        setDate(null);
        handleReset();
    }


    return (
        <div className="body-material">

            <div className="content-material">

                <div className="content-logo">

                    <img src={white_logo} alt="logo" width="210" height="75" />
                    <h1 style={{ marginTop: 25 }}> - Agregar Material </h1>

                </div>


                <div className="form-content">

                    <Box component="span" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2, border: '1px dashed grey', width: 400, height: 250, }}>
                        <Button
                            sx={{ width: 200, height: 50 }}
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            href="#file-upload"
                        >
                            {material.profile === '' ? 'Cargar Material' : 'FCargado*'}
                            <input
                                style={{ display: 'none' }} // Para ocultar el input por defecto
                                type="file"
                                accept="/*" // Aquí especifica las extensiones permitidas
                                onChange={handleFile}
                            />
                        </Button>
                    </Box>

                    <form onSubmit={handleSubmint}>

                        <div>
                            <TextField sx={{ m: 1, width: '30ch' }} required label="Título Material" name='titulo' value={form.titulo} onChange={handleChange} variant="filled" />
                            <TextField sx={{ m: 1, width: '30ch' }} required name='duenio' value={form.duenio} onChange={handleChange} label="Dueño Material" variant="filled" />
                        </div>

                        <div>
                            <TextField sx={{ m: 1, width: '62ch' }} required name='url' value={form.url} onChange={handleChange} label="Url Material" variant="filled" />
                        </div>

                        <div style={{ display: 'flex' }}>

                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer sx={{ marginLeft: 1, width: '30ch' }} components={['DatePicker']} >
                                    <DatePicker label="Fecha de publicación" value={dateSelect} onChange={handleDateChange} />
                                </DemoContainer>
                            </LocalizationProvider>

                            <FormControl sx={{ m: 1, width: '32ch' }} variant="filled">
                                <InputLabel id="demo-simple-select-label">Categoría</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={category}
                                    label="eduacion"
                                    onChange={handleChangeCategory}
                                >
                                    <MenuItem value={'Ciencia'}>Ciencia</MenuItem>
                                    <MenuItem value={'Tecnología'}>Tecnología</MenuItem>
                                    <MenuItem value={'Medicina'}>Medicina</MenuItem>
                                    <MenuItem value={'Otros'}>Otros</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div style={{ marginTop: 15 }}>
                            <Button sx={{ m: 1, height: '6ch', width: '18ch' }} onClick={onMainChange} color="error" variant="contained">Atras</Button>
                            <Button sx={{ m: 1, height: '6ch', width: '18ch', }} type="submit" variant="contained">Agregar</Button>
                        </div>

                    </form>

                </div>

            </div >

        </div >
    )
}
