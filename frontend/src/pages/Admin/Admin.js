import React from 'react';
import Logo from '../../assets/white_logo.png';

import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { styled } from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Admin.css';

function createData(nombre, apellido, correo, fecha, genero, educacion, bloqueado) {
    return {
        nombre,
        correo,
        bloqueado,
        campos: [
        {
            campo: 'Apellido',
            valor: apellido,
        },
        {
            campo: 'Fecha',
            valor: fecha,
        },
        {
            campo: 'Genero',
            valor: genero,
        },
        {
            campo: 'Educacion',
            valor: educacion,
        },
        ],
    };
}
  
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    const desbloquear = (id) => {
        alert("desbloquear usuario");
    };

    const bloquear = (id) => {
        alert("bloquear usuario");
    };
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.nombre}
            </TableCell>
            <TableCell align="center">{row.correo}</TableCell>
            <TableCell align="center">{row.bloqueado}</TableCell>
            <TableCell align="center">
                <Button variant="outlined" color="success" onClick={() => {desbloquear(row.correo)}}>
                    Desbloquear
                </Button>
            </TableCell> 
            <TableCell align="center">
                <Button va riant="outlined" color="error" onClick={() => {bloquear(row.correo)}}>
                    Bloquear
                </Button>
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div"  className='titulos'>
                  Información
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.campos.map((campo_fila) => (
                      <TableRow key={campo_fila.campo}>
                        <TableCell component="th" scope="row" className='titulos'>
                          {campo_fila.campo}
                        </TableCell>
                        <TableCell>{campo_fila.valor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
        PropTypes.shape({
            amount: PropTypes.number.isRequired,
            customerId: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};
  
const rows = [
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
    createData('Mario Cesar', 'Moran Porras', 'mario@ingenieria.com', '12/25/0232', 'Masculino', 'Media', 'No'),
];
  

export function Administracion() {

    /* peticion de todos los usuarios */

    return (
        <>
            <Body>
                <Header>
                    <SideHeader>.</SideHeader>
                    <CenterHeader>
                        <div className='logo'>
                        <img src={Logo} alt='soundstream' />
                        </div>
                    </CenterHeader>
                    <SideHeader>
                        <Button variant="outlined" endIcon={<LogoutIcon />}  color="error">
                            Cerrar Sesion
                        </Button>
                    </SideHeader>
                </Header>
                <Container>
                    <TableContainer component={Paper }  style={{ width: 1100}} sx={{ mt: '5rem', mb: '2.5rem' }}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                            <TableRow>
                                <TableCell />
                                    <TableCell className='titulos'>Nombre</TableCell>
                                    <TableCell align="center" className='titulos'>Correo</TableCell>
                                    <TableCell align="center" className='titulos'>Bloqueado</TableCell>
                                    <TableCell align="center" className='titulos'>Desbloquear</TableCell>
                                    <TableCell align="center" className='titulos'>Bloquear</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row) => (
                                <Row key={row.correo} row={row} />
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Body>
        </>
    );
}

/*
visualizar usuarios estudiantes 
visualizar usuarios organizadores
Bloquear y desbloquear, al proceder a bloquear o desbloquear el usuario se deberá mostrar una cuadro de
diálogo para confirmar la acción
*/


const Header = styled.div`
position: fixed;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 55px;
background-color: black;

& img {
    height: 45px;
}
`

const CenterHeader = styled.div`
flex: 0.4;
display: flex;
align-items: center;
justify-content: center;
max-width: auto;
`

const SideHeader = styled.div`
flex: 0.3;
display: flex;
align-items: center;
justify-content: right;
margin-right: 15px;
`

const Container = styled.div`
display: flex;
justify-content: center;
height: 100vh;
min-height: 100%;
width: 100vh;
min-width: 100%;
background: rgb(0,0,0);
background: linear-gradient(30deg, rgba(0,0,0,1) 0%, rgba(43,43,43,1) 43%, rgba(49,49,49,1) 45%, rgba(54,54,54,1) 52%, rgba(124,124,124,1) 100%);

`
/*
background: rgb(34,1,1);
background: linear-gradient(30deg, rgba(34,1,1,1) 0%, rgba(128,30,30,1) 48%, rgba(255,95,95,1) 100%);

background: rgb(2,0,36);
background: linear-gradient(30deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 29%, rgba(0,212,255,1) 100%);
*/
const Body = styled.div`
display: flex;
`