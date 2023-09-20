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
  Stack,
  Snackbar,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MuiAlert from "@mui/material/Alert";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Sidebar } from "../../components/Sidebar";

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
  const [mensaje, setMensaje] = useState("");
  const [open, setOpen] = React.useState(false);
  const ip = "localhost";

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

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
    const base64Image = await convertToBase64(imagen);

    console.log("imagen ", base64Image);
    let materiales = [];
    for (const m of materialesEdu) {
      const base64File = await convertToBase64(m);
      materiales.push({ contenido: base64File, nombre: m.name });
    }
    const url = `http://${ip}:3001/api/events/create`;
    const token = localStorage.getItem("auth");
    let data = {
      titulo: titulo,
      descripcion: descripcion,
      fecha: fecha,
      hora: hora,
      duracion: duracion,
      ubicacion: ubicacion,
      categoria: categoria,
      costo: costo,
      imagenPromocional: { contenido: base64Image, nombre: imagen.name },
      formatoEvento: formatoEvento,
      materialAdicional: materiales,
    };
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Error:", error))
        .then((res) => {
          setMensaje(res.message);
          setOpen(true);
        });
    };
    fetchData();
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container>
      <Sidebar/>
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
                        `${newValue.$y}/${newValue.$M + 1}/${newValue.$D}`
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
                    views={["hours","minutes", "seconds"]}
                    onChange={(newValue) =>
                      setHora(`${newValue.$H}:${newValue.$m}:${newValue.$s}`)
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
                    views={["hours","minutes", "seconds"]}
                    format="HH:mm:ss"
                    onChange={(newValue) =>
                      setDuracion(`${newValue.$H}:${newValue.$m}:${newValue.$s}`)
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
            <br />
            <br />
            <Grid item xs={8}>
              <Stack spacing={2} sx={{ width: "100%" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={crearEvento}
                >
                  Crear Evento
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="info"
                    sx={{ width: "100%" }}
                  >
                    { mensaje }
                  </Alert>
                </Snackbar>
              </Stack>
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
  margin-top: 4rem;
  border-radius: 0.5rem;
`;
