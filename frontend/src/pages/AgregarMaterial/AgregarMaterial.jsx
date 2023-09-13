import React from 'react';
import { TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

import black_logo from '../../assets/black_logo.png';
import './agregarmaterial.css';


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const category = [
    { title: 'Ciencia', id: 1 },
    { title: 'Tecnología', id: 2 },
    { title: 'Medicina', id: 3 },
    { title: 'Otros', id: 4 },
];


const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


export const AgregarMaterial = () => {

    const defaultProps = {
        options: category,
        getOptionLabel: (option) => option.title,
    };

    return (
        <div className="body-material">

            <div className="content-material">

                <div className="logo-content">
                    <img src={black_logo} alt="logo" width="210" height="75" />
                    <h1> - Agregar Material </h1>
                </div>

                <div className="form-content">

                    <Box component="span" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2, border: '1px dashed grey', width: 400, height: 250,}}>
                        <Button
                            sx={{ width: 200, height: 50 }}
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            href="#file-upload"
                        >
                            Cargar Archivo
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Box>

                    <form>
                        <div>
                            <TextField id="txtTitulo" sx={{ m: 1, width: '30ch' }} label="Título Material" variant="filled" />
                            <TextField id="txtPropietario" sx={{ m: 1, width: '30ch' }} label="Dueño Material" variant="filled" />
                        </div>

                        <div>
                            <TextField id="txtUrl" sx={{ m: 1, width: '62ch' }} label="Url Material" variant="filled" />
                        </div>

                        <div style={{ display: 'flex' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer sx={{ marginLeft: 1, width: '30ch' }} components={['DatePicker']} >
                                    <DatePicker label="Fecha de publicación" />
                                </DemoContainer>
                            </LocalizationProvider>

                            <Autocomplete {...defaultProps} id="disable-close-on-select" disableCloseOnSelect
                                sx={{ m: 1, marginLeft: 3, width: '30ch' }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Categoría" variant="filled" />
                                )}
                            />
                        </div>

                        <div style={{ marginTop: 15 }}>
                            <Button sx={{ m: 1, height: '6ch', width: '18ch' }} color="error" variant="contained">Atras</Button>
                            <Button sx={{ m: 1, height: '6ch', width: '18ch', }} variant="contained">Agregar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
