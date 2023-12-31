import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VerMaterial.css";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Autocomplete,
} from "@mui/material";
import { Sidebar } from "../../components/Sidebar";

export function VerMaterial() {
  const [rows, setRows] = useState([]);
  const [categoria, setCategoria] = useState("");
  const ip = "localhost";
  const token = localStorage.getItem("auth");

  useEffect(() => {
    const url = `http://${ip}:3001/api/materiales/get-materiales`;
    const fetchData = async () => {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          let aux = [];
          for (const m of res.data) {
            aux.push(createData(m.nombre, m.tipo, m.url));
          }
          setRows(aux);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }, []);

  function createData(name, tipo, url) {
    return { name, tipo, url };
  }

  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  //   createData("Frozen yoghurt", 159, 6.0),
  //   createData("Ice cream sandwich", 237, 9.0),
  //   createData("Eclair", 262, 16.0),
  // ];

  async function buscarCategoria() {
    console.log("categoria: ",categoria)
    const url = `http://${ip}:3001/api/materiales/materiales-categoria`;
    const token = localStorage.getItem("auth");
    let data = { categoria: categoria };
    const fetchData = async () => {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          let aux = [];
          for (const m of res.data) {
            aux.push(createData(m.nombre, m.tipo, m.url));
          }
          setRows(aux);
        })
        .catch((error) => console.error("Error:", error));
    };
    fetchData();
  }

  async function VerMaterial(url) {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.focus();
    } else {
      alert(
        "El bloqueo de ventanas emergentes está habilitado en su navegador. Habilite las ventanas emergentes para ver el contenido."
      );
    }
  }

  return (
    <Container>
      <Sidebar opcionActiva={"vermaterial"} />
      <ContainerContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={categorias}
              sx={{ width: 300 }}
              onChange={(event, newValue) => setCategoria(newValue)}
              renderInput={(params) => <TextField {...params} label="Categoría" />}
            />
          </Grid>
          <Grid item>
            <Button className="busc" variant="text" onClick={buscarCategoria}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/3031/3031293.png"
                alt=""
                width="30"
                height="30"
              />
            </Button>
          </Grid>
        </Grid>
        <br />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre del documento</TableCell>
                    <TableCell align="right">Tipo de archivo</TableCell>
                    <TableCell align="right">Ver</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.tipo}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          onClick={() => VerMaterial(row.url)}
                        >
                          Ver
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </ContainerContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  min-width: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    30deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 29%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const ContainerContent = styled.div`
  justify-content: center;
  height: 80%;
  min-height: 80%;
  width: 80%;
  min-width: 80%;
  background: white;
  margin-top: 4rem;
  border-radius: 0.5rem;
`;

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
