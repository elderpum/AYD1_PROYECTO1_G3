import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../assets/white_logo.png";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import "bootstrap/dist/css/bootstrap.min.css";
import "./InicioSesion.css";
import { Link, useNavigate } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";

export function InicioSesion() {
  const navigate = useNavigate();
  const ip = "localhost";
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState(1);
  const [conteo, setConteo] = useState(0);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const iniciarSesion = () => {
    console.log(correo);
    console.log(password);
    console.log(tipo);
    const url = `http://${ip}:5000/login`;
    let data = { correo: correo, password: password, tipo: tipo };
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          if (res.authExitoso) {
            // auntenticaion exitosa
            localStorage.setItem("auth", res.tokenAuth);
            navigate("/foros");
          } else {
            setConteo(res.contador);
            
            setOpen(true);
          }
        });
    };
    fetchData();
  };

  return (
    <Container>
      <ContainerAlternativo>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="logo" />
          <br />
          <Link to="/registroEstudiante">
            <Button variant="contained" color="warning">
              Registrarse
            </Button>
          </Link>
        </div>
      </ContainerAlternativo>
      <ContainerLogin>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <div>
            <h1 className="titulo">Inicio de Sesión</h1>
          </div>
          <br />
          <br />
          <div>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
              <TextField
                label="Correo"
                id="outlined-size-normal"
                onChange={(newValue) => setCorreo(newValue.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Contraseña
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
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
                onChange={(newValue) => setPassword(newValue.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Tipo</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Tipo"
                onChange={(event) => setTipo(event.target.value)}
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Organizador</MenuItem>
                <MenuItem value={3}>Estudiante</MenuItem>
              </Select>
            </FormControl>
          </div>
          <br />
          <br />
          <Grid item>
            <Box sx={{ width: "100%" }}>
              <Collapse in={open}>
                <Alert
                  variant="filled"
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  { mensaje }. Intentos: {conteo}
                </Alert>
              </Collapse>
              <Button
                variant="contained"
                color="success"
                onClick={iniciarSesion}
              >
                Iniciar sesion
              </Button>
            </Box>
          </Grid>
        </Grid>
      </ContainerLogin>
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
`;

const ContainerLogin = styled.div`
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
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100%;
  min-height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    30deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 29%,
    rgba(0, 212, 255, 1) 100%
  );
`;

/*
background: linear-gradient(transparent, rgba(50, 90, 100, 1));
background-color: rgb(156, 41, 39);
*/
