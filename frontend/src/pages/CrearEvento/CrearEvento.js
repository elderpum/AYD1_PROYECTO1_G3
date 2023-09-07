import React, { useState } from "react";
import { styled } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CrearEvento.css";
import {
  FormControl,
  Grid,
  TextField,
  Button,
  Autocomplete,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export function CrearEvento() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [duracion, setDuracion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [costo, setCosto] = useState("");
  const [imagen, setImagen] = useState("");
  const [formatoEvento, setFormatoEvento] = useState("");
  const [materialesEdu, setMaterialesEdu] = useState("");

  async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64Image = event.target.result;
        resolve(base64Image);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

  async function crearEvento() {
    console.log("titulo ", titulo);
    console.log("descripcion ", descripcion);
    console.log("fecha ", fecha);
    console.log("hora ", hora);
    console.log("duracion ", duracion);
    console.log("ubicacion ", ubicacion);
    console.log("categoria ", categoria);
    console.log("costo ", costo);
    console.log("formatoEvento ", formatoEvento);
    console.log("materialesEdu ", materialesEdu);
    const base64Image = await convertToBase64(imagen);

    console.log("imagen ", base64Image);
    let i = 0;
    for (const m of materialesEdu) {
      const base64File = await convertToBase64(m);
      console.log(`${i}: `, base64File);
      i++;
    }
  }

  return (
    <Container>
      <ContainerContent component="form">
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={2}>
            <h1>Evento Nuevo</h1>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            xs={7}
          >
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <TextField
                  id="outlined-basic"
                  label="Título"
                  variant="outlined"
                  onChange={(newValue) => setTitulo(newValue.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 150 }}
                size="small"
              >
                <TextField
                  id="outlined-multiline-flexible"
                  label="Descripción"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  onChange={(newValue) => setDescripcion(newValue.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 150 }}
                size="small"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha"
                    onChange={(newValue) =>
                      setFecha(
                        `${newValue.$D}/${newValue.$M + 1}/${newValue.$y}`
                      )
                    }
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 150 }}
                size="small"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Hora"
                    onChange={(newValue) =>
                      setHora(`${newValue.$H}:${newValue.$m}`)
                    }
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 150 }}
                size="small"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Duracion (horas)"
                    views={["minutes", "seconds"]}
                    format="mm:ss"
                    onChange={(newValue) =>
                      setDuracion(`${newValue.$m}:${newValue.$s}`)
                    }
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 150 }}
                size="small"
              >
                <TextField
                  id="outlined-basic"
                  label="Ubicacion"
                  variant="outlined"
                  onChange={(newValue) => setUbicacion(newValue.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 150 }}
                size="small"
              >
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={categorias}
                  getOptionLabel={(option) => option}
                  defaultValue={[categorias[0], categorias[1]]}
                  filterSelectedOptions
                  onChange={(event, newValue) => setCategoria(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Categorías"
                      placeholder="Materias"
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Costo
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  onChange={(newValue) => setCosto(newValue.target.value)}
                  startAdornment={
                    <InputAdornment position="start">Q</InputAdornment>
                  }
                  label="Costo"
                  type="number"
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <Button
                  color="warning"
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  href="#file-upload"
                >
                  Imagen promocional
                  <input
                    type="file"
                    hidden
                    onChange={(event) => setImagen(event.target.files[0])}
                  />
                </Button>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="demo-select-small-label">
                  Formato de evento
                </InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={formatoEvento}
                  label="Formato de evento"
                  onChange={(newValue) =>
                    setFormatoEvento(newValue.target.value)
                  }
                >
                  <MenuItem value={"presencial"}>Presencial</MenuItem>
                  <MenuItem value={"virtual"}>Virtual</MenuItem>
                  <MenuItem value={"hibrido"}>Híbrido</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  href="#file-upload"
                >
                  Materiales adicionales
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={(event) =>
                      setMaterialesEdu(Array.from(event.target.files))
                    }
                  />
                </Button>
              </FormControl>
            </Grid>

            <Grid item xs={8}>
              <Button variant="contained" color="success" onClick={crearEvento}>
                Crear Evento
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ContainerContent>
    </Container>
  );
}

const categorias = [
  "Área común",
  "Ciencia",
  "Tecnología",
  "Medicina",
  "Derecho",
  "Arquitectura",
  "Programación",
  "Sistemas",
  "Ingeniería",
  "Finanzas",
  "Diseño gráfico",
  "Deporte",
  "Ocio",
  "Matemática",
  "Física",
  "Contabilidad",
];

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  min-height: 100%;
  width: 100vh;
  min-width: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    30deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(43, 43, 43, 1) 43%,
    rgba(49, 49, 49, 1) 45%,
    rgba(54, 54, 54, 1) 52%,
    rgba(124, 124, 124, 1) 100%
  );
`;

const ContainerContent = styled.div`
  display: flex;
  justify-content: center;
  height: 80%;
  min-height: 80%;
  width: 80%;
  min-width: 80%;
  background: white;
  margin-top: 6.5rem;
  border-radius: 0.5rem;
`;
