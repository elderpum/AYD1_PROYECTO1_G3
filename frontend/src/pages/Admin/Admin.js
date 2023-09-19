import React, {useState} from 'react';
import Logo from '../../assets/white_logo.png';
import axios from "axios";

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

function createData(nombre, apellido, correo, fecha, genero, educacion, departamento, telefono, bloq) {
    var bloqueado = 'No';
    if (bloq) {
        bloqueado = 'Si';
    }
    return {
        nombre,
        apellido,
        correo,
        bloqueado,
        campos: [
        {
            campo: 'Fecha de Nacimiento',
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
        {
            campo: 'Departamento',
            valor: departamento,
        },
        {
            campo: 'Telefono',
            valor: telefono,
        },
        ],
    };
}

function createDataOrga(nombre, apellido, correo, fecha, genero, empresa, descripcion, direccion, telefono, bloq) {
    var bloqueado = 'No';
    if (bloq) {
        bloqueado = 'Si';
    }

    return {
        nombre,
        apellido,
        correo,
        bloqueado,
        campos: [
        {
            campo: 'Fecha de Nacimiento',
            valor: fecha,
        },
        {
            campo: 'Genero',
            valor: genero,
        },
        {
            campo: 'Empresa',
            valor: empresa,
        },
        {
            campo: 'Descripción de la Empresa',
            valor: descripcion,
        },
        {
            campo: 'Dirección de la Empresa',
            valor: direccion,
        },
        {
            campo: 'Telefono',
            valor: telefono,
        },
        ],
    };
}
  
function Row(props) {
    const { row } = props;
    const { type } = props;
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
            <TableCell component="th" scope="row">
                {row.apellido}
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
                <Typography variant="h6" gutterBottom component="div"  >
                  <h5 className='titulos'> Información General </h5>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.campos.map((campo_fila) => (
                      <TableRow key={campo_fila.campo}>
                        <TableCell component="th" scope="row" className='titulos'>
                            <h7 className='titulos'>{campo_fila.campo}</h7>
                        </TableCell>
                        <TableCell>{campo_fila.valor}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell component="th" scope="row" className='titulos'>
                          <h7 className='titulos'>Rol de Usuario</h7>
                      </TableCell>
                      <TableCell>{type}</TableCell>
                    </TableRow>
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

const client = axios.create({
    baseURL: "http://localhost:3001"
});

export function Administracion() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [organizadores, setOrganizadores] = useState([]);
    var rows_estudiantes = [];
    var rows_organizadores = [];

    // peticion para obtener todos los usuarios
    React.useEffect(() => {
        async function getInfo() {
          const response = await client.get("/api/admin/getAllUsers");
          setEstudiantes(response.data.estudiantes);
          setOrganizadores(response.data.organizadores);
        }
        getInfo();
    }, []);


    // se formatean los datos para la tabla estudiantes
    for (let i = 0; i < estudiantes.length; i++){
        rows_estudiantes.push(
            createData(
                estudiantes[i].nombre,
                estudiantes[i].apellidos,
                estudiantes[i].email,
                estudiantes[i].nacimiento,
                estudiantes[i].genero,
                estudiantes[i].nivel_educacion,
                estudiantes[i].Departamento,
                estudiantes[i].telefono,
                estudiantes[i].act
            )
        );
    }

    // se formatean los datos para la tabla organizadores
    for (let i = 0; i < organizadores.length; i++){
        rows_organizadores.push(
            createDataOrga(
                organizadores[i].nombre,
                organizadores[i].apellido,
                organizadores[i].email,
                organizadores[i].nacimiento,
                organizadores[i].genero,
                organizadores[i].empresa,
                organizadores[i].descrip_empresa,
                organizadores[i].direc_empresa,
                organizadores[i].tel_empresa,
                organizadores[i].act
            )
        );
    }
    console.log(rows_organizadores)

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
                    <ContainerTitulo>
                        <h5 className='titulos'> USUARIOS </h5>
                    </ContainerTitulo>
                    <ContainerTabla>
                        <TableContainer component={Paper }  style={{ width: 1100}} sx={{ mt: '1rem', mb: '2.5rem' }}>
                            <Table aria-label="collapsible table">
                                <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell className='titulos'><h7 className='titulos'>Nombre</h7></TableCell>
                                    <TableCell className='titulos'><h7 className='titulos'>Apellido</h7></TableCell>
                                    <TableCell align="center" className='titulos'><h7 className='titulos'>Correo</h7></TableCell>
                                    <TableCell align="center" className='titulos'><h7 className='titulos'>Bloqueado</h7></TableCell>
                                    <TableCell align="center" className='titulos'><h7 className='titulos'>Desbloquear</h7></TableCell>
                                    <TableCell align="center" className='titulos'><h7 className='titulos'>Bloquear</h7></TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows_estudiantes.map((row) => (
                                    <Row key={row.email} type={'estudiante'} row={row} />
                                ))}
                                {rows_organizadores.map((row) => (
                                    <Row key={row.email} type={'organizador'} row={row} />
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ContainerTabla>
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

const ContainerTitulo = styled.div`
color: white;
`

const ContainerTabla = styled.div`
display: flex;
justify-content: center;
`

const Header = styled.div`
position: fixed;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
height: 55px;
background-color: black;

& img {
    max-height: 45px;
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
flex-direction: column;
justify-content: center;
height: 100%;
min-height: 100vh;
width: 100vh;
min-width: 100%;
padding-top: 55px;
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